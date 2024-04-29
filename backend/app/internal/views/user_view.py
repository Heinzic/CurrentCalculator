from app.internal.serializers.user_serializer import ChangeLicensePeriodSerializer, UserSerializer
from app.internal.utils.permissions import AdminAccessPermission, ValidLicensePermission
from django.contrib.auth import get_user_model
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated


class UserDetailAPIView(RetrieveUpdateDestroyAPIView):
    """CRUD operation for users"""

    permission_classes = [IsAuthenticated, ValidLicensePermission]
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()

    def get_object(self):
        return self.request.user


class UserListAPIView(ListAPIView):
    permission_classes = [IsAuthenticated, AdminAccessPermission]
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()

    # def get(self, request, *args, **kwargs):
    #     queryset = self.filter_queryset(self.get_queryset())
    #
    #     page = self.paginate_queryset(queryset)
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)
    #
    #     serializer = self.get_serializer(queryset, many=True)
    #     return Response(serializer.data)


class ChangeLicensePeriodAPIView(UpdateAPIView):
    permission_classes = [AdminAccessPermission]
    serializer_class = ChangeLicensePeriodSerializer
    queryset = get_user_model().objects.all()
    lookup_field = "username"
