from django.db import models
from django.contrib.auth.models import User
from bem.models import Bem


class Retiradas(models.Model):
    MOTIVO_RETIRADA_CHOICES = [
        ('TCC', 'Trabalho de Conclusão de Curso'),
        ('Aula', 'Aula'),
    ]

    id_retirada = models.AutoField(primary_key=True)
    id_pessoa = models.ForeignKey(User, on_delete=models.CASCADE)
    data_retirada = models.DateTimeField()
    data_devolucao = models.DateTimeField(blank=True, null=True)
    data_limite = models.DateTimeField()
    quantidade_bem = models.IntegerField()
    motivo_retirada = models.CharField(
        max_length=50, choices=MOTIVO_RETIRADA_CHOICES)
    observacao = models.TextField(
        blank=True, null=True)


class ItensRetirada(models.Model):
    id_retirada = models.ForeignKey(
        Retiradas, on_delete=models.CASCADE, related_name='itens_retirada')
    id_bem = models.ForeignKey(
        Bem, on_delete=models.CASCADE, related_name='itens_retirada')
    quantidade_bem = models.IntegerField()
