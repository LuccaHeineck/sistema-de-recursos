from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.LoginView.as_view()),
    path('login/', views.LogoutView.as_view()),
    path('users/', views.UserListView.as_view()),
    path('users/<int:pk>', views.UserListView.as_view()),
    path('register/', views.RegisterView.as_view()),
]
