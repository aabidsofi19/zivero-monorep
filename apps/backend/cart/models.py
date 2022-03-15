from django.db import models

from mongoengine import *

from shop.models import Product, Variation
from .cart import AbstractCart

# Create your models here.


class CartItem(EmbeddedDocument):
    product = ReferenceField(Product)
    variation = EmbeddedDocumentField(Variation)
    quantity = IntField()
    price = IntField()
    # Ptotal_price = IntField()


class FinalMeta(type(Document), type(AbstractCart)):
    pass


class PersistentCart(AbstractCart, Document, metaclass=FinalMeta):
    user_id = IntField(required=True, null=False)
    created_at = DateTimeField()
    updated_at = DateTimeField()
    items = ListField(EmbeddedDocumentField(CartItem))


        

    @classmethod
    def get_or_create(cls, user_id):
        try:
            
            cart = cls.objects.get(user_id=user_id)

            
        except DoesNotExist:
            cart = cls.objects.create(user_id=user_id)
        return cart

    def products(self):

        # TODO : optimize checking for broken variations and products
        valid_items = list(
            filter(lambda item: document_exists(lambda: item.product), self.items)
        )
        valid_products = list(
            filter(
                lambda item: document_exists(
                    lambda: item.product.get_variation(item.variation._id)
                ),
                valid_items,
            )
        )
        self.items = valid_products
        self.save()
        return valid_products

    def add(self, product_id, variation_id, quantity=1, override_quantity=False):
        # checks if item is in cart already

        if quantity <= 0:
            raise ValueError("Cannot add zero or negative quantities!")
        for item in self.items:
            if (
                str(item.product.id) == product_id
                and str(item.variation._id) == variation_id
            ):
                # item.price = item.variation.price
                if override_quantity:
                    item.quantity = quantity
                else:
                    item.quantity += 1
                self.save()
                return

        #  add new item if not in cart already
        product = Product.objects.get(id=product_id)
        variation = product.get_variation(variation_id)
        item = CartItem(
            product=product,
            variation=variation,
            quantity=quantity,
            price=variation.price,
        )
        self.items.append(item)
        self.save()

    def remove(self, product_id, variation_id):

        # filtered = filter(
        #     lambda item: str(item.product.id) != product_id
        #     and str(item.variation._id) != variation_id,
        #     self.items,
        # )

        # self.items = list(filtered)

        # self.save()
        # # self.update(pull__items=
        # # CartItem(product=product, variation=variation))

        product = Product.objects.get(id=product_id)
        variation = product.get_variation(variation_id)
        self.update(pull__items=CartItem(product=product, variation=variation))

    def clear_cart(self):
        self.items = []
        self.save()

    def get_total_price(self):
        total_price = 0
        for item in self.items:
            total_price += item.price * item.quantity
        return total_price

    def total_items(self):

        return sum(item.quantity for item in self.items)

    def add_from_session(self, session_cart):
        cart = session_cart.data()
        for key, value in cart.items():
            # 
            product_id, variation_id = key.split(",")
            self.add(
                product_id,
                variation_id,
                quantity=value["quantity"],
                override_quantity=True,
            )
        self.save()


# def document_exists(func):
#     def wrapper(*args, **kwargs):
#         try:
#             func(*args, **kwargs)
#             return True
#         except DoesNotExist as e:
#             return False

#     return wrapper


def document_exists(callback, onerror=None):
    try:
        callback()
        return True
    except DoesNotExist as e:
        if onerror:
            onerror()
        return False
