from django.urls import path, include

app_name = "projects"

urlpatterns = [
    path('api-auth/', include('rest_framework.urls'))
]