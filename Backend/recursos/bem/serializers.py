from rest_framework import serializers
from .models import Bem, TipoBem
from django.core.validators import MinValueValidator


class BemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bem
        fields = "__all__"
        read_only_fields = ('created_by', 'created_at')


class TipoBemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoBem
        fields = ['id_tipo_bem', 'tipo_bem']
