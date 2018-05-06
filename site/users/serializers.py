from rest_framework.serializers import (DateTimeField, ModelSerializer,
                                        PrimaryKeyRelatedField, SerializerMethodField)

from threads.models import Post
from threads.serializers import PostSerializer
from .models import User


class BaseUserSerializer(ModelSerializer):
    posts = PostSerializer(many=True)
    avatar = SerializerMethodField()

    def get_avatar(self, profile):
        return profile.avatar.url

    class Meta:
        model = User

class PublicUserSerializer(BaseUserSerializer):

    class Meta(BaseUserSerializer.Meta):
        fields = ('username', 'avatar', 'date_joined', 'posts', 'bio')


class PrivateUserSerializer(BaseUserSerializer):

    class Meta(BaseUserSerializer.Meta):
        fields = ('username', 'avatar', 'email',
                  'date_joined', 'last_login', 'posts', 'bio')
