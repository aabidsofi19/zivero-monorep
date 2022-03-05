from graphene_mongo import MongoengineObjectType
import graphene
from shop.models import *
from mongoengine.errors import DoesNotExist


class BrandType(MongoengineObjectType):
    class Meta:
        model = Brand


class CategoryType(MongoengineObjectType):
    class Meta:
        model = Category


class SubCategoryType(MongoengineObjectType):
    class Meta:
        model = SubCategory


class VariantType(MongoengineObjectType):
    class Meta:
        model = Variant


class VariationType(MongoengineObjectType):
    class Meta:
        model = Variation


class ProductType(MongoengineObjectType):
    available_variants = graphene.JSONString()
    page_no = graphene.Int()

    class Meta:
        model = Product

    def resolve_brand(self, info):
        try:
            brand = self.brand
            return brand
        except DoesNotExist:
            return Brand(name="Doesnt Exist", logo="")

    def resolve_category(self, info):
        try:
            category = self.category
            return category
        except DoesNotExist:
            return Category(name="", image="")


class ProductsType(graphene.ObjectType):
    products = graphene.List(ProductType)
    total_products = graphene.Int()
    page_no = graphene.Int()
    total_pages = graphene.Int()
