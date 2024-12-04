from django.urls import path, include
from . import views

urlpatterns = [
    path('listar/', views.RetiradaListView.as_view(), name='listar-retiradas'),
    path('criar/', views.RetiradaCreateView.as_view(), name='criar-retirada'),
    path('editar/<int:pk>/', views.RetiradaUpdateView.as_view(),
         name='editar-retirada'),
    path('deletar/<int:pk>/', views.RetiradaDeleteView.as_view(),
         name='deletar-retirada'),

    path('itens/', views.ItensRetiradaListView.as_view(),
         name='listar-itens_retirada'),
    path('itens/criar', views.ItensRetiradaCreateView.as_view(),
         name='criar-itens_retirada'),
    path('itens/editar/<int:pk>', views.ItensRetiradaUpdateView.as_view(),
         name='editar-itens_retirada'),
    path('itens/deletar/<int:pk>', views.ItensRetiradaDeleteView.as_view(),
         name='deletar-itens_retirada'),

]
