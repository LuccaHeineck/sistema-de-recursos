from django.db import models
from django.contrib.auth.models import User
from bem.models import Bem


class Retiradas(models.Model):
    MOTIVO_RETIRADA_CHOICES = [
        ('TCC', 'Trabalho de Conclusão de Curso'),
        ('Aula', 'Aula'),
        ('Projetos', 'Projetos')
    ]

    STATUS_RETIRADA_CHOICES = [
        ('Em andamento', 'Em andamento'),
        ('Concluída', 'Concluída'),
    ]

    id_retirada = models.AutoField(primary_key=True)
    id_pessoa = models.ForeignKey(User, on_delete=models.CASCADE)
    data_retirada = models.DateTimeField()
    status_retirada = models.CharField(
        max_length=50, choices=STATUS_RETIRADA_CHOICES, null=True, default="Retirada")
    motivo_retirada = models.CharField(
        max_length=50, choices=MOTIVO_RETIRADA_CHOICES)


class ItensRetirada(models.Model):

    STATUS_ITEM_RETIRADA_CHOICES = [
        ('Retirado', 'Retirado'),
        ('Atrasado', 'Atrasado'),
        ('Devolvido', 'Devolvido'),
    ]

    id = models.AutoField(primary_key=True) 
    id_retirada = models.ForeignKey(
        Retiradas, on_delete=models.CASCADE, related_name='itens_retirada')
    id_bem = models.ForeignKey(
        Bem, on_delete=models.CASCADE, related_name='itens_retirada')
    quantidade_bem = models.IntegerField()
    data_retirada = models.DateTimeField()
    data_devolucao = models.DateTimeField(blank=True, null=True)
    data_limite = models.DateTimeField()
    status_retirada = models.CharField(
        max_length=50, choices=STATUS_ITEM_RETIRADA_CHOICES, null=True, default="Retirada")
    observacao = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = (("id_retirada", "id_bem"),)
        # Optionally set a unique constraint:
        # constraints = [
        #     models.UniqueConstraint(fields=["id_retirada", "id_bem"], name="unique_id_retirada_id_bem")
        # ]
