from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny

from utils.mixins import MultipleFieldLookupMixin

from .models import Post
from .serializers import PostSerializer


class thread_list(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        board = self.kwargs['board']
        return Post.objects.filter(board__slug=board)


class thread_detail(MultipleFieldLookupMixin, RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (AllowAny,)
    lookup_fields = ('board', 'key', 'thread')
    model = Post
