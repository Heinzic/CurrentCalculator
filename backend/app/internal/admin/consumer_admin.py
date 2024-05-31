from django.contrib import admin
from django.contrib.admin import ModelAdmin

from app.internal.models.consumer_model import Consumer


@admin.register(Consumer)
class ConsumerAdmin(ModelAdmin):
    pass
