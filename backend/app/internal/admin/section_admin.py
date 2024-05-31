from django.contrib import admin
from django.contrib.admin import ModelAdmin

from app.internal.models.section_model import Section


@admin.register(Section)
class SectionAdmin(ModelAdmin):
    pass
