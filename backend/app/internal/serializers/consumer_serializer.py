from app.internal.models.consumer_model import Consumer, ConsumerType
from rest_framework import serializers
from rest_framework.exceptions import ValidationError


class ConsumerTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsumerType
        fields = "__all__"


class ConsumerSerializer(serializers.ModelSerializer):
    type_name = serializers.CharField(source="type.name", read_only=True)
    total_capacity = serializers.DecimalField(decimal_places=2, max_digits=8, allow_null=True, read_only=True)
    coefficient_maximum_mismatch = serializers.DecimalField(decimal_places=2, max_digits=3, read_only=True)
    tg = serializers.DecimalField(decimal_places=2, max_digits=3, read_only=True)
    pp = serializers.DecimalField(decimal_places=2, max_digits=8, read_only=True)
    qp = serializers.DecimalField(decimal_places=2, max_digits=8, read_only=True)
    sp = serializers.DecimalField(decimal_places=2, max_digits=8, read_only=True)
    result_current = serializers.DecimalField(decimal_places=2, max_digits=6, read_only=True)

    class Meta:
        model = Consumer
        fields = [
            "id",
            "section",
            "input",
            "name",
            "type",
            "type_name",
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

        read_only_fields = ["coefficient_regional", "cos"]
        extra_kwargs = {"type": {"required": True}}

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
                if value <= 0:
                    raise ValidationError({"power_per_unit": "должно быть положительным числом"})

        return super().validate(attrs)

    def create(self, validated_data):
        type_consumer = validated_data["type"]
        if "power_per_unit" not in validated_data:
            validated_data["power_per_unit"] = type_consumer.default_power_per_unit
        validated_data["cos"] = type_consumer.default_cos
        return super().create(validated_data)
