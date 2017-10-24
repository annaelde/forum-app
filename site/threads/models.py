from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


def get_null_user():
    return get_user_model().objects.get_or_create(username='deleted')


class Post(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=128)
    content = models.TextField(max_length=1024)
    author = models.ForeignKey(User, related_name='posts', on_delete=models.SET(get_null_user))
    slug = models.SlugField()
    
    def __str__(self):
        if self.title is not None:
            return self.title
        else:
            return "New Post"


class Profile(models.Model):
    """
    Extending the user model with a one-to-one link.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
