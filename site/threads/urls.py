from django.conf.urls import url
from .views import ThreadDetail, ThreadList

urlpatterns = [
    # ex: /api/board/{board}/threads/
    url(r'^$', ThreadList.as_view()),
    # ex: /api/board/{board}/threads/{key}/{thread}
    url(r'(?P<key>[a-zA-Z0-9]{4,4})/(?P<thread>[-\w]+?)/$', ThreadDetail.as_view())
]