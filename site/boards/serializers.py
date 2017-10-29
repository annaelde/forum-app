from rest_framework import serializers

from .models import Board


class BoardSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField()

    class Meta:
        model = Board
        fields = ('name', 'description', 'created', 'slug')
