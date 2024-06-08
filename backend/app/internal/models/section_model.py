from app.internal.models.consumer_model import Consumer, ConsumerType
from app.internal.models.input_power_model import InputPower
from app.internal.utils.errors import DistributeError
from django.db import models


class Section(models.Model):
    name = models.CharField(max_length=255)
    power_limit = models.PositiveIntegerField(default=150)
    calculating = models.ForeignKey("Calculating", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} | id: {self.id}"

    @staticmethod
    def separate_flats(consumers, count):
        consumers_separate = []
        for consumer in consumers:
            if consumer.type.special == ConsumerType.FLAT:
                volume = consumer.volume // count
                flats = []
                for i in range(count):
                    flats.append(
                        Consumer(
                            name=consumer.name,
                            type=consumer.type,
                            volume=volume if i != count - 1 else consumer.volume - sum([f.volume for f in flats]),
                            power_per_unit=consumer.power_per_unit,
                            coefficient_regional=consumer.coefficient_regional,
                            coefficient_demand=consumer.coefficient_demand,
                            cos=consumer.cos,
                        )
                    )

                [flat.calculate_coefficient_demand() for flat in flats]
                consumers_separate.extend(flats)
            else:
                consumers_separate.append(consumer)
        return consumers_separate

    @staticmethod
    def check_distribute(currents):
        print(currents)
        for i in range(len(currents) - 1):
            cur_max = max(currents[i], currents[i + 1])
            cur_min = min(currents[i], currents[i + 1])
            ratio1 = cur_min / cur_max
            if ratio1 <= 0.85:
                raise DistributeError("Не удалось автоматически распределить потребителей")

            for j in range(i + 2, len(currents) - 1, 2):
                pair1 = currents[i] + currents[i + 1]
                pair2 = currents[j] + currents[j + 1]
                pair_max = max(pair1, pair2)
                pair_min = min(pair1, pair2)

                ratio2 = pair_min / pair_max
                if ratio2 <= 0.7:
                    raise DistributeError("Не удалось автоматически распределить потребителей")

    def clear_inputs(self):
        for i in InputPower.objects.filter(section__id=self.pk):
            i.delete()

    def distribute_consumers(self, count_input=2):
        """Необходимо распределить потребитлей заданной мощности по следующим правилам:
        1. разделить по 2n группам так, чтобы n было минимально
        2. сумма в каждой группе не должна превышать max_power
        3. 2k/(2k-1) > 0.85 и < 1.15
        4. (2k-1 + 2k)/(2k+1 + 2k+2) > 0.7 и < 1.3
        5. квартиры делим на разные вводы
        6. лифты и лифты пп долдны быть на разных вводах

        перед заполнением надо удалить все вводы
        """
        self.clear_inputs()
        consumers = self.separate_flats(Consumer.objects.filter(section__id=self.pk), count_input)
        inputs = [InputPower(section=self) for _ in range(count_input)]
        non_specific_consumers = []
        for i, consumer in enumerate(consumers):
            if consumer.type.special == ConsumerType.ELEVATOR_PP:
                input_min = min(inputs[::2], key=lambda inp: inp.get_result_current_by_consumers(consumers))
                consumer.input = input_min
            elif consumer.type.special == ConsumerType.ELEVATOR:
                input_min = min(inputs[1::2], key=lambda inp: inp.get_result_current_by_consumers(consumers))
                consumer.input = input_min
            elif consumer.type.special == ConsumerType.FLAT:
                consumer.input = inputs[i % count_input]
            else:
                non_specific_consumers.append(consumer)

        for consumer in sorted(non_specific_consumers, key=lambda cons: cons.result_current, reverse=True):
            input_min = min(inputs, key=lambda i: i.get_result_current_by_consumers(consumers))
            consumer.input = input_min
            if input_min.get_result_current_by_consumers(consumers) > self.power_limit:
                if len(inputs) > 20:
                    raise DistributeError("Не удалось автоматически распределить потребителей")
                return self.distribute_consumers(count_input + 2)

        # [i.save() for i in inputs]
        # [print(i.pk, i.get_result_current_by_consumers(consumers)) for i in inputs]
        # [print(c.name, c.result_current, c.input) for c in consumers]

        self.check_distribute([i.get_result_current_by_consumers(consumers) for i in inputs])
        [input.save() for input in inputs]
        [consumer.save() for consumer in consumers]
        return
