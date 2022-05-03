from django_filters import rest_framework as filters
from .models import Projects, TODO


class ProjectsFilter(filters.FilterSet):
    fuck_name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        models = Projects
        fields = ("fuck_name",)


class TODOFilter(filters.FilterSet):
    project__fuck_name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        models = TODO
        fields = ("project",)
