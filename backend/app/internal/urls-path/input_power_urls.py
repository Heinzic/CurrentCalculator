from django.urls import path

from app.internal.views.input_power_view import InputPowerListAPIView

urlpatterns = [
    path("list/<int:section_id>/", InputPowerListAPIView.as_view(), name="list-input"),
]
