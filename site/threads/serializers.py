from rest_framework import serializers

from boards.models import Board
from users.models import User

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(read_only=True)
    author = serializers.SlugRelatedField(slug_field='username', queryset=User.objects.all())
    board = serializers.SlugRelatedField(slug_field='slug', queryset=Board.objects.all())

    class Meta:
        model = Post
        fields = ('title', 'author', 'content',
                  'created', 'board', 'key', 'slug',)
        read_only_fields = ('key', 'slug',)
