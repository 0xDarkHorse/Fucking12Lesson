from django.core.management.base import BaseCommand
from django.db import transaction
from main.models import User
from rest_framework.authtoken.models import Token


class Command(BaseCommand):
    help = 'Create superuser'

    @transaction.atomic
    def handle(self, *args, **options):
        User.objects.create_superuser(
            username='root',
            email='root@root.root',
            first_name='root',
            last_name='root',
            password='root',
        )

        for i in range(15):
            user = User.objects.create(username=f"Test{i}",
                                       email=f"lox{i}@lox.lox",
                                       first_name=f"Test{i}",
                                       last_name=f"Test{i}")
            user.set_password(f"Test{i}")
            user.save()

        for user in User.objects.all():
            Token.objects.get_or_create(user=user)
            
        print('User Ok!')
