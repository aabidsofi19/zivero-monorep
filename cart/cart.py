from decimal import Decimal
from telnetlib import DO
import uuid                     
from bson.objectid import ObjectId
from django.conf import settings
from pathlib import Path
from mongoengine import DoesNotExist
from shop.models import Product
from abc import ABC,abstractmethod
from typing import List,Dict
BASE_DIR = Path(__file__).resolve().parent.parent


class AbstractCart(ABC):
    
    @abstractmethod
    def add(self, product_id,variation_id,quantity=1, override_quantity=False):
        pass
    
    @abstractmethod
    def clear_cart(self):
        pass
    
    @abstractmethod
    def  total_items(self):
        pass
 
    @abstractmethod
    def products(self) -> List[Dict]:
        """ returns all the items in the cart """
        pass

    @abstractmethod
    def remove(self, product_id,variation_id):
        pass

    @abstractmethod
    def get_total_price(self):
        pass

    # @abstractmethod
    # def save(self):
    #     pass


class Cart(AbstractCart):
    def __init__(self, request):
        """Initialize the cart."""
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)
        if not cart:
            # save an empty cart in the session
            cart = self.session[settings.CART_SESSION_ID] = {}
        self.cart = cart
     
    def products(self):
        """
        Iterate over the items in the cart and get the products
        from the database.
        """
        products=[]
        for key,item  in self.cart.items():
            cart_obj= {}
            cart_obj["quantity"]=item["quantity"]
            keys=key.split(",")
            product_id=keys[0]

            try :
                product = Product.objects.get(id=product_id)
            except DoesNotExist :
                self.remove(key)
                
            variation = None 
            for v in product.variations :               
                if str(v._id) == keys[1]:
                    variation =v
                    break
            cart_obj['product']=product
            cart_obj['variation']=variation 
            cart_obj['price']=int(item['price']) 
            # cart_obj['totalPrice']=int(item['price'])* item['quantity']
            products.append(cart_obj)
        return products
       
    def total_items(self):
        return sum(item['quantity'] for item in self.cart.values())
    
    def data(self):
        return self.cart

    def get_total_price(self):
        #print(self.cart)
        return sum( 
            int(item['price']) * int(item['quantity']) for item 
            in self.cart.values()
        )

    def clear_cart(self):
        del self.session[settings.CART_SESSION_ID]
        self.save()
    

    def add(self, product_id,variation_id,quantity=1, override_quantity=False,):
       
        """
        Add a product to the cart or update its quantity.
        """
    
        if quantity <= 0:
            raise ValueError('Cannot add zero or negative quantities!')
 
        product_id = (product_id)
        product=Product.objects(id=product_id,)
        
        for v in product[0].variations:
            
            if str(v._id)==str(variation_id):
                #print('hi')
                variation = v
        price=variation.price

        key =f"{product_id},{variation_id}" 

        if key not in self.cart:
            self.cart[key] = {'quantity': 0,'price': str(price)}
        if override_quantity:
            self.cart[key]['price']=str(price)
            self.cart[key]['quantity'] = quantity
        else:
            self.cart[key]['price']=str(price)
            self.cart[key]['quantity'] += quantity
        self.save()
      
    def save(self):
         # mark the session as "modified" to make sure it gets saved
        self.session.modified = True

    def remove(self, product_id,variation_id):
      
        key =f"{product_id},{variation_id}"
      
        if key in self.cart:
            del self.cart[key]
            self.save()

    def add_from_db(self,db_cart):
        items = db_cart.products()
        for item in items :
            self.add(str(item.product.id),str(item.variation._id),item.quantity,override_quantity=True)
        self.save()