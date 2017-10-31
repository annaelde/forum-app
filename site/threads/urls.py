from django.conf.urls import url
from .views import thread_detail, thread_list

urlpatterns = [
    # ex: /api/board/{board}/threads/
    url(r'^$', thread_list.as_view()),
    # ex: /api/board/{board}/threads/{key}/{thread}
    url(r'(?P<key>[a-zA-Z0-9]{4,4})/(?P<thread>[-\w]+?)/$', thread_detail.as_view())
]