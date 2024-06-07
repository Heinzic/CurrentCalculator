from app.internal.views.calculating_view import (
    CalculatingDetailAPIView,
    CalculatingDetailRetrieveAPIView,
    CreateCalculatingAPIView,
    DistributeConsumersAPIView,
    ListCalculatingAPIView,
)
from django.urls import path

urlpatterns = [
    path("create/", CreateCalculatingAPIView.as_view(), name="calculating-create"),
    path("detail/<int:id>/", CalculatingDetailRetrieveAPIView.as_view(), name="calculating-retrieve-detail"),
    path("list/", ListCalculatingAPIView.as_view(), name="list-calculations"),
    path("<int:id>/", CalculatingDetailAPIView.as_view(), name="calculating-detail"),
    path("distribute/<int:id>/", DistributeConsumersAPIView.as_view(), name="calculating-distribute"),
]
