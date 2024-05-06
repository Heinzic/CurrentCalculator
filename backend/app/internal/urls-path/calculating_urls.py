from app.internal.views.calculating_view import (
    CalculatingDetailAPIView,
    CreateCalculatingAPIView,
    ListCalculatingAPIView,
)
from django.urls import path

urlpatterns = [
    path("create/", CreateCalculatingAPIView.as_view(), name="calculating-create"),
    path("list/", ListCalculatingAPIView.as_view(), name="list-calculations"),
    path("<int:id>/", CalculatingDetailAPIView.as_view(), name="calculating-detail"),
]
