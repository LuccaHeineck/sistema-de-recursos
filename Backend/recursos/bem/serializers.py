from rest_framework import serializers
from .models import Bem, TipoBem


class TipoBemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoBem
        fields = "__all__"


class BemSerializer(serializers.ModelSerializer):
    id_tipo_bem = serializers.PrimaryKeyRelatedField(
        queryset=TipoBem.objects.all(),  # Permite a seleção de um TipoBem existente
        required=False  # Permite a atualização do campo
    )
    id_tipo_bem_nome = serializers.SerializerMethodField()

    created_by = serializers.CharField(source="created_by.username")

    class Meta:
        model = Bem
        fields = ['id_bem', 'descricao', 'permite_reserva', 'status_bem', "id_tipo_bem", 'id_tipo_bem_nome',
                  'created_by', 'created_at']  # Inclua id_tipo_bem_nome nos campos
        read_only_fields = ("id_bem", 'created_by', 'created_at')

    def get_id_tipo_bem_nome(self, obj):
        return obj.id_tipo_bem.tipo_bem if obj.id_tipo_bem else None

    def update(self, instance, validated_data):
        instance.descricao = validated_data.get(
            'descricao', instance.descricao)
        instance.permite_reserva = validated_data.get(
            'permite_reserva', instance.permite_reserva)
        instance.status_bem = validated_data.get(
            'status_bem', instance.status_bem)
        instance.id_tipo_bem = validated_data.get(
            'id_tipo_bem', instance.id_tipo_bem)

        instance.save()
        return instance
