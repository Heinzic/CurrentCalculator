from app.internal.views.consumer_view import (
    ConsumerCreateAPIView,
    ConsumerDetailAPIView,
    ConsumerListAPIView,
    ConsumerTypeAPIView,
)
from django.urls import path

urlpatterns = [
    path("list/<int:section_id>/", ConsumerListAPIView.as_view(), name="list-consumers"),
    path("<int:id>/", ConsumerDetailAPIView.as_view(), name="consumer-detail"),
    path("types/", ConsumerTypeAPIView.as_view(), name="consumer-types"),
    path("create/", ConsumerCreateAPIView.as_view(), name="consumer-create"),
]
