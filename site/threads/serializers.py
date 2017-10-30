from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField()
    author = serializers.ReadOnlyField(source='author.username')
    board = serializers.ReadOnlyField(source='board.name')

    class Meta:
        model = Post
        fields = ('title', 'author', 'content',
                  'created', 'key', 'slug', 'board')
