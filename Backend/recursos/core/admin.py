from django.contrib import admin
from .models import *

# Registrando os modelos no Django Admin
admin.site.register(Pessoa)
# admin.site.register(ItensReserva)
# admin.site.register(ItensRetirada)
# admin.site.register(Reserva)
admin.site.register(Bem)
admin.site.register(TipoPessoa)
# admin.site.register(Retirada)
# admin.site.register(MotivoRetirada)
admin.site.register(TipoBem)
