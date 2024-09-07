from rest_framework import serializers
from .models import Bem, TipoBem
from django.core.validators import MinValueValidator


class BemSerializer(serializers.ModelSerializer):
    valor = serializers.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(0.0)])

    class Meta:
        model = Bem
        fields = ['id_bem', 'descricao', 'permite_reserva',
                  'id_status_bem', 'id_tipo_bem', 'valor']


class TipoBemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoBem
        fields = ['id_tipo_bem', 'tipo_bem']
