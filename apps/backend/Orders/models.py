import operator
from functools import reduce
from django.db import models
from Users.models import Customer, Address
from cart.models import document_exists
from shop.models import Product


# Create your models here.
class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.DO_NOTHING)
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

    address = models.ForeignKey(Address, on_delete=models.DO_NOTHING, null=True)
    tax_percent = models.IntegerField(default=0)
    discount_percent = models.IntegerField(default=0)
    shipping_charges = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.customer} {self.id}"

    @property
    def total_amount(self):
        items = OrderItem.objects.filter(order=self)
        subtotal = sum((x.total_amount for x in items))
        subtotal = subtotal + self.shipping_charges
        subtotal = subtotal - (subtotal * self.discount_percent / 100)
        return subtotal + (subtotal * self.tax_percent / 100)

    @property
    def total_items(self):

        items = OrderItem.objects.filter(order=self)
        return len(items)

    @property
    def total_quantity(self):

        items = OrderItem.objects.filter(order=self)
        return reduce(sum, map(lambda x: x.quantity, items))

    @property
    def total_weight(self):

        items = OrderItem.objects.filter(order=self)
        return reduce(sum, map(lambda x: x.product.weight * x.quantity, items))

    @property
    def total_weight_in_grams(self):
        return self.total_weight() * 1000


#  TODO : lowercase the quantity , weight , amount , customer in client
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product_id = models.CharField(max_length=100, null=False)
    variation_id = models.CharField(null=False, max_length=50)
    amount = models.IntegerField(null=False)  # single item price
    customer = models.ForeignKey(Customer, on_delete=models.DO_NOTHING)

    quantity = models.IntegerField(null=False)
    Order_date = models.DateTimeField(auto_now_add=True, blank=True)

    details = models.TextField(max_length=500, null=True)
    paid = models.BooleanField(default=False)

    Fullfilment_Statuses = (
        ("Unfulfilled", "Unfulfilled"),
        ("PartiallyFulfilled", "PartiallyFulfilled"),
        ("Fulfilled", "Fulfilled"),
    )
    fulfillment_status = models.CharField(
        choices=Fullfilment_Statuses, default="Unfulfilled", max_length=50
    )

    @property
    def total_amount(self):
        return self.amount * self.quantity

    @property
    def product(self):

        if document_exists(lambda: Product.objects.get(id=self.product_id)):
            return Product.objects.get(id=self.product_id)
        else:
            return Product(name="does not exist")

    def __str__(self):
        return str(self.id)
