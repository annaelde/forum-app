from rest_framework.generics import (ListCreateAPIView,
                                     RetrieveUpdateDestroyAPIView)
from rest_framework.permissions import (IsAuthenticated,
                                        IsAuthenticatedOrReadOnly)

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

    def check_object_permissions(self, request, obj):
        super(ThreadDetail, self).check_object_permissions(request, obj)
        # Check for object permissions
        if request.method.lower() in ['delete', 'put', 'patch'] and request.user != obj.author:
            self.permission_denied(request,
                                   message='User cannot edit this object.')
