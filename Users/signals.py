from django.dispatch import receiver
from django.db import models
from .models import User,Customer
from django.dispatch import receiver


@receiver(models.signals.post_save, sender=User)
def user_created(sender, instance, created, **kwargs):
    print("recieved signal")
    if created and instance.is_customer:
        Customer.objects.create(user=instance,verified_by=2)