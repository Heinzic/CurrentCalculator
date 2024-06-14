from app.internal.models.calculating_model import Calculating
from app.internal.models.input_power_model import InputPower
from app.internal.models.object_model import Object
from app.internal.serializers.object_serializer import ObjectSerializer
from app.internal.serializers.section_serializer import SectionDetailSerializer
from rest_framework import serializers, status
from rest_framework.exceptions import ValidationError


class CalculatingSerializer(serializers.ModelSerializer):
    object_name = serializers.CharField(source="object.name", read_only=True)
    object_address = serializers.CharField(source="object.address", read_only=True)
    result_current = serializers.SerializerMethodField()

    class Meta:
        model = Calculating
        fields = ["id", "date", "costumer", "annotation", "object", "object_name", "object_address", "user",
                  "result_current"]
        read_only_fields = ["user"]
        extra_kwargs = {"user": {"required": True}, "object": {"required": True}}

    def get_result_current(self, obj):
        inputs = InputPower.objects.filter(section__calculating__id=obj.id)
        sum_current = sum([i.pp for i in inputs])
        return sum_current

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)

    def validate(self, attrs):
        user = self.context["request"].user
        object_id = attrs["object"].id
        if not Object.objects.filter(id=object_id, user__id=user.id).first():
            raise ValidationError({"ERROR": f"object with id={object_id} not found"}, code=status.HTTP_404_NOT_FOUND)
        return attrs


class CalculatingDetailSerializer(serializers.ModelSerializer):
    sections = SectionDetailSerializer(source="section_set", many=True)
    object = ObjectSerializer()

    class Meta:
        model = Calculating
        fields = ["date", "costumer", "annotation", "object", "user", "sections"]
