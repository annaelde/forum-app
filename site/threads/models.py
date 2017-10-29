from django.contrib.auth import get_user_model
from django.db import models

from boards.models import Board


def get_null_user():
    return get_user_model().objects.get_or_create(username='deleted')


def get_null_board():
    return Board.objects.get_or_create(name='deleted')


class Post(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=128)
    content = models.TextField(max_length=1024)
    author = models.ForeignKey(get_user_model(), related_name='posts',
                               on_delete=models.SET(get_null_user))
    board = models.ForeignKey(Board, related_name='posts', 
                              on_delete=models.SET(get_null_board))
    slug = models.SlugField()
    key = models.CharField(max_length=6)
    
    def __str__(self):
        return self.title
