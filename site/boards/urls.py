from django.conf.urls import url, include
from . import views
from threads.urls import urlpatterns as thread_patterns

urlpatterns = [
    # ex: /api/boards/
    url(r'^$', views.board_list.as_view()),
    # ex: /api/boards/{name}/
    url(r'^(?P<board>[a-zA-Z0-9])/$', views.board_detail.as_view()),
    # ex: /api/boards/{name}/threads/
    url(r'^(?P<board>[a-zA-Z0-9])/threads/', include(thread_patterns))
]
