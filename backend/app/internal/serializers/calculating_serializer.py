from app.internal.models.calculating_model import Calculating
from app.internal.models.object_model import Object
from rest_framework import serializers, status
from rest_framework.exceptions import ValidationError

from app.internal.serializers.section_serializer import SectionDetailSerializer


class CalculatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calculating
        fields = "__all__"
        read_only_fields = ["user"]
        extra_kwargs = {"user": {"required": True}, "object": {"required": True}}

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

    class Meta:
        model = Calculating
        fields = ["date", "costumer", "annotation", "object", "user", "sections"]
