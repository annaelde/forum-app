from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator
from django.db import models
from django.utils.crypto import get_random_string
from nltk.corpus import stopwords as nltk_stopwords
from slugify import slugify

from boards.models import Board


def get_null_user():
    return get_user_model().objects.get_or_create(username='deleted')


def get_null_board():
    return Board.objects.get_or_create(name='deleted')


def get_key(post: object) -> str:
    key = get_random_string(length=4)
    unique = False
    queryset = Post.objects.filter(
        board_id=post.board, key=post.key, title=post.title)
    while not unique:
        if queryset.exists():
            key = get_random_string(length=4)
        else:
            unique = True
    return key


def slugify_thread_title(title: str) -> str:
    stopwords = set(nltk_stopwords.words('english'))
    slug = slugify(title, max_length=64,
                   stopwords=self.stopwords,
                   word_boundary=True, save_order=True)
    if not slug:  # Case if *only* stopwords are used
        slug = slugify(title, max_length=64,
                       word_boundary=True, save_order=True)
    return slug


class Post(models.Model):
    created = models.DateTimeField(auto_now_add=True, editable=False)
    title = models.CharField(max_length=128)
    content = models.TextField(max_length=1024)
    author = models.ForeignKey(get_user_model(), related_name='posts',
                               on_delete=models.SET(get_null_user))
    board = models.ForeignKey(Board, related_name='posts',
                              on_delete=models.SET(get_null_board))
    slug = models.SlugField(db_index=True)
    key = models.CharField(max_length=4,
                           validators=[RegexValidator(
                               regex=r'[a-zA-Z0-9]{4}')],
                           db_index=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify_thread_title(self.title)
        if not self.key:
            self.key = get_key(self)
        super(Post, self).save(*args, **kwargs)

    def __str__(self):
        return self.title
