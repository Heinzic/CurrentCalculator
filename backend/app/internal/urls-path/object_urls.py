from app.internal.views.object_view import CreateObjectAPIView, ListObjectAPIView, ObjectDetailAPIView
from django.urls import path

urlpatterns = [
    path("create/", CreateObjectAPIView.as_view(), name="object-create"),
    path("list/", ListObjectAPIView.as_view(), name="list-objects"),
    path("<int:id>/", ObjectDetailAPIView.as_view(), name="object-detail"),
]
