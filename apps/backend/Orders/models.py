from django.db import models
from Users.models import Customer, Address
from shop.models import Product


# Create your models here.
class Order(models.Model):
    Customer = models.ForeignKey(Customer, on_delete=models.DO_NOTHING)
    paid = models.BooleanField(default=False)
    payment_methods = (("0", "stripe_checkout"), ("1", "PaymentIntent"))

    Payment_Statuses = (
        ("initiated", "initiated"),
        ("processing", "processing"),
        ("succeeded", "succeeded"),
        ("failed", "failed"),
        ("cancelled", "cancelled"),
    )

    Fullfilment_Statuses = (
        ("Unfulfilled", "Unfulfilled"),
        ("PartiallyFulfilled", "PartiallyFulfilled"),
        ("Fulfilled", "Fulfilled"),
    )

    payment_method = models.CharField(
        choices=payment_methods, default="1", max_length=50
    )

    payment_id = models.CharField(max_length=100)
    payment_status = models.CharField(
        choices=Payment_Statuses, default="initiated", max_length=50
    )

    fulfillment_status = models.CharField(
        choices=Fullfilment_Statuses, default="Unfulfilled", max_length=50
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    extra_charges = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.Customer} {self.id}"

    def total_amount(self):
        items = OrderItem.objects.filter(order=self)
        total_amount = self.extra_charges
        for item in items:
            total_amount += item.total_amount()
        return total_amount


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product_id = models.CharField(max_length=100, null=False)
    variation_id = models.CharField(null=False, max_length=50)
    Amount = models.IntegerField(null=False)  # single item price
    Customer = models.ForeignKey(Customer, on_delete=models.DO_NOTHING)
    Address = models.ForeignKey(Address, on_delete=models.DO_NOTHING)
    Quantity = models.IntegerField(null=False)
    Order_date = models.DateTimeField(auto_now_add=True, blank=True)

    details = models.TextField(max_length=500, null=True)
    paid = models.BooleanField(default=False)
    fullfillment_status = models.CharField(max_length=200, default="Unpaid")

    def total_amount(self):
        return self.Amount * self.Quantity

    @property
    def product(self):
        return Product.objects.get(id=self.product_id)

    def __str__(self):
        return str(self.id)
