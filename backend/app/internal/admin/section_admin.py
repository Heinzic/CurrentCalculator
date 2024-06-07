from app.internal.models.section_model import Section
from django.contrib import admin
from django.contrib.admin import ModelAdmin


@admin.register(Section)
class SectionAdmin(ModelAdmin):
    pass
