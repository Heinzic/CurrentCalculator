import math
from decimal import Decimal

from app.internal.models.object_model import Object
from django.db import models


class ConsumerType(models.Model):
    FLAT = "Flat"
    ELEVATOR = "Elevator"
    ELEVATOR_PP = "Elevator-PP"
    SP256 = "СП-256"
    OTHER = "Other"
    SPECIAL_CHOICE = [
        (FLAT, "Квартира"),
        (ELEVATOR, "Лифт"),
        (ELEVATOR_PP, "Лифт ПП"),
        (OTHER, "Другое"),
        (SP256, "СП-256"),
    ]
    name = models.CharField(max_length=255)
    special = models.CharField(max_length=255, choices=SPECIAL_CHOICE, default="Квартира")
    unit_measurement = models.CharField(max_length=255)
    default_power_per_unit = models.DecimalField(decimal_places=3, max_digits=9)
    default_cos = models.DecimalField(decimal_places=2, max_digits=3)

    def __str__(self):
        return f"{self.name}"


class Consumer(models.Model):
    TABLE_F71 = (
        (5, 10),
        (6, 5.1),
        (9, 3.8),
        (12, 3.2),
        (15, 2.8),
        (18, 2.6),
        (24, 2.2),
        (40, 1.95),
        (60, 1.7),
        (100, 1.5),
        (200, 1.36),
        (400, 1.27),
        (600, 1.23),
        (1000, 1.19),
    )
    TABLE_F73 = (
        (5, 1),
        (6, 0.51),
        (9, 0.38),
        (12, 0.32),
        (15, 0.29),
        (18, 0.26),
        (24, 0.24),
        (40, 0.2),
        (60, 0.18),
        (100, 0.16),
        (200, 0.14),
        (400, 0.13),
        (600, 0.11),
    )
    TABLE_E74 = ((2, 0.9), (3, 0.9), (4, 0.8), (5, 0.8), (6, 0.75), (10, 0.6), (20, 0.5), (25, 0.4))
    section = models.ForeignKey("Section", on_delete=models.CASCADE, verbose_name="секция", null=True)
    input = models.ForeignKey("InputPower", on_delete=models.SET_NULL, null=True, blank=True, verbose_name="ввод")
    name = models.CharField(max_length=255, verbose_name="имя")
    type = models.ForeignKey("ConsumerType", on_delete=models.SET_NULL, null=True, verbose_name="тип")
    volume = models.DecimalField(default=1, decimal_places=2, max_digits=8, verbose_name="количество")
    power_per_unit = models.DecimalField(default=10, decimal_places=3, max_digits=9, verbose_name="мощность на единицу")
    coefficient_regional = models.DecimalField(default=1, decimal_places=2, max_digits=3, verbose_name="коэф. региона")
    coefficient_demand = models.DecimalField(default=1, decimal_places=6, max_digits=7, verbose_name="коэф. спроса")
    cos = models.DecimalField(default=0.95, decimal_places=2, max_digits=3)

    def __str__(self):
        return f"id: {self.pk}|{self.name}"

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if self.section and self.type.special == ConsumerType.FLAT:
            region = self.section.calculating.object.region_coefficient
            self.coefficient_regional = Decimal("0.81") if region is Object.Region.CENTRAL else Decimal("0.91")

        self.calculate_coefficient_demand()

        super().save(force_insert, force_update, using, update_fields)

        # todo возможен баг
        # если у максимального потребителя изменить параметры и другой потребитель будет его превосходить, то
        # максимальный потребитель у входа не изменится
        if self.input and (not self.input.max_consumer or self.input.max_consumer.result_current < self.result_current):
            self.input.max_consumer = self
            self.input.save()

    def calculate_coefficient_demand(self):
        type_consumer = self.type.special
        if (
            type_consumer == ConsumerType.FLAT
            or type_consumer == ConsumerType.ELEVATOR
            or type_consumer == ConsumerType.ELEVATOR_PP
        ):

            volume = float(self.volume)
            if type_consumer == ConsumerType.FLAT:
                table = self.TABLE_F71 if self.power_per_unit <= 10 else self.TABLE_F73
                if self.power_per_unit > 10 and self.input:
                    consumers = Consumer.objects.filter(
                        input=self.input, type__special=ConsumerType.FLAT, power_per_unit__gt=Decimal("10")
                    )
                    volume = sum([cons.volume for cons in consumers])
            else:
                table = self.TABLE_E74

            demand = table[-1][1]
            for i, (v, p) in enumerate(table):
                if volume <= v:
                    prev_v, prev_p = table[i - 1]
                    demand = table[0][1] if volume <= table[0][0] else p + (prev_p - p) * (v - volume) / (v - prev_v)
                    break
            if type_consumer == ConsumerType.FLAT:
                self.coefficient_demand = (
                    round(Decimal(str(demand)), 3) if self.power_per_unit >= 10 else round(Decimal(str(demand / 10)), 3)
                )

            else:
                self.coefficient_demand = round(Decimal(str(demand)), 3)

        else:
            self.coefficient_demand = Decimal("1.000")

    @property
    def total_capacity(self):
        if self.type.special == ConsumerType.FLAT:
            return None
        return Decimal(self.volume * self.power_per_unit)

    @property
    def coefficient_maximum_mismatch(self):
        if self.input and self.input.max_consumer:
            return Decimal("1") if self.input.max_consumer.pk == self.pk else Decimal("0.9")
        else:
            return Decimal("1")

    @property
    def tg(self):
        return Decimal(math.tan(math.acos(self.cos)))

    @property
    def pp(self):
        coefficient_multiple = Decimal(
            self.coefficient_regional * self.coefficient_demand * self.coefficient_maximum_mismatch
        )
        if self.type.special == ConsumerType.FLAT:
            return Decimal(self.volume * coefficient_multiple)
        else:
            return Decimal(self.total_capacity * coefficient_multiple)

    @property
    def qp(self):
        return Decimal(self.pp * self.tg)

    @property
    def sp(self):
        return Decimal(self.pp / self.cos)

    @property
    def result_current(self):
        return Decimal(self.sp / Decimal(0.66))
