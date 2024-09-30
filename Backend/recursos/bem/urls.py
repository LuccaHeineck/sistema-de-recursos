from django.urls import path, include
from . import views

urlpatterns = [
    path('cadastrar/', views.BemCreateView.as_view(), name='cadastrar-bem'),
    path('listar/', views.BemListView.as_view(), name="listar-bem"),
    path('update/<int:pk>/', views.BemUpdateView.as_view(), name='bem_update'),
    path('delete/<int:pk>/', views.BemDeleteView.as_view(), name='bem_delete'),
    path('tipo_bem/listar/', views.TipoBemListView.as_view(), name='listar-tipos-bem')
]
