from app.internal.models.consumer_model import Consumer
from django.contrib import admin
from django.contrib.admin import ModelAdmin


@admin.register(Consumer)
class ConsumerAdmin(ModelAdmin):
    pass
