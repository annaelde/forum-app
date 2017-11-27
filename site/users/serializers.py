from rest_framework.serializers import (DateTimeField, ModelSerializer,
                                        PrimaryKeyRelatedField)

from threads.models import Post
from threads.serializers import PostSerializer
from .models import User


class PublicUserSerializer(ModelSerializer):
    threads = PostSerializer(many=True)

    class Meta:
        model=User
        fields=('username', 'date_joined', 'threads')

class PrivateUserSerializer(ModelSerializer):
    threads = PostSerializer(many=True)

    class Meta:
        model=User
        fields=('username','email', 'date_joined', 'last_login', 'threads')
