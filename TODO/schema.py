import graphene
from graphene_django import DjangoObjectType

from project.models import Projects, TODO
from main.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Projects
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(TodoType)

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_projects(root, info):
        return Projects.objects.all()

    def resolve_all_todos(root, info):
        return TODO.objects.all()


schema = graphene.Schema(query=Query)
