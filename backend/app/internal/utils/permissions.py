import datetime

from rest_framework import permissions


class AdminAccessPermission(permissions.BasePermission):
    message = "Access is allowed only to the administrator"

    def has_permission(self, request, view):
        return request.user.is_admin


class ValidLicensePermission(permissions.BasePermission):
    message = "Your license has expired, please contact the administrator"

    def has_permission(self, request, view):
        return request.user.license_period is None or request.user.license_period >= datetime.date.today()
