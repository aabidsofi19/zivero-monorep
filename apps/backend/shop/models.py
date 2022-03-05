# from typing_extensions import Required
from datetime import datetime
import uuid
from bson.objectid import ObjectId


from mongoengine import *
from mongoengine.document import Document
from mongoengine.fields import ReferenceField, StringField


class Brand(Document):
    name = StringField(required=True)
    logo = URLField()


class Category(Document):
    name = StringField(max_length=100, required=True, unique=True)
    image = StringField(max_length=200, required=True)
    description = StringField(max_length=500)
    gender_choices = (
        ("WOMEN", "female"),
        ("MEN", "men"),
        ("BOYS", "boys"),
        ("GIRLS", "girls"),
        ("KIDS", "kids"),
        ("NEUTRAL", "neutral"),
    )
    genders = ListField(
        StringField(choices=gender_choices)
    )  # genders a category can have
    # will help in updating filters if a category is selected to get the revent gender associated to it
    brands = ListField(ReferenceField(Brand, reverse_delete_rule=NULLIFY))
    # will help in updating filters if a category is selected to get the relevent brands  associated to it


class SubCategory(Document):
    Category = ReferenceField(Category)
    name = StringField()


class Variant(Document):
    name = StringField()
    value = StringField(unique=True)


class Variation(EmbeddedDocument):
    _id = ObjectIdField(required=True, default=lambda: ObjectId())
    variant = ListField(ReferenceField(Variant))
    sku = UUIDField(default=lambda: (uuid.uuid4()))
    quantity = IntField()
    available = BooleanField(default=True)
    price = IntField(required=True)
    discount_percent = IntField(required=False, default=0)
    images = ListField(URLField())
    meta = {"strict": False}


class Product(Document):

    meta = {
        "collection": "products",
        "strict": True,
    }

    created_at = DateTimeField(default=datetime.now)
    name = StringField(max_length=100, required=True)
    brand = ReferenceField(Brand, required=True, reverse_delete_rule=NULLIFY)
    category = ReferenceField(Category, required=True, reverse_delete_rule=NULLIFY)
    # sub_category= ReferenceField(SubCategory)
    description = StringField(required=True, max_length=2000)
    variations = ListField(EmbeddedDocumentField(Variation))
    tags = ListField(StringField(max_length=100))
    images = ListField(URLField(required=True))
    available = BooleanField()
    quantity = IntField(required=True)
    price = IntField(required=True)
    discount_percent = IntField(required=True, default=0)

    status_choices = (
        ("archived", "archived"),
        ("draft", "draft"),
        ("active", "active"),
    )

    status = StringField(choices=status_choices, default="active")

    gender_choices = (
        ("WOMEN", "female"),
        ("MEN", "men"),
        ("BOYS", "boys"),
        ("GIRLS", "girls"),
        ("KIDS", "kids"),
        ("NEUTRAL", "neutral"),
    )
    gender = StringField(choices=gender_choices, required=True)
    # gender here will help with filtering the product from like category tshir but gender BOY

    @property
    def available_variants(self):
        variants = {}
        for variation in self.variations:
            for variant in variation.variant:
                if not variants.get(variant.name):
                    variants[variant.name] = [variant.value]
                else:
                    if not variant.value in variants[variant.name]:
                        variants[variant.name].append(variant.value)
                    continue
        return variants

    def filterby(self, data):  # usually the input from graphene schema i.e FilterInput
        filter = {}

        print(data)

        if data.status:
            filter["status"] = data["status"]

        if data.categories:
            filter["category__in"] = data.categories

        if data.gender:
            filter["gender"] = data.gender

        if data.brands:

            filter["brand__in"] = data.brands

        if data.variant_filters:
            variants = []
            for filter_ in data.variant_filters:
                v_filter = {
                    "name__in": filter_["name"],
                    "value__in": filter_["values"],
                }
                variants_ = [v.id for v in Variant.objects(**v_filter)]
                variants.extend(variants_)

            key = "variations__variant__in"
            filter[key] = variants

        if data.tags:
            filter["tags"] = data.tags

        if data.sort_by:
            return Product.objects(**filter).order_by(data.sort_by)

        return Product.objects(**filter).order_by(data.sort_by)

    def get_variation(self, id):
        print("id", id)
        for variation in self.variations:
            # print("variation",variation._id,id==variation._id)
            if str(variation._id) == str(id):
                return variation
        else:
            raise DoesNotExist("Varaition query doesnt exist")

    @classmethod
    def search_autocomplete(cls, query):
        pipeline = [
            {
                "$search": {
                    "compound": {
                        "should": [
                            {"autocomplete": {"query": query, "path": "name"}},
                            {"autocomplete": {"query": query, "path": "brand.name"}},
                            {"autocomplete": {"query": query, "path": "category.name"}},
                        ]
                    },
                }
            },
            {"$limit": 5},
            {
                "$project": {
                    "id": 1,
                    "name": 1,
                    # "brand.name":1,
                    # "category.name":1,
                    "variations": {
                        "$first": "$variations",
                    },
                }
            },
        ]

        cursor = cls.objects.aggregate(pipeline)
        return cursor

    @classmethod
    def search(cls, query, limit=30, pageNo=1):

        skip = limit * (pageNo - 1)

        pipeline = [
            {
                "$search": {"text": {"query": query, "path": {"wildcard": "*"}}},
            },
            {
                "$facet": {
                    "metadata": [{"$count": "total"}, {"$addFields": {"page": pageNo}}],
                    "results": [
                        {"$skip": skip},
                        {"$limit": limit},
                        {
                            "$project": {
                                "id": 1,
                                "name": 1,
                                "brand": 1,
                                "category.name": 1,
                                "variations": {
                                    "price": 1,
                                    "discount_percent": 1,
                                    "images": 1,
                                },
                            }
                        },
                    ],
                }
            },
        ]

        cursor = cls.objects.aggregate(pipeline)

        return cursor
