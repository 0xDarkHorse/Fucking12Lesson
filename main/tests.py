import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from main.models import User
from project.views import ProjectsModelViewSet
from project.models import Projects, TODO


class TestAuthorViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectsModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_get_detail(self):
    #     user = User.objects.create(username='Pityx', first_name="Питух", email="lox@lox.lox")
    #     client = APIClient()
    #     response = client.get(f'/api/users/{user.uid}/')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestMath(APISimpleTestCase):
    def test_sqrt(self):
        self.assertEqual(10/2, 5)


    # def test_zero(self):
    #     self.assertEqual(4/0, None)


class TestBookViewSet(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_mixer(self):
        project = mixer.blend(Projects)
        admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/books/{project.id}/', {'fuck_name': 'Руслан и Людмила'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        proj = Projects.objects.get(id=project.id)
        self.assertEqual(proj.fuck_name, 'Руслан и Людмила')
