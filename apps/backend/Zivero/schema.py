import graphene

import graphql_jwt
#from social.schema import Mutations as SocialMutation
from shop.schema import Query as ShopQuery
from shop.schema import Mutation as ShopMutation
from cart.schema import Query as CartQuery
from cart.schema import Mutation as CartMutation
from Users.schema import Query as UsersQuery
from Users.schema import Mutation as UsersMutation
from Orders.schema import Query as OrdersQuery
from Orders.schema import Mutation as OrdersMutation
from checkout.schema import Query as CheckoutQuery
from filters.schema import FiltersQuery
from filters.schema import Mutation as FiltersMutation
from search.schema import SearchQuery
from wishlist.schema import WishlistQuery 
from wishlist.schema import Mutation as WishlistMutation
from django.contrib.auth.decorators import login_required


class Query(
    ShopQuery, CartQuery, UsersQuery, OrdersQuery, CheckoutQuery, FiltersQuery,SearchQuery,
    WishlistQuery,
    graphene.ObjectType
):
    pass


class Mutation(
    ShopMutation, CartMutation, UsersMutation, OrdersMutation, 
    FiltersMutation,WishlistMutation, graphene.ObjectType
):
   
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
