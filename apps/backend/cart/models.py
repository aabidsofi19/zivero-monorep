from xml.dom.minidom import DocumentFragment
from django.db import models
from itsdangerous import exc
from mongoengine import *
from numpy import product
from shop.models import Product,Variation
from .cart import AbstractCart
# Create your models here.

class CartItem(EmbeddedDocument):
    product = ReferenceField(Product)
    variation= EmbeddedDocumentField(Variation)
    quantity= IntField()
    price = IntField()
    # Ptotal_price = IntField()

class FinalMeta(type(Document), type(AbstractCart)):
    pass

class PersistentCart(AbstractCart,Document,metaclass=FinalMeta):
    user_id =  IntField(required=True,null=False)
    created_at= DateTimeField()
    updated_at = DateTimeField()
    items=ListField(EmbeddedDocumentField(CartItem))
    
    @classmethod
    def get_or_create(cls, user_id):
        try :
            cart = cls.objects.get(user_id=user_id)
        except DoesNotExist :
            cart  = cls.objects.create(user_id=user_id)
        return cart

    def products(self):
        return self.items

    def add(self, product_id,variation_id,quantity=1, override_quantity=False):
        #checks if item is in cart already
        
        if quantity <= 0:
            raise ValueError('Cannot add zero or negative quantities!')
        for item in self.items:
            if str(item.product.id) == product_id and str(item.variation._id)  == variation_id:
                # item.price = item.variation.price
                if override_quantity:
                    item.quantity = quantity
                else:
                    item.quantity += 1
                self.save()
                return
        
        #  add new item if not in cart already
        product= Product.objects.get(id=product_id)
        variation=product.get_variation(variation_id)
        item = CartItem(product=product,variation=variation,quantity=quantity,price=variation.price)
        self.items.append(item)
        self.save()

    def remove(self, product_id,variation_id):
        product = Product.objects.get(id=product_id)
        variation = product.get_variation(variation_id)
        self.update(pull__items= CartItem(product=product,variation=variation))

    def clear_cart(self):
        self.items = []
        self.save()

    def get_total_price(self):
        total_price=0
        for item in self.items :
            total_price += (item.price * item.quantity)
        return total_price

    def total_items(self):
       
        return sum(item.quantity for item in self.items)

    
    def add_from_session(self, session_cart):
        cart = session_cart.data()
        for key,value in cart.items():
            # print(key,value)
            product_id,variation_id=key.split(',')
            self.add(product_id,variation_id,quantity=value["quantity"],override_quantity=True)
        self.save()
  

                    


