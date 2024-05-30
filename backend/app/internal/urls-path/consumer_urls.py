from django.urls import path
from app.internal.views.consumer_view import ConsumerListAPIView, ConsumerDetailAPIView, ConsumerCreateAPIView, \
    ConsumerTypeAPIView

urlpatterns = [
    path("list/<int:section__id>/", ConsumerListAPIView.as_view(), name="list-consumers"),
    path("<int:id>/", ConsumerDetailAPIView.as_view(), name="consumer-detail"),
    path("types/", ConsumerTypeAPIView.as_view(), name="consumer-types"),
    path("create/", ConsumerCreateAPIView.as_view(), name="consumer-create"),
]
