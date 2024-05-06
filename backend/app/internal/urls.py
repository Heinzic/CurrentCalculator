from django.urls import include, path

urlpatterns = [
    path("users/", include("app.internal.urls-path.user_urls")),
    path("auth/", include("app.internal.urls-path.auth_urls")),
    path("objects/", include("app.internal.urls-path.object_urls")),
    path("calculations/", include("app.internal.urls-path.calculating_urls")),
]
