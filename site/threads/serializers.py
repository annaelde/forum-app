from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    # Hash mark used to remove padding--might need to be - in Linux instead
    created = serializers.DateTimeField(format='%m/%d/%y at %#I:%M%p')
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Post
        fields = ('title', 'author', 'content', 'created', 'id', 'slug')

class UserSerializer(serializers.ModelSerializer):
    posts = serializers.PrimaryKeyRelatedField(many=True, queryset=Post.objects.all())
    class Meta:
        model = User
        fields = ('id', 'username', 'posts')
