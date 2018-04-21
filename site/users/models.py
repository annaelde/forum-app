from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models


class User(AbstractUser):
    bio = models.CharField(blank=True, max_length=256)

    def __init__(self, *args, **kwargs):
        super(User, self).__init__(*args, **kwargs)
        self._meta.get_field('username').validators = [RegexValidator(regex=r'^([.\-_]?[a-zA-Z0-9]+)+[.\-_]?$'),
                                                       RegexValidator(regex=r'^.{4,32}$')]
