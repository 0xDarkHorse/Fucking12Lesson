# FUCK Project-Django FUCK
# Without a clear technical specification, the result of WTF

from django.db import models
from main.models import User


class Projects(models.Model):
    name = models.CharField(max_length=20)
    url_git = models.URLField()
    authors = models.ManyToManyField(User)


class TODO(models.Model):
    project = models.ForeignKey(
        Projects,
        on_delete=models.CASCADE
    )
    text = models.TextField()
    data_create = models.DateTimeField(auto_now_add=True)
    data_edit = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    enabled = models.BooleanField(default=True)
