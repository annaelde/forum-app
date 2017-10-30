from django.conf.urls import url
from . import views

urlpatterns = [
    # ex: /api/board/{name}/threads/
    url(r'^$', views.post_list.as_view()),
    # ex: /api/board/{name}/threads/{key}/{title}
    url(r'(?P<key>[a-zA-Z0-9]{4,4})/(?P<slug>[-\w]+?)/$', views.post_detail.as_view())
]