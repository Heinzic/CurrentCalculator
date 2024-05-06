from rest_framework.generics import RetrieveUpdateDestroyAPIView, CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated

from app.internal.models.object_model import Object
from app.internal.serializers.object_serializer import ObjectSerializer
from app.internal.utils.permissions import ValidLicensePermission


class ListObjectAPIView(ListAPIView):
    permission_classes = [IsAuthenticated, ValidLicensePermission]
    serializer_class = ObjectSerializer

    def get_queryset(self):
        return Object.objects.filter(user__id=self.request.user.id)


class ObjectDetailAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, ValidLicensePermission]
    serializer_class = ObjectSerializer
    lookup_field = "id"

    def get_queryset(self):
        return Object.objects.filter(user__id=self.request.user.id)


class CreateObjectAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated, ValidLicensePermission]
    serializer_class = ObjectSerializer
