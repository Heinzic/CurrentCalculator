from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from app.internal.models.consumer_model import Consumer
from app.internal.serializers.consumer_serializer import ConsumerSerializer
from app.internal.utils.permissions import ValidLicensePermission


class ConsumerListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated, ValidLicensePermission]
    serializer_class = ConsumerSerializer

    def get_queryset(self):
        return Consumer.objects.filter(section__id=self.kwargs["section__id"])


class ConsumerDetailAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, ValidLicensePermission]
    serializer_class = ConsumerSerializer
    queryset = Consumer.objects.all()
    lookup_field = "id"


class ConsumerCreateAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated, ValidLicensePermission]
    serializer_class = ConsumerSerializer


class ConsumerTypeAPIView(APIView):
    permission_classes = [IsAuthenticated, ValidLicensePermission]

    def get(self, request):
        return Response(Consumer.CHARACTERISTIC)
