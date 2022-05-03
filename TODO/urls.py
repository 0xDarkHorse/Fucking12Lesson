from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from main.views import UsersModelViewSet
from rest_framework.authtoken.views import obtain_auth_token
from project.views import ProjectsModelViewSet, TODOModelViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from graphene_django.views import GraphQLView


schema_view = get_schema_view(
    openapi.Info(
        title="Library",
        default_version='0.1',
        description="Documentation to out project",
        contact=openapi.Contact(email="Fuck@Fuck.Fucking"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

router = DefaultRouter()
router.register('users', UsersModelViewSet, basename="users")
router.register('projects', ProjectsModelViewSet, basename="projects")
router.register('todos', TODOModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token),
    path('api/', include(router.urls)),
    re_path(r'^api/(?P<version>\d\.\d)/', include(router.urls)),

    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path("graphql/", GraphQLView.as_view(graphiql=True)),
]
