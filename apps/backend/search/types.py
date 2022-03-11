import graphene
from graphene_mongo import MongoengineObjectType
from shop.models import Variation


class ResultVariationType(graphene.ObjectType):

    price = graphene.Float()
    discount_percent = graphene.Float()
    images = graphene.List(graphene.String)


class AutoCompleteResultType(graphene.ObjectType):

    _id = graphene.String()
    name = graphene.String()
    brand = graphene.String()
    category = graphene.String()
    price = graphene.Float()
    discount_percent = graphene.Float()
    images = graphene.List(graphene.String)

    variations = graphene.Field(ResultVariationType)


class SearchResultType(graphene.ObjectType):
    _id = graphene.String()
    name = graphene.String()
    brand = graphene.String()
    category = graphene.String()
    variations = graphene.List(ResultVariationType)
    price = graphene.Float()
    discount_percent = graphene.Float()
    images = graphene.List(graphene.String)


class SearchResultsType(graphene.ObjectType):
    page = graphene.Int()
    total_results = graphene.Int()
    total_pages = graphene.Int()
    results = graphene.List(SearchResultType)
