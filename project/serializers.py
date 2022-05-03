from rest_framework import serializers
from .models import Projects, TODO
from main.models import User
from rest_framework.fields import UUIDField
from rest_framework import permissions


class ProjectsModelSerializer(serializers.HyperlinkedModelSerializer):
    # permission_classes = [permissions.IsAuthenticated]
    authors = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())
    url_git = serializers.URLField(required=False)

    class Meta:
        model = Projects
        fields = '__all__'


class TODOModelSerializer(serializers.HyperlinkedModelSerializer):
    # permission_classes = [permissions.IsAuthenticated]
    project = serializers.PrimaryKeyRelatedField(queryset=Projects.objects.all())
    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all()) # Fuck, Not use all()..

    class Meta:
        model = TODO
        exclude = ('data_create', 'data_edit')
