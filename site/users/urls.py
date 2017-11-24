from django.conf.urls import url
from .views import UserDetail, UserList

urlpatterns = [
    # ex: /api/board/{board}/threads/
    url(r'^$', UserList.as_view()),
    # ex: /api/board/{board}/threads/{key}/{thread}
    url(r'(?P<username>[\w]*)/$', UserDetail.as_view())
]