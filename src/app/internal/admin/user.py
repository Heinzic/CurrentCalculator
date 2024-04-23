from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from app.internal.models.user import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    pass
