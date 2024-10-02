from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('recursos/', include('core.urls')),
    path('bem/', include('bem.urls')),
]
