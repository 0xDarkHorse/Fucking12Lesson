import random
from django.core.management.base import BaseCommand
from django.db import transaction

from random import randint

from project.models import Projects, TODO
from main.models import User


class Command(BaseCommand):
    help = 'Create projects'

    @transaction.atomic
    def handle(self, *args, **options):
        # TODO.objects.all().delete()
        # Projects.objects.all().delete()
        self.stdout.write("Creating new projects...")

        for i in range(5):
            lol = random.choices(range(15), k=randint(1, 1))[0]
            project = Projects.objects.create(name=f"Test{i}", url_git="http://sos.sosi/")
            authors = User.objects.get(username=f"Test{lol}")
            project.authors.add(authors)
            # project.save()
        print('Project Ok!')

        # for i in range(25):
        #     lol = random.choices(range(15), k=randint(1, 1))[0]
        #     todo = TODO.objects.create(text=f"sosi{i}", enabled=True)
        #     todo.project = random.choices([i for i in Projects.objects.all()], k=randint(1, 1))
        #     todo.author = User.objects.get(username=f"Test{lol}")
        #
        # print('TODO Ok!')

