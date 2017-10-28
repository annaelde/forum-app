from django.contrib.auth.models import User
from rest_framework.serializers import (DateTimeField, ModelSerializer,
                                        PrimaryKeyRelatedField)

from threads.models import Post

from .models import Profile


class ProfileSerializer(ModelSerializer):
    joined = DateTimeField()

    class Meta:
        model = Profile
        fields = ('joined',)


class UserSerializer(ModelSerializer):
    posts = PrimaryKeyRelatedField(many=True,
                                   queryset=Post.objects.all())
    profile = ProfileSerializer(many=False)

    class Meta:
        model = User
        fields = ('id', 'email', 'profile', 'posts')
