# Generated by Django 3.1.13 on 2022-01-06 08:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0005_remove_address_is_primary'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='name',
            field=models.CharField(default='aabid', max_length=100),
            preserve_default=False,
        ),
    ]
