from django.db import models

from bem.models import *
from retiradas.models import *


class TipoPessoa(models.Model):
    id_tipo_pessoa = models.AutoField(primary_key=True)
    tipo_pessoa = models.TextField(blank=True, null=True)
    descricao = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'tipo_pessoa'


class Pessoa(models.Model):
    id_pessoa = models.AutoField(primary_key=True)
    nome = models.TextField(blank=True, null=True)
    id_tipo_pessoa = models.ForeignKey(
        TipoPessoa, on_delete=models.CASCADE, db_column='id_tipo_pessoa')

    class Meta:
        db_table = 'pessoa'
