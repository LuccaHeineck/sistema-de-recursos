from rest_framework import serializers
from .models import ItensRetirada, Retiradas


class RetiradasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Retiradas
        fields = '__all__'


class ItensRetiradaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItensRetirada
        fields = '__all__'
        
    def validate(self, attrs):
        # Adicione validações personalizadas aqui, se necessário
        if attrs['data_devolucao'] and attrs['data_devolucao'] < attrs['data_retirada']:
            raise serializers.ValidationError(
                "A data de devolução não pode ser anterior à data de retirada.")
        return attrs
