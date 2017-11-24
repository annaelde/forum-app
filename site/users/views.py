from rest_framework.generics import (ListCreateAPIView,
                                     RetrieveUpdateDestroyAPIView)
from rest_framework.permissions import (SAFE_METHODS, IsAuthenticated,
                                        IsAuthenticatedOrReadOnly)

from utils.mixins import MultipleFieldLookupMixin

from .models import User
from .serializers import PublicUserSerializer, PrivateUserSerializer


class UserList(ListCreateAPIView):
    "A list of all registered users."
    serializer_class = PublicUserSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = User.objects.all()


class UserDetail(RetrieveUpdateDestroyAPIView):
    "A single user's account details."
    queryset = User.objects.all()
    permission_classes = (IsAuthenticatedOrReadOnly,)
    lookup_field = 'username'
    model = User

    def check_object_permissions(self, request, obj):
        super(UserDetail, self).check_object_permissions(request, obj)
        if request.method not in SAFE_METHODS and request.user != obj.username:
            self.permission_denied(request,
                                   message='User cannot edit this object.')

    def get_serializer_class(self):
        if self.request.user == self.kwargs['username']:
            return PrivateUserSerializer
        else:
            return PublicUserSerializer
