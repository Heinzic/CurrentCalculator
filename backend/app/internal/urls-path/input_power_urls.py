from app.internal.views.input_power_view import InputPowerListAPIView
from django.urls import path

urlpatterns = [
    path("list/<int:section_id>/", InputPowerListAPIView.as_view(), name="list-input"),
]
