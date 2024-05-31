from django.urls import path

from app.internal.views.section_view import SectionListAPIView, SectionDetailAPIView, SectionDetailRetrieveAPIView, \
    SectionCreateAPIView

urlpatterns = [
    path("<int:id>/", SectionDetailAPIView.as_view(), name="section-detail"),
    path("create/", SectionCreateAPIView.as_view(), name="section-create"),
    path("detail/<int:id>/", SectionDetailRetrieveAPIView.as_view(), name="section-retrieve-detail"),
    path("list/<int:calculating_id>/", SectionListAPIView.as_view(), name="list-sections"),
]
