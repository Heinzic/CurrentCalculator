from app.internal.models.input_power_model import InputPower
from django.contrib import admin
from django.contrib.admin import ModelAdmin


@admin.register(InputPower)
class InputPowerAdmin(ModelAdmin):
    pass
