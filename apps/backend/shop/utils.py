from .models import Product
from bson.objectid import ObjectId
def get_variation(product,id):
    
    for variation in product.variations:
        #
        if variation._id==ObjectId(id):
            return variation



