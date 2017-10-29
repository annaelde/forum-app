from django.db import models

class Board(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=64, unique=True, blank=False)
    description = models.CharField(max_length=712, blank=False)
    slug = models.SlugField()

    def __str__(self):
        return self.name