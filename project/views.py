from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Projects, TODO
from .serializers import ProjectsModelSerializer, TODOModelSerializer
from rest_framework.pagination import LimitOffsetPagination
from .filters import ProjectsFilter, TODOFilter


class ProjectsLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TODOLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectsModelViewSet(ModelViewSet):
    queryset = Projects.objects.all()
    serializer_class = ProjectsModelSerializer
    pagination_class = ProjectsLimitOffsetPagination
    filterset_class = ProjectsFilter


class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    pagination_class = LimitOffsetPagination
    filterset_class = TODOFilter

    def destroy(self, request, pk=None, *args, **kwargs):
        todo = get_object_or_404(TODO, pk=pk)
        todo.enabled = False
        todo.save()
        return Response(TODOModelSerializer(todo, context={'request': request}).data)
