from django.conf.urls import include, url

from threads.urls import urlpatterns as thread_patterns

from .views import board_detail, board_list

urlpatterns = [
    # ex: /api/boards/
    url(r'^$', board_list.as_view()),
    # ex: /api/boards/{slug}/
    url(r'^(?P<slug>[a-zA-Z0-9]+?)/$', board_detail.as_view()),
    # ex: /api/boards/{slug}/threads/
    url(r'^(?P<slug>[a-zA-Z0-9]+?)/threads/', include(thread_patterns))
]
