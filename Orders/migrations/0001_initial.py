# Generated by Django 3.1.1 on 2020-11-17 08:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Product', models.CharField(max_length=100)),
                ('Variation', models.IntegerField()),
                ('Price', models.IntegerField()),
                ('Quantity', models.IntegerField()),
                ('Order_date', models.DateTimeField()),
                ('details', models.TextField(max_length=500, null=True)),
                ('Status', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='OrderGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
    ]