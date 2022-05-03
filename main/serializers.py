from rest_framework import serializers
from .models import User


class UsersModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')
        # fields = '__all__'


class UsersModelSerializerV2(UsersModelSerializer):
    class Meta(UsersModelSerializer.Meta):
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff')
