# Generated by Django 3.1.1 on 2020-11-18 12:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Orders', '0003_auto_20201118_1700'),
    ]

    operations = [
        migrations.RenameField(
            model_name='orderitem',
            old_name='order_group',
            new_name='order',
        ),
    ]
