from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.db import models

def get_null_user():
    return get_user_model().objects.get_or_create(username='deleted')


class Post(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=128)
    content = models.TextField(max_length=1024)
    author = models.ForeignKey(User, related_name='posts',
                               on_delete=models.SET(get_null_user))
    slug = models.SlugField()

    def __str__(self):
        if self.title is not None:
            return self.title
        else:
            return "New Post"
