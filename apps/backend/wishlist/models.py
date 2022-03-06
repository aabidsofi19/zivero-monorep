from mongoengine import *
from shop.models import Product

# Create your models here.


class Wishlist(Document):

    user_id = StringField(unique=True)
    products = ListField(ReferenceField(Product, reverse_delete_rule=PULL))

    @classmethod
    def get_or_create(cls, user_id):

        # try :
        #     wishlist= cls.objects.get(user_id=user_id)
        # except DoesNotExist :
        #     wishlist = cls.objects.create(user_id=user_id)
        # return wishlist
        return cls.objects(user_id=user_id).modify(
            upsert=True, new=True, set__user_id=user_id
        )

    def add(self, product_id):
        self.update(add_to_set__products=Product(id=product_id))

    def remove(self, product_id):
        self.update(pull__products=Product(id=product_id))

    def total_items(self):
        return len(self.products)

    def clear_wishlist(self):
        self.products = []
        self.save()
