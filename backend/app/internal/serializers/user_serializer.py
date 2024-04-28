from django.contrib.auth import get_user_model
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "license_period",
            "date_joined",
            "is_admin",
            "is_staff",
            "is_active",
            "is_verified",
        ]

        read_only_fields = [
            "id",
            "email",
            "license_period",
            "date_joined",
            "is_admin",
            "is_staff",
            "is_active",
            "is_verified",
        ]

        # def update(self, instance, validated_data):


class ChangeLicensePeriodSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["license_period"]
