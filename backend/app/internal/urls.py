from django.urls import include, path

urlpatterns = [
    path("users/", include("app.internal.urls-path.user_urls")),
    path("auth/", include("app.internal.urls-path.auth_urls")),
    path("objects/", include("app.internal.urls-path.object_urls")),
    path("calculations/", include("app.internal.urls-path.calculating_urls")),
    path("sections/", include("app.internal.urls-path.section_urls")),
    path("inputs/", include("app.internal.urls-path.input_power_urls")),
    path("consumers/", include("app.internal.urls-path.consumer_urls")),
]
