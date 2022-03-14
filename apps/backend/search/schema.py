from curses import meta
import graphene
from shop.types import ProductType, VariationType, BrandType
from shop.models import Product, Variation
import mongoengine as db
from .types import AutoCompleteResultType, SearchResultsType
from pprint import pprint


class SearchQuery(graphene.ObjectType):

    product_autocomplete_results = graphene.List(
        AutoCompleteResultType, search=graphene.String()
    )
    product_search_results = graphene.Field(
        SearchResultsType, search=graphene.String(), page_no=graphene.Int()
    )

    def resolve_product_autocomplete_results(self, info, search, **kwargs):
        user = info.context.user
        cursor = Product.search_autocomplete(search)

        if not user.is_superuser:
            return filter(lambda product: product["status"] == "active", cursor)

        return list(cursor)

    def resolve_product_search_results(self, info, search, page_no=1, **kwargs):
        user = info.context.user
        limit = 30
        cursor = Product.search(search, limit=limit, pageNo=page_no)
        response = list(cursor)

        try:
            metadata = response[0]["metadata"][0]
        except KeyError:
            metadata = {"total": 0, "page": 0}

        results = response[0].get("results")

        total_results = metadata["total"]
        total_pages = total_results // limit

        if not user.is_superuser:
            print(list(results))
            results = filter(lambda product: product["status"] == "active", results)

        return SearchResultsType(
            page=page_no,
            total_results=total_results,
            total_pages=total_pages,
            results=results,
        )

        # if len(results[0]['results'])  < 1 :
        #   search_response={
        #     "total_results":0,
        #     "total_pages":0,
        #     "page":0,
        #     "results":results["results"]
        #   }
        #   return search_response

        # search_response={
        #     "total_results":total_results,
        #     "total_pages":total_pages,
        #     "page":results["metadata"][0]["page"],
        #     "results":results["results"]
        # }

        # return search_response
