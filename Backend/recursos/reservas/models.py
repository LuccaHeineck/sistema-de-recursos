from django.db import models
from django.contrib.auth.models import User
from bem.models import Bem


class Reserva(models.Model):

    id_reserva = models.AutoField(primary_key=True)
    id_pessoa = models.ForeignKey(User, on_delete=models.CASCADE)
    data_reserva = models.DateTimeField()
    data_validade_reserva = models.DateTimeField()


class ItensReserva(models.Model):

    id_reserva = models.ForeignKey(
        Reserva, on_delete=models.CASCADE, related_name='itens_reserva', primary_key=True)
    id_bem = models.ForeignKey(
        Bem, on_delete=models.CASCADE, related_name='itens_reserva')
    quantidade_bem = models.IntegerField()
    data_reserva = models.DateTimeField()
    data_validade_reserva = models.DateTimeField(blank=True, null=True)
    observacao = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = (("id_reserva", "id_bem"),)


