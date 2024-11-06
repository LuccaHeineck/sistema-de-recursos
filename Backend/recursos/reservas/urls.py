# reservas/urls.py
from django.urls import path
from .views import ReservaCreateView, ReservaUpdateView, ReservaDeleteView, ReservaListView

urlpatterns = [
    path('listar/', ReservaListView.as_view(), name='reserva-list'),
    path('create/', ReservaCreateView.as_view(), name='reserva-create'),
    path('<int:pk>/update/', ReservaUpdateView.as_view(), name='reserva-update'),
    path('<int:pk>/delete/', ReservaDeleteView.as_view(), name='reserva-delete'),
]
