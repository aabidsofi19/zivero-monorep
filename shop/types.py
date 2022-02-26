from graphene_mongo import MongoengineObjectType
import graphene
from shop.models import *


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


class ProductsType(graphene.ObjectType):
    products = graphene.List(ProductType)
    total_products = graphene.Int()
    page_no = graphene.Int()
    total_pages = graphene.Int()
