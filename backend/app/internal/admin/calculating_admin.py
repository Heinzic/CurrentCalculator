from app.internal.models.calculating_model import Calculating
from django.contrib import admin
from django.contrib.admin import ModelAdmin


@admin.register(Calculating)
class CalculatingAdmin(ModelAdmin):
    pass
