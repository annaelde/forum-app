from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.db import models


def get_null_user():
    return get_user_model().objects.get_or_create(username='deleted')


class Post(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=128, blank=True, default='')
    content = models.TextField(max_length=1024, blank=True, default='')
    author = models.ForeignKey(User, on_delete=models.SET(get_null_user))
