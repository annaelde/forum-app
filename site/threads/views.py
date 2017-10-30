from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny

from utils.mixins import MultipleFieldLookupMixin

from .models import Post
from .serializers import PostSerializer


class thread_list(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (AllowAny,)


class thread_detail(MultipleFieldLookupMixin, RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (AllowAny,)
    lookup_fields = ('key', 'slug')
    model = Post
