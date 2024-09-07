from django.urls import path, include
from . import views

urlpatterns = [
    path('cadastrar/', views.BemCreateView.as_view(), name='cadastrar-bem'),
    path('listar/', views.BemListView.as_view(), name="listar-bem")
]
