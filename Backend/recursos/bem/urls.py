from django.urls import path, include
from . import views

urlpatterns = [
    path('cadastrar/', views.BemCreateView.as_view(), name='cadastrar-bem'),
    path('listar/', views.BemListView.as_view(), name="listar-bem"),
    path('editar/<int:pk>/', views.BemUpdateView.as_view(), name='bem_update'),
    path('deletar/<int:pk>/', views.BemDeleteView.as_view(), name='bem_delete'),
    path('tipo_bem/listar/', views.TipoBemListView.as_view(),
         name='listar-tipos-bem'),
    path('tipo_bem/cadastrar/',
         views.TipoBemCreateView.as_view(), name='criar-tipobem'),
    path('tipo_bem/editar/<int:pk>/',
         views.TipoBemUpdateView.as_view(), name='atualizar-tipobem'),
    path('tipo_bem/deletar/<int:pk>/',
         views.TipoBemDeleteView.as_view(), name='deletar-tipobem')
]
