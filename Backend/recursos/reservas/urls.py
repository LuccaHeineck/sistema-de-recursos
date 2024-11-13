# reservas/urls.py
from django.urls import path
from .views import ReservaCreateView, ReservaUpdateView, ReservaDeleteView, ReservaListView

urlpatterns = [
    path('listar/', ReservaListView.as_view(), name='reserva-list'),
    path('cadastrar/', ReservaCreateView.as_view(), name='reserva-create'),
    path('editar/<int:pk>/', ReservaUpdateView.as_view(), name='reserva-update'),
    path('deletar/<int:pk>/', ReservaDeleteView.as_view(), name='reserva-delete'),
]
