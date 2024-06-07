from app.internal.models.calculating_model import Calculating
from app.internal.models.section_model import Section
from app.internal.serializers.calculating_serializer import CalculatingDetailSerializer, CalculatingSerializer
from app.internal.utils.errors import DistributeError
from app.internal.utils.permissions import ValidLicensePermission
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


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


class DistributeConsumersAPIView(RetrieveAPIView):
    permission_classes = [IsAuthenticated, ValidLicensePermission]
    serializer_class = CalculatingDetailSerializer
    lookup_field = "id"

    def get(self, request, *args, **kwargs):
        sections = Section.objects.filter(calculating__id=self.kwargs["id"])
        for section in sections:
            try:
                section.distribute_consumers()
            except DistributeError:
                return Response(
                    {"ERROR": "не удалось распределить потребителей"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        return super().get(request, args, kwargs)

    def get_queryset(self):
        return Calculating.objects.filter(user__id=self.request.user.id)
