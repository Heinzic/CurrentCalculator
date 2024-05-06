from app.internal.models.object_model import Object
from django.contrib import admin
from django.contrib.admin import ModelAdmin


@admin.register(Object)
class ObjectAdmin(ModelAdmin):
    pass
