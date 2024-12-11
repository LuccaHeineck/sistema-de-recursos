from rest_framework import serializers
from .models import Bem, ItensRetirada, Retiradas


class RetiradasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Retiradas
        fields = '__all__'


class ItensRetiradaSerializer(serializers.ModelSerializer):
    id_retirada = serializers.PrimaryKeyRelatedField(
        queryset=Retiradas.objects.all())
    id_bem = serializers.PrimaryKeyRelatedField(queryset=Bem.objects.all())
    bem = serializers.SerializerMethodField()

    class Meta:
        model = ItensRetirada
        fields = [
            'id_retirada', 'id_bem', 'bem', 'quantidade_bem', 'data_retirada',
            'data_devolucao', 'data_limite', 'status_retirada', 'observacao',
        ]

    def get_bem(self, obj):
        try:
            bem = Bem.objects.get(id_bem=obj.id_bem.id_bem)
            return bem.descricao
        except Bem.DoesNotExist:
            return None

    def validate(self, attrs):
        # Adicione validações personalizadas aqui, se necessário
        if attrs['data_devolucao'] and attrs['data_devolucao'] < attrs['data_retirada']:
            raise serializers.ValidationError(
                "A data de devolução não pode ser anterior à data de retirada.")
        return attrs
