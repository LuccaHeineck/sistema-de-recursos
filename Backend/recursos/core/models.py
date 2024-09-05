from django.db import models

# TipoPessoa table
class TipoPessoa(models.Model):
    id_tipo_pessoa = models.AutoField(primary_key=True)
    tipo_pessoa = models.TextField(blank=True, null=True)
    descricao = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'tipo_pessoa'

# Pessoa table
class Pessoa(models.Model):
    id_pessoa = models.AutoField(primary_key=True)
    nome = models.TextField(blank=True, null=True)
    id_tipo_pessoa = models.ForeignKey(TipoPessoa, on_delete=models.CASCADE, db_column='id_tipo_pessoa')

    class Meta:
        db_table = 'pessoa'

# StatusBem table
class StatusBem(models.Model):
    id_status = models.AutoField(primary_key=True)
    status = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'status_bem'

# TipoBem table
class TipoBem(models.Model):
    id_tipo_bem = models.AutoField(primary_key=True)
    tipo_bem = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'tipo_bem'

# Bem table
class Bem(models.Model):
    id_bem = models.AutoField(primary_key=True)
    descricao = models.TextField(blank=True, null=True)
    permite_reserva = models.BooleanField(null=True)
    id_status_bem = models.ForeignKey(StatusBem, on_delete=models.CASCADE, db_column='id_status_bem')
    id_tipo_bem = models.ForeignKey(TipoBem, on_delete=models.CASCADE, db_column='id_tipo_bem')

    class Meta:
        db_table = 'bem'

# MotivoRetirada table
class MotivoRetirada(models.Model):
    id_motivo = models.AutoField(primary_key=True)
    motivo = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'motivo_retirada'

# Reserva table
class Reserva(models.Model):
    id_reserva = models.AutoField(primary_key=True)
    id_pessoa = models.ForeignKey(Pessoa, on_delete=models.CASCADE, db_column='id_pessoa')
    data_reserva = models.DateField()
    data_validade_reserva = models.DateField(blank=True, null=True)
    quantidade_bem = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'reserva'

# ItensReserva table
class ItensReserva(models.Model):
    id_reserva = models.ForeignKey(Reserva, on_delete=models.CASCADE, db_column='id_reserva')
    id_bem = models.ForeignKey(Bem, on_delete=models.CASCADE, db_column='id_bem')
    quantidade_bem = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'itens_reserva'
        unique_together = (('id_reserva', 'id_bem'),)  # Composite primary key

# Retirada table
class Retirada(models.Model):
    id_retirada = models.AutoField(primary_key=True)
    id_pessoa = models.ForeignKey(Pessoa, on_delete=models.CASCADE, db_column='id_pessoa')
    data_retirada = models.DateField(blank=True, null=True)
    data_devolucao = models.DateField(blank=True, null=True)
    data_limite = models.DateField(blank=True, null=True)
    quantidade_bem = models.IntegerField(blank=True, null=True)
    observacao = models.TextField(blank=True, null=True)
    id_motivo_retirada = models.ForeignKey(MotivoRetirada, on_delete=models.CASCADE, db_column='id_motivo_retirada')

    class Meta:
        db_table = 'retirada'

# ItensRetirada table
class ItensRetirada(models.Model):
    id_retirada = models.ForeignKey(Retirada, on_delete=models.CASCADE, db_column='id_retirada')
    id_bem = models.ForeignKey(Bem, on_delete=models.CASCADE, db_column='id_bem')
    quantidade_bem = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'itens_retirada'
        unique_together = (('id_retirada', 'id_bem'),)  # Composite primary key

# Kit table
class Kit(models.Model):
    id_kit = models.AutoField(primary_key=True)
    id_tipo_bem = models.ForeignKey(TipoBem, on_delete=models.CASCADE, db_column='id_tipo_bem', blank=True, null=True)
    descricao = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'kit'
