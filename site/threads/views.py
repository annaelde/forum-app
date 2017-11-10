from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

from utils.mixins import MultipleFieldLookupMixin

from .models import Post
from .serializers import PostSerializer


class ThreadList(ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        board = self.kwargs['board']
        return Post.objects.filter(board__slug=board)


class ThreadDetail(MultipleFieldLookupMixin, RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    lookup_fields = ['board__slug', 'key', 'slug']
    lookup_url_kwargs = ['board', 'key', 'thread']
    model = Post