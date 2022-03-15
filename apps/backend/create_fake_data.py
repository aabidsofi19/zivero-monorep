# import dataclasses
from typing import List
from shop.models import *
import random
import json
from mongoengine import *
from dataclasses import dataclass
import faker
from quotes_unsplash import get_img_url as get_images

# connect('products',host='mongodb://localhost:27017')
# connect('products',host='mongodb://25.19.8.34:27017')
connect(
    "zivero",
    host="mongodb+srv://test-user:M7AbnQx3MQLZErZ@cluster0.n9vpu.mongodb.net/zivero?retryWrites=true&w=majority",
)
# db=connect('zivero',host='mongodb://localhost:27017')
# db.drop_database('zivero')


@dataclass
class CategoryData:
    name: str
    image: str
    genders: List[str]
    brands: List[Brand]


@dataclass
class VariantData:
    name: str
    value: str


@dataclass
class VariationData:
    variants: List[VariantData]
    price: int
    images: List[str]
    discount: int


@dataclass
class ProductData:
    """data to create a product"""

    name: str
    brand: str
    category: str
    variations: List[VariationData]
    description: str
    gender: str

    """
      [
          {
              "size":"xl"
              "color":"red"
          
          }
      ]
    """


def create_product_with_all_variations(data: ProductData):
    category = Category.objects.get(id=data.category)
    product = Product(
        name=data.name,
        brand=data.brand,
        description=data.description,
        category=category,
        gender=data.gender,
    )
    variations = []
    for v in data.variations:
        variation = Variation(
            price=v.price, images=v.images, discount_percent=v.discount
        )
        variants = []
        for variant in v.variants:
            v = Variant.objects.get(name=variant.name, value=variant.value)
            variants.append(v)
        variation.variant = variants
        variations.append(variation)
    product.variations = variations
    product.save()


# blue_tshirt_xl =VariationData(
#         variants=[
#             VariantData(name="size",value="xl"),
#             VariantData(name="color" ,value="red")
#         ],
#         price=222,
#         images=["https://jsdj.com/png"]

#     )


# tshirt_variations=[
#     blue_tshirt_xl
# ]

# tshirt = ProductData(
#     name="new tshirt",
#     category=Category.objects.get(name="tshirt").id,
#     variations=tshirt_variations,
#     brand="adidas",
#     description="best in class",
# )

# create_product_with_all_variations(tshirt)

fake = faker.Faker()


def create_variants(name, values):

    for v in values:
        try:
            Variant(name=name, value=v).save()
        except Exception as e:
            


def create_categories(categories: List[Category]):
    for c in categories:
        try:
            Category(
                name=c.name, image=c.image, genders=c.genders, brands=c.brands
            ).save()
        except Exception as e:
            


def create(category, name, gender):
    colors = ["red", "blue"]
    sizes = ["xs", "s", "m", "l", "xl"]
    brands = ["nike", "adidas", "puma", "jordan"]
    images = get_images(query=category + "-" + gender, per_page=20)
    # create_variants("color",colors)
    # create_variants("size",sizes)
    for image in images:
        variations = []
        for c in colors:
            c_variant = VariantData(name="color", value=c)
            for s in sizes:
                s_variant = VariantData(name="size", value=s)
                variation = VariationData(
                    price=random.randint(100, 5000),
                    images=[image["urls"]["small"]],
                    variants=[c_variant, s_variant],
                )
                variations.append(variation)
        brand = random.choice(brands)
        
        tshirt = ProductData(
            name=name,
            gender=gender,
            brand=Brand.objects.get(name=brand).id,
            category=Category.objects.get(name=category).id,
            variations=variations,
            description="best in class",
        )
        create_product_with_all_variations(tshirt)
        


colors = ["red", "blue", "pink", "tan", "brown"]
sizes = ["xs", "s", "m", "l", "xl"]
brands = ["nike", "adidas", "puma", "jordan"]
kurta_brands = ["raymond", "elegance-kurtas", "gleamer-kurtas"]
all_categories = ["Tshirt", "Kurtas", "Pyjamas", "SWEATER"]
# genders_to_categories={"BOYS":boys_categories,'GIRLS':girls_cat ,'KIDS':kids_cat ,'MEN':men_cat,'WOMEN':,"NEUTRAL"}
genders = ["MEN", "BOYS", "WOMEN", "GIRLS", "KIDS"]


# boys_tshirt = CategoryData(name="tshirt",gender="BOYS",image="http://hdfh.com")
# girls_tshirt = CategoryData(name="tshirt",gender="GIRLS",image="http://hdfh.com")


# create_variants("size",sizes)
# create_variants("color",colors)


def init_categories(categories, genders, brands):
    data = []
    brands = Brand.objects(name__in=brands)
    for c in categories:
        data.append(CategoryData(name=c, image=" ", genders=genders, brands=brands))
    create_categories(data)


def create_brands(brands):
    for brand in brands:
        Brand(name=brand).save()


toddler_brands = ["pampers", "poco", "nick"]
# create_brands(["Nk-Kurtas"])
# create_brands(toddler_brands)
# init_categories(['tshirt','kurtas'],["MEN","BOYS",'WOMEN','GIRLS'],brands)
# init_categories(['trimmer','nehru-dress'],["MEN","BOYS"],brands)
# init_categories(['todllerwear','bottle'],["KIDS"],toddler_brands)
# create("Pants","denim","boys")

kurta_images = [
    "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/16199238/2021/11/22/c9f9d1a9-e46d-4653-9d80-6e9632ad66df1637572572660EnchantedDrapesMenMaroonThreadWorkHandloomKurta1.jpg",
    "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/16199238/2021/11/22/deb66973-01c6-48fd-b190-051879daad1d1637572572784EnchantedDrapesMenMaroonThreadWorkHandloomKurta3.jpg",
    "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/16199238/2021/11/22/9422c783-32af-408c-91a1-fe97720cb27b1637572572516EnchantedDrapesMenMaroonThreadWorkHandloomKurta4.jpg",
]


# create('kurtas',"Men Maroon Woven Design Kurta","MEN",kurta_images)

# try:
#     create_brands(kurta_brands)
# except:
#     pass


def create_product(category, name, gender, images, brand, discount, price):
    if not price:
        price = (random.randint(100, 5000),)

    if not discount:
        discount = random.randint(10, 50)
    colors = ["red", "blue"]
    sizes = ["xs", "s", "m", "l", "xl"]

    variations = []
    for c in colors:
        c_variant = VariantData(name="color", value=c)
        for s in sizes:
            s_variant = VariantData(name="size", value=s)
            variation = VariationData(
                price=price,
                images=images,
                variants=[c_variant, s_variant],
                discount=discount,
            )
            variations.append(variation)
    brand = brand
    
    tshirt = ProductData(
        name=name,
        gender=gender,
        brand=Brand.objects.get(name=brand).id,
        category=Category.objects.get(name=category).id,
        variations=variations,
        description="best in class",
    )
    create_product_with_all_variations(tshirt)
    


for i in range(2000):
    price = random.randint(100, 5000)
    discount = random.randint(10, 30)
    create_product(
        "kurtas",
        "Men Maroon Woven Design Kurta",
        "MEN",
        kurta_images,
        random.choice(kurta_brands),
        discount,
        price,
    )
create_product(
    "tshirt", "New tshirt", "MEN", kurta_images, random.choice(brands), 10, 20000
)
