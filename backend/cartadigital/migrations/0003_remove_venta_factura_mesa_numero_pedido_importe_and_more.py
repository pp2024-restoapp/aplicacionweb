# Generated by Django 4.2.1 on 2023-06-16 13:34

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cartadigital', '0002_alter_comentario_usuario_alter_pedido_usuario_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='venta',
            name='factura',
        ),
        migrations.AddField(
            model_name='mesa',
            name='numero',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='pedido',
            name='importe',
            field=models.FloatField(default=0.0),
        ),
        migrations.AddField(
            model_name='pedido',
            name='numeroMesa',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='pedido',
            name='pago',
            field=models.CharField(default='pendiente', max_length=15),
        ),
        migrations.AddField(
            model_name='venta',
            name='descuento',
            field=models.FloatField(default=0.0),
        ),
        migrations.AddField(
            model_name='venta',
            name='estado',
            field=models.CharField(default='pendiente', max_length=25),
        ),
        migrations.AddField(
            model_name='venta',
            name='fecha_hora',
            field=models.DateTimeField(default=datetime.datetime(2023, 6, 16, 10, 34, 26, 516750)),
        ),
        migrations.AddField(
            model_name='venta',
            name='formaPago',
            field=models.CharField(default='efectivo', max_length=30),
        ),
        migrations.AddField(
            model_name='venta',
            name='importe',
            field=models.FloatField(default=0.0),
        ),
        migrations.AddField(
            model_name='venta',
            name='numComprobante',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='pedido',
            name='fecha_Hora',
            field=models.DateTimeField(default=datetime.datetime(2023, 6, 16, 10, 34, 26, 512752)),
        ),
        migrations.AlterField(
            model_name='reserva',
            name='fecha_hora',
            field=models.DateTimeField(default=datetime.datetime(2023, 6, 16, 10, 34, 26, 518750)),
        ),
        migrations.DeleteModel(
            name='Factura',
        ),
    ]
