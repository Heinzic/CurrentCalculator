from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from app.internal.models.consumer_model import Consumer, ConsumerType
from app.internal.serializers.consumer_serializer import ConsumerSerializer, ConsumerTypeSerializer
from app.internal.utils.permissions import ValidLicensePermission


class ConsumerListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated, ValidLicensePermission]
    serializer_class = ConsumerSerializer

    def get_queryset(self):
        return Consumer.objects.filter(section__id=self.kwargs["section_id"])


class ConsumerDetailAPIView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, ValidLicensePermission]
    serializer_class = ConsumerSerializer
    queryset = Consumer.objects.all()
    lookup_field = "id"


class ConsumerCreateAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated, ValidLicensePermission]
    serializer_class = ConsumerSerializer


class ConsumerTypeAPIView(GenericAPIView):
    permission_classes = [IsAuthenticated, ValidLicensePermission]
    serializer_class = ConsumerTypeSerializer
    queryset = ConsumerType.objects.all()

    def get(self, request):
        consumers = self.serializer_class(self.get_queryset(), many=True)
        return Response(consumers.data)
