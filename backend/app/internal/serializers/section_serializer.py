from app.internal.models.input_power_model import InputPower
from app.internal.models.section_model import Section
from app.internal.serializers.consumer_serializer import ConsumerSerializer
from app.internal.serializers.input_power_serializer import InputPowerDetailSerializer, InputPowerSerializer
from rest_framework import serializers


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = ["id", "name", "power_limit", "calculating"]
        extra_kwargs = {"calculating": {"read_only": True}}


class SectionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = "__all__"


class SectionDetailSerializer(serializers.ModelSerializer):
    consumers = ConsumerSerializer(source="consumer_set", many=True)
    inputs = InputPowerSerializer(source="inputpower_set", many=True)

    class Meta:
        model = Section
        fields = ["id", "name", "power_limit", "calculating", "inputs", "consumers"]
