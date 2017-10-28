from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField()
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Post
        fields = ('title', 'author', 'content', 'created', 'id', 'slug')
