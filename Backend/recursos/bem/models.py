from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator


class TipoBem(models.Model):
    id_tipo_bem = models.AutoField(primary_key=True)
    tipo_bem = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'tipo_bem'


class Bem(models.Model):
    STATUS_BEM_CHOICES = [
        ('R', 'Retirado'),
        ('D', 'Disponível'),
    ]

    id_bem = models.IntegerField(primary_key=True, validators=[
        MinValueValidator(0.0)])
    descricao = models.TextField(blank=True, null=True)
    quantidade_bem = models.IntegerField(default=1)
    permite_reserva = models.BooleanField(null=True)
    status_bem = models.CharField(
        max_length=1,
        choices=STATUS_BEM_CHOICES,
        default='D',  # Define o valor padrão como 'Disponível'
    )
    id_tipo_bem = models.ForeignKey(
        TipoBem, on_delete=models.CASCADE, db_column='id_tipo_bem')
    created_by = models.ForeignKey(
        User, related_name='bem', on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'bem'


class Kit(models.Model):
    id_kit = models.AutoField(primary_key=True)
    id_bem = models.ForeignKey(Bem, on_delete=models.CASCADE)
    descricao = models.TextField(blank=True, null=True)
