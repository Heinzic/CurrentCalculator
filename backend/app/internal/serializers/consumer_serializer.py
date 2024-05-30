from decimal import Decimal
from math import sqrt

from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from app.internal.models.consumer_model import Consumer
from app.internal.models.object_model import Object


class ConsumerSerializer(serializers.ModelSerializer):
    total_capacity = serializers.DecimalField(decimal_places=2, max_digits=8, allow_null=True, read_only=True)
    coefficient_maximum_mismatch = serializers.DecimalField(decimal_places=2, max_digits=3, read_only=True)
    tg = serializers.DecimalField(decimal_places=2, max_digits=3, read_only=True)
    pp = serializers.DecimalField(decimal_places=2, max_digits=8, read_only=True)
    qp = serializers.DecimalField(decimal_places=2, max_digits=8, read_only=True)
    sp = serializers.DecimalField(decimal_places=2, max_digits=8, read_only=True)
    result_current = serializers.DecimalField(decimal_places=2, max_digits=6, read_only=True)

    class Meta:
        model = Consumer
        fields = ["id",
                  "section",
                  "input",
                  "name",
                  "type",
                  "volume",
                  "power_per_unit",
                  "total_capacity",
                  "coefficient_regional",
                  "coefficient_demand",
                  "coefficient_maximum_mismatch",
                  "cos",
                  "tg",
                  "pp",
                  "qp",
                  "sp",
                  "result_current",
                  ]

        read_only_fields = ["coefficient_regional"]

    def validate(self, attrs):
        for attr, value in attrs.items():
            if attr == "valume":
                if value <= 0:
                    raise ValidationError({"volume": "должно быть положительным числом"})
            elif attr == "coefficient_demand":
                if value < 0 or value > 1:
                    raise ValidationError({"coefficient_demand": "должно быть установлено в пределах от 0 до 1"})
            elif attr == "cos":
                if value < 0 or value > 1:
                    raise ValidationError({"cos": "должно быть установлено в пределах от 0 до 1"})
            elif attr == "power_per_unit":
                type_consumer = attrs["type"]
                bound_ppu = Consumer.CHARACTERISTIC[type_consumer][Consumer.ppu_name]
                if value <= 0:
                    raise ValidationError({"power_per_unit": "должно быть положительным числом"})
                if (type_consumer == Consumer.FLAT_10 or type_consumer == Consumer.FLAT_10C) and value != bound_ppu:
                    raise ValidationError(
                        {"power_per_unit": f"у этого потребителя значение должен быть {bound_ppu}"})
                if (type_consumer == Consumer.FLAT_L10 or type_consumer == Consumer.FLAT_L10C) and value >= bound_ppu:
                    raise ValidationError(
                        {"power_per_unit": f"у этого потребителя значение должно быть меньше {bound_ppu}"})
                if (type_consumer == Consumer.FLAT_G10 or type_consumer == Consumer.FLAT_G10C) and value <= bound_ppu:
                    raise ValidationError(
                        {"power_per_unit": f"у этого потребителя значение должно быть больше {bound_ppu}"})

        return super().validate(attrs)

    def create(self, validated_data):
        type_consumer = validated_data["type"]
        if "power_per_unit" not in validated_data:
            validated_data["power_per_unit"] = Consumer.CHARACTERISTIC[type_consumer][Consumer.ppu_name]
        validated_data["cos"] = Consumer.CHARACTERISTIC[type_consumer][Consumer.cos_name]
        return super().create(validated_data)

        # self.total_capacity = self.power_per_unit * self.volume
        # self.coefficient_regional = 1
        # self.coefficient_demand = 1
        # self.tg = sqrt(abs(1 - 1 / self.cos * self.cos))
        #
        # if self.type is Consumer.Type.FLAT:
        #     self.total_capacity = None
        #     region = self.section.calculating.object.region_coefficient
        #     self.coefficient_regional = 0.81 if region is Object.Region.CENTRAL else 0.91
        #     self.pp = self.volume * self.coefficient_regional * self.coefficient_demand * self.coefficient_maximum_mismatch
        #     # todo логика для коэф.спроса
        # elif self.type is Consumer.Type.ELEVATOR:
        #     # todo логика для коэф.спроса
        #     pass
        # else:
        #     self.pp = self.total_capacity * self.coefficient_regional * self.coefficient_demand * self.coefficient_maximum_mismatch
        #     self.qp = self.pp * self.tg
        #     self.sp = self.pp / self.cos
        #
        # return super().create(validated_data)
