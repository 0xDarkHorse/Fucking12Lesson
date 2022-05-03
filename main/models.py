from uuid import uuid4
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    email = models.EmailField('email address', unique=True, default='')

    # def __str__(self):
    #     return f'{self.first_name} {self.last_name}'

    class Meta:
        verbose_name = 'user'
