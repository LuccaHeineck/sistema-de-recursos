from django.urls import path
from . import views

urlpatterns = [
    path('hello-world/', views.Hello_world.as_view()    , name='hello_world'),
]
