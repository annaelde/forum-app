from django.conf.urls import include, url

from threads.urls import urlpatterns as thread_patterns

from .views import board_detail, board_list

urlpatterns = [
    # ex: /api/boards/
    url(r'^$', board_list.as_view()),
    # ex: /api/boards/{board}/
    url(r'^(?P<board>[\w]*)/$', board_detail.as_view()),
    # ex: /api/boards/{board}/threads/
    url(r'^(?P<board>[\w]*)/threads/', include(thread_patterns))
]
