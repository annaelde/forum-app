from django.conf.urls import url
from . import views

urlpatterns = [
    # ex: /api/threads/
    url(r'^$', views.post_list.as_view()),
    # ex: /api/threads/143/first-post
    url(r'(?P<pk>[0-9]+?)/(?P<slug>[-\w\d]+?)/$', views.post_detail.as_view())
]