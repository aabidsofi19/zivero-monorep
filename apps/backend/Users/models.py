from django.db import models
from django.contrib.auth.models import AbstractUser
from typing import Optional, Iterable

# from graphql_auth.models import UserStatus
class User(AbstractUser):
    is_customer = models.BooleanField(default=False)

    # def save(self, *args,**kwargs) :
    #     super().save(*args,**kwargs)
    #     if self.is_customer :
    #         Customer(user=self).save()

    # @property
    # def status(self):
    #     status = UserStatus.objects.get(user=self)
    #
    #     return status


class DynamicUpdateFields:
    def update_fields(self, update_values):
        for attr, value in update_values.items():
            if value:
                setattr(self, attr, value)
                self.save()


class Address(models.Model, DynamicUpdateFields):
    name = models.CharField(max_length=100)
    pincode = models.CharField(max_length=6)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    town = models.CharField(max_length=100)
    apartment_no = models.CharField(max_length=50)
    # is_primary = models.BooleanField(default=False)
    is_work = models.BooleanField(default=False)
    is_home = models.BooleanField(default=True)
    phone_number = models.CharField(max_length=13, null=False)

    def __str__(self):
        return self.pincode


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    phone_number = models.CharField(max_length=13, null=False, blank=True)
    Addresses = models.ManyToManyField(Address, blank=True)
    default_address = models.OneToOneField(
        Address,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="default_address",
    )
    is_verified = models.BooleanField(default=False)
    verification_methods = (
        (1, "phone"),
        (2, "email"),
    )
    verified_by = models.IntegerField(
        choices=verification_methods, null=True, blank=True
    )
    joined_on = models.DateField(auto_now_add=True, blank=True)

    def __str__(self):
        return str(self.user)
