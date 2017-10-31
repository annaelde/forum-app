from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny

from .models import Board
from .serializers import BoardSerializer


class board_list(ListAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = (AllowAny,)


class board_detail(RetrieveAPIView):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = (AllowAny,)
    lookup_field = 'slug'
    lookup_url_kwarg = 'board'
    model = Board
