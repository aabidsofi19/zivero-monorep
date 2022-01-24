# Generated by Django 3.1.1 on 2020-11-18 11:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0002_auto_20201117_1427'),
        ('Orders', '0002_auto_20201117_1412'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Product', models.CharField(max_length=100)),
                ('Variation', models.IntegerField()),
                ('Amount', models.IntegerField()),
                ('Quantity', models.IntegerField()),
                ('Order_date', models.DateTimeField()),
                ('details', models.TextField(max_length=500, null=True)),
                ('paid', models.BooleanField(default=False)),
                ('Status', models.CharField(max_length=200)),
                ('Address', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='Users.address')),
                ('Customer', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='Users.customer')),
            ],
        ),
        migrations.RemoveField(
            model_name='order',
            name='Address',
        ),
        migrations.RemoveField(
            model_name='order',
            name='Order_date',
        ),
        migrations.RemoveField(
            model_name='order',
            name='Price',
        ),
        migrations.RemoveField(
            model_name='order',
            name='Product',
        ),
        migrations.RemoveField(
            model_name='order',
            name='Quantity',
        ),
        migrations.RemoveField(
            model_name='order',
            name='Status',
        ),
        migrations.RemoveField(
            model_name='order',
            name='Variation',
        ),
        migrations.RemoveField(
            model_name='order',
            name='details',
        ),
        migrations.RemoveField(
            model_name='order',
            name='order_group',
        ),
        migrations.DeleteModel(
            name='OrderGroup',
        ),
        migrations.AddField(
            model_name='orderitem',
            name='order_group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Orders.order'),
        ),
    ]
