from rest_framework.serializers import (DateTimeField, ModelSerializer,
                                        PrimaryKeyRelatedField)

from threads.models import Post

from .models import User


class UserSerializer(ModelSerializer):
    posts = PrimaryKeyRelatedField(many=True,
                                   queryset=Post.objects.all())

    class Meta:
        model=User
        fields=('username', 'email', 'date_joined', 'last_login', 'posts')
