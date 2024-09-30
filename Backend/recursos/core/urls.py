from django.urls import path
from . import views

urlpatterns = [
    path('hello-world/', views.Hello_world.as_view(), name='hello_world'),
    path('login/', views.LoginView.as_view()),
    path('usuario_logado/', views.UsuarioLogadoView.as_view(), name='usuario-logado'),
]
