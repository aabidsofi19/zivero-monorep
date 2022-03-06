import graphene
from graphene_mongo import MongoengineObjectType
from .models import Wishlist
from graphql_jwt.decorators import login_required

# Create your views here.


class WishlistType(MongoengineObjectType):
    total_items = graphene.Int()

    class Meta:
        model = Wishlist

    def resolve_total_items(parent, info, **kwargs):
        return parent.total_items()


class WishlistQuery(graphene.ObjectType):

    wishlist = graphene.Field(WishlistType)

    @login_required
    def resolve_wishlist(self, info, **kwargs):
        user = info.context.user
        if user.is_customer:

            wishlist = Wishlist.get_or_create(str(user.id))
            return wishlist
        raise Exception("You are not a customer")


class AddToWishListMutation(graphene.Mutation):
    wishlist = graphene.Field(WishlistType)

    class Arguments:
        product_id = graphene.String(required=True)

    @login_required
    def mutate(self, info, product_id, **kwargs):
        user = info.context.user
        if user.is_customer:

            wishlist = Wishlist.get_or_create(str(user.id))
            wishlist.add(product_id)
            return AddToWishListMutation(wishlist)
        raise Exception("You are not a customer")


class RemoveFromWishListMutation(graphene.Mutation):
    wishlist = graphene.Field(WishlistType)

    class Arguments:
        product_id = graphene.String(required=True)

    @login_required
    def mutate(self, info, product_id, **kwargs):
        user = info.context.user
        if user.is_customer:
            wishlist = Wishlist.get_or_create(str(user.id))
            wishlist.remove(product_id)
            return RemoveFromWishListMutation(wishlist)
        raise Exception("You are not a customer")


class Mutation(graphene.ObjectType):

    add_to_wishlist = AddToWishListMutation.Field()
    remove_from_wishlist = RemoveFromWishListMutation.Field()
