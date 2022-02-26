#from quotes_unsplash import get_img_url
from shop.models import *
import random
import json 
from mongoengine import *
import  
# connect('products',host='mongodb://localhost:27017')
# connect('products',host='mongodb://25.19.8.34:27017')
connect('zivero', host='mongodb+srv://test-user:M7AbnQx3MQLZErZ@cluster0.n9vpu.mongodb.net/zivero?retryWrites=true&w=majority')

blue_img_url = "https://cdn.shopify.com/s/files/1/0161/0482/products/ayegear_tshirt_5_pockets_multipocket_travel_scottevest_navy_2048x.jpg?v=1538484272"

red_img_url = "https://cdn.shopify.com/s/files/1/0161/0482/products/ayegear_tshirt_5_pockets_multipocket_travel_scottevest_red_2048x.jpg?v=1538484195"

# colors = ['red', 'blue']
# sizes = ['xs', 's', 'm', 'l', 'xl']

# boys_categorry=Category(name='tshirt',gender='BOYS').save()
boys_categorry = Category(name='kurtas',gender='GIRLS',image="https://cdn.shopify.com/s/files/1/0266/6276/4597/products/100001_300875000_025_2_1024x1024.jpg?v=1637961683").save()
# # create two  variants viz  color : red color: blue and sizes l , xl , m

# for color in colors:
#     Variant(name='color',value=color).save()

# for size in sizes :
#     Variant(name='size',value=size).save()


# create  tshirts on bases of  color and all sizes

def create_tsirt(colors_and_imgs,name):
    # colors_and_imgs :- a dict mapping color to its img { "red" : "//dummy url" , "blue" : '//dummy url}
    tshirt = Product(
        name='kurta'+name,
        brand='nike',
        description='pure cotton stylish tshirt for summer',
        category=boys_categorry,
    )
    tshirt_variations = []
    for item in colors_and_imgs.items():
        color, img = item
        color = Variant.objects(name='color', value=color).first()
        for size in Variant.objects(name='size'):
            variation = Variation(
                variant=[color, size],
                images=[img],
                available=True,
                quantity=100,
                price=280,
                discount_percent=10
            )
            tshirt_variations.append(variation)
    tshirt.variations = tshirt_variations
    tshirt.save()
    
# for i in range(100):
#     #print(i)
#     create_tsirt(colors_and_imgs={'red':red_img_url,'blue':blue_img_url},name=str(i))


def create_product(name, brand, category, colors_and_imgs, other_variants):
    # other variants a dict mapping variant to value { "size" :"Xl"}
    # colors_and_imgs :- a dict mapping color to its img { "red" : "//dummy url" , "blue" : '//dummy url}
    category = Category.objects.get(name=category)
    product = Product(
        name=name,
        brand=brand,
        description='pure cotton stylish tshirt for summer',
        category=category,
    )
    product_variations = []
    for item in colors_and_imgs.items():
        color, img = item
        color = Variant.objects(name='color', value=color).first()
        #print("color", color)
        for variant, value in other_variants.items():
            variant = Variant.objects(name=variant, value=value).first()
            #print("variant", variant)
            variation = Variation(
                variant=[color, variant],
                images=[img],
                available=True,
                quantity=100,
                price=200,
                discount_percent=10
            )
            product_variations.append(variation)

        # for size in Variant.objects(name='size'):
        #     variation=Variation(
        #         variant=[color,size],
        #         images=[img],
        #         available=True,
        #         quantity=100,
        #         price=280,
        #         discount_percent=10
        #     )
        #     tshirt_variations.append(variation)
    product.variations = product_variations
    product.save()
    return product



create_tsirt(colors_and_imgs={'red':red_img_url,'blue':blue_img_url})

"""
with open('imgs.json','r') as f:
    imgs=json.load(f)
    #print('+++loaded {}imgs'.format(len(imgs)))


def create_variant():
    names={'size':['xl','l','m','xxl'],

            'color':['red' ,'yellow','green']
            }
    for i in names.items():
        Variant(name=i[0],values=i[1]).save()

    return Variant.objects()

def create_variation(img):
    va=[]
    for i in Variant.objects().distinct('name'):

        v=Variation()
        v.available=True
        v.price=random.randint(250,300)
        v.images=[img]
        v.variant=Variant.objects(name=i)
        va.append(v)
        #print('+++created a variation+++')
    return va
def create_product():
    names=['tshirt','round-neck','cott-tshirt']
    brands=['nike','puma','addidas','hrx']
    category=Category.objects(name='tshirt')
    #print(category)
    for img in imgs:
        p=Product()
        p.name=names[random.randint(0,2)]
        p.brand=brands[random.randint(0,2)]
        p.category=category

        v=create_variation(img)
        p.Variations=v
        p.save()
        #print('\n')
        #print('created a product')
       # #print(p.to_json())
"""
