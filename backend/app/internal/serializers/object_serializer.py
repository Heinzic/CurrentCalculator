from app.internal.models.object_model import Object
from rest_framework import serializers


class ObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Object
        fields = "__all__"
        read_only_fields = ["user"]
        extra_kwargs = {
            "name": {"required": True},
            "region_coefficient": {
                "required": True,
                "error_messages": {"invalid_choice": f"Valid values: {list(model.REGION_COEFFICIENT_CHOICES.keys())}"},
            },
        }

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)
