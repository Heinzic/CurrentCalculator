from app.internal.models.input_power_model import InputPower
from app.internal.serializers.input_power_serializer import InputPowerSerializer
from app.internal.utils.permissions import ValidLicensePermission
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated


class InputPowerListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated, ValidLicensePermission]
    serializer_class = InputPowerSerializer

    def get_queryset(self):
        return InputPower.objects.filter(section__id=self.kwargs["section_id"])
