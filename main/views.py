from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from .models import User
from .serializers import UsersModelSerializer, UsersModelSerializerV2


class UsersModelViewSet(GenericViewSet, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UsersModelSerializerV2
        return UsersModelSerializer
