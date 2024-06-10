from app.internal.models.consumer_model import ConsumerType
from django.contrib import admin
from django.contrib.admin import ModelAdmin


@admin.register(ConsumerType)
class ConsumerTypeAdmin(ModelAdmin):
    list_display = ("name", "default_power_per_unit", "default_cos", "unit_measurement", "special")
    ordering = ("name",)
