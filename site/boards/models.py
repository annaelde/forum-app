from django.contrib.auth import get_user_model
from django.db import models
from slugify import slugify


def slugify_board_name(name: str) -> str:
    slug = name.replace('&', 'and')
    return slugify(slug, max_length=64, separator='',
                   save_order=True, entities=False)


class Board(models.Model):
    created = models.DateTimeField(auto_now_add=True, editable=False)
    name = models.CharField(max_length=64, unique=True, blank=False)
    description = models.CharField(max_length=712, blank=False)
    slug = models.SlugField(db_index=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify_board_name(self.name)
        super(Board, self).save(*args, **kwargs)
