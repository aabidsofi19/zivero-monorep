from django.test import TestCase

from cart.models import PersistentCart
from shop.models import Product

# Create your tests here.

product = Product.objects.first()
variation = product.variations[0]

cart = PersistentCart(user=12)
cart.add(product.id, variation._id)
cart.save()
