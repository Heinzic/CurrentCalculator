from django.urls import include, path

urlpatterns = [
    path("users/", include("app.internal.urls-path.user_urls")),
    path("auth/", include("app.internal.urls-path.auth_urls")),
]
