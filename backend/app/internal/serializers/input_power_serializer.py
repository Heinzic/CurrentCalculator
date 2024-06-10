from app.internal.models.input_power_model import InputPower
from app.internal.serializers.consumer_serializer import ConsumerSerializer
from rest_framework import serializers


class InputPowerSerializer(serializers.ModelSerializer):
    cos = serializers.DecimalField(decimal_places=2, max_digits=3, read_only=True)
    tg = serializers.DecimalField(decimal_places=2, max_digits=3, read_only=True)
    pp = serializers.DecimalField(decimal_places=2, max_digits=8, read_only=True)
    qp = serializers.DecimalField(decimal_places=2, max_digits=8, read_only=True)
    sp = serializers.DecimalField(decimal_places=2, max_digits=8, read_only=True)
    result_current = serializers.DecimalField(decimal_places=2, max_digits=6, read_only=True)

    class Meta:
        model = InputPower
        fields = ["id", "section", "cos", "tg", "pp", "qp", "sp", "result_current"]


class InputPowerDetailSerializer(InputPowerSerializer):
    consumers = ConsumerSerializer(source="consumer_set", many=True)

    class Meta:
        model = InputPower
        fields = ["id", "section", "cos", "tg", "pp", "qp", "sp", "result_current", "consumers"]
