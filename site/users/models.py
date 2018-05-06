from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models
from utils.helpers import create_thumbnail


class User(AbstractUser):
    bio = models.CharField(blank=True, max_length=256)
    avatar = models.ImageField(blank=True, upload_to='avatars')

    def __init__(self, *args, **kwargs):
        super(User, self).__init__(*args, **kwargs)
        self._meta.get_field('username').validators = [RegexValidator(regex=r'^([.\-_]?[a-zA-Z0-9]+)+[.\-_]?$'),
                                                       RegexValidator(regex=r'^.{4,32}$')]

    def save(self, *args, **kwargs):
        "Overriding save to crop the image and give it a custom URL."
        super().save(*args, **kwargs)
