from django.conf.urls import url
from .views import thread_detail, thread_list

urlpatterns = [
    # ex: /api/board/{name}/threads/
    url(r'^$', thread_list.as_view()),
    # ex: /api/board/{name}/threads/{key}/{title}
    url(r'(?P<key>[a-zA-Z0-9]{4,4})/(?P<slug>[-\w]+?)/$', thread_detail.as_view())
]