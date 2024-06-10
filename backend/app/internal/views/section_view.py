from app.internal.models.calculating_model import Calculating
from app.internal.models.section_model import Section
from app.internal.serializers.section_serializer import (
    SectionCreateSerializer,
    SectionDetailSerializer,
    SectionSerializer,
)
from app.internal.utils.permissions import ValidLicensePermission
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated


class SectionListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated, ValidLicensePermission]
    serializer_class = SectionSerializer

    def get_queryset(self):
        allowed_queryset_calculating = [calc.pk for calc in Calculating.objects.filter(user__id=self.request.user.id)]
        return Section.objects.filter(
            calculating__id__in=allowed_queryset_calculating, calculating__id=self.kwargs["calculating_id"]
        )


class SectionDetailRetrieveAPIView(RetrieveAPIView):
    permission_classes = [IsAuthenticated, ValidLicensePermission]
    serializer_class = SectionDetailSerializer
    lookup_field = "id"

    def get_queryset(self):
        allowed_queryset_calculating = [calc.pk for calc in Calculating.objects.filter(user__id=self.request.user.id)]
        return Section.objects.filter(calculating__id__in=allowed_queryset_calculating)


class SectionDetailAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, ValidLicensePermission]
    serializer_class = SectionSerializer
    lookup_field = "id"

    def get_queryset(self):
        allowed_queryset_calculating = [calc.pk for calc in Calculating.objects.filter(user__id=self.request.user.id)]
        return Section.objects.filter(calculating__id__in=allowed_queryset_calculating)


class SectionCreateAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated, ValidLicensePermission]
    serializer_class = SectionCreateSerializer
