from rest_framework import serializers
from .models import ItensReserva, Reserva


class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = '__all__'


class ItensReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItensReserva
        fields = '__all__'
        
    def validate(self, attrs):
        # Adicione validações personalizadas aqui, se necessário
        if attrs['data_validade_reserva'] and attrs['data_validade_reserva'] < attrs['data_reserva']:
            raise serializers.ValidationError(
                "A data de validade não pode ser anterior à data de reserva.")
        return attrs
