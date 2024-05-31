from app.internal.models.calculating_model import Calculating
from app.internal.serializers.calculating_serializer import CalculatingSerializer, CalculatingDetailSerializer
from app.internal.utils.permissions import ValidLicensePermission
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated


class ListCalculatingAPIView(ListAPIView):
    permission_classes = [IsAuthenticated, ValidLicensePermission]
    serializer_class = CalculatingSerializer

    def get_queryset(self):
        return Calculating.objects.filter(user__id=self.request.user.id)


class CalculatingDetailAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, ValidLicensePermission]
    serializer_class = CalculatingSerializer
    lookup_field = "id"

    def get_queryset(self):
        return Calculating.objects.filter(user__id=self.request.user.id)


class CalculatingDetailRetrieveAPIView(RetrieveAPIView):
    permission_classes = [IsAuthenticated, ValidLicensePermission]
    serializer_class = CalculatingDetailSerializer
    lookup_field = "id"

    def get_queryset(self):
        return Calculating.objects.filter(user__id=self.request.user.id)


class CreateCalculatingAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated, ValidLicensePermission]
    serializer_class = CalculatingSerializer
