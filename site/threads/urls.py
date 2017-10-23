from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.post_list.as_view()),
    url(r'/?P<id>[0-9]/$', views.post_detail.as_view())
]