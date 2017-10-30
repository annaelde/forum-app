from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny
from rest_framework.renderers import JSONRenderer

from utils.mixins import MultipleFieldLookupMixin

from .models import Post
from .serializers import PostSerializer


class post_list(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (AllowAny,)

class post_detail(MultipleFieldLookupMixin, RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_fields = ('key', 'slug')
    model = Post