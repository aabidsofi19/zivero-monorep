# import json
# import os

import graphene
import requests
from graphene_django.types import DjangoObjectType, ObjectType
from graphene_mongo import MongoengineObjectType
from graphql_jwt.decorators import login_required
from shop.models import Category, Product, Variation
from shop.types import CategoryType, ProductType, VariationType
from shop.utils import get_variation

from .cart import Cart
from .models import PersistentCart

# class CartProductType(graphene.ObjectType):
#     product=graphene.Field(ProductType)
#     price=graphene.Int()
#     variation=graphene.Field(VariationType)
#     quantity=graphene.Int()
#     total_price=graphene.Int()


#     def resolve_total_price(parent):

#         # print("self",self,info)
#         return parent["quantity"] * parent["price"]


# class CartType(graphene.ObjectType):
#     cartLength=graphene.Int()
#     totalPrice=graphene.Int()
#     products=graphene.List(CartProductType)


class CartProductType(graphene.ObjectType):
    product = graphene.Field(ProductType)
    price = graphene.Int()
    variation = graphene.Field(VariationType)
    quantity = graphene.Int()
    total_price = graphene.Int()

    def resolve_total_price(parent, info, **kwargs):

        return parent["quantity"] * parent["price"]


class CartType(graphene.ObjectType):
    cartLength = graphene.Int()
    totalPrice = graphene.Int()
    products = graphene.List(CartProductType)


class Query(graphene.ObjectType):
    cart = graphene.Field(CartType)

    # @login_required
    def resolve_cart(self, info, **kwargs):
        user = info.context.user
        # print("session",info.context.session.id)
        if user.is_authenticated and user.is_customer:
            cart_ = PersistentCart.get_or_create(user.id)
            # print("cart",cart_.to_json())
        else:
            cart_ = Cart(request=info.context)

        length = cart_.total_items()
        total_price = cart_.get_total_price()
        cart_products = cart_.products()
        print(cart_products)
        return CartType(
            cartLength=length, totalPrice=total_price, products=cart_products
        )


class AddToCartInput(graphene.InputObjectType):
    product_id = graphene.String()
    quantity = graphene.Int()
    variation_id = graphene.String()
    # price=graphene.Int()


class UpdateCartInput(graphene.InputObjectType):
    product_id = graphene.String()
    variation_id = graphene.String()
    quantity = graphene.Int()
    price = graphene.Int()


class AddToCartMutation(graphene.Mutation):
    cart = graphene.Field(CartType)

    class Arguments:
        productdetails = AddToCartInput()

    # @login_required
    def mutate(root, info, productdetails):

        user = info.context.user
        print("adding to cart", productdetails)
        pd = productdetails
        if user.is_authenticated and user.is_customer:
            cart = PersistentCart.get_or_create(user.id)
        else:
            cart = Cart(info.context)

        cart.add(
            product_id=pd.product_id,
            quantity=pd.quantity,
            override_quantity=False,
            variation_id=pd.variation_id,
        )
        cart.save()
        # print(cart.products())
        cart = Query().resolve_cart(info)
        print(cart)
        return AddToCartMutation(cart=cart)
        # CartType(cartLength=len(cart),totalPrice=cart.get_total_price()))


class ClearCartMutation(graphene.Mutation):
    removed = graphene.Boolean()

    def mutate(root, info, **kwargs):
        user = info.context.user
        if user.is_authenticated and user.is_customer:
            cart = PersistentCart.get_or_create(user.id)
        else:
            cart = Cart(info.context)

        cart.clear_cart()
        return ClearCartMutation(removed=True)


class UpdateCartMutation(graphene.Mutation):

    cart = graphene.Field(CartType)

    class Arguments:
        Input = UpdateCartInput()

    def mutate(root, info, Input):
        print(Input)
        user = info.context.user
        if user.is_authenticated and user.is_customer:
            cart = PersistentCart.get_or_create(user.id)
        else:
            cart = Cart(info.context)
        if Input.quantity <= 0:
            cart.remove(product_id=Input.product_id, variation_id=Input.variation_id)
        else:
            cart.add(
                product_id=Input.product_id,
                override_quantity=True,
                quantity=Input.quantity,
                variation_id=Input.variation_id,
            )
        cart = Query().resolve_cart(info)
        return UpdateCartMutation(cart=cart)


class Mutation(graphene.ObjectType):
    AddToCart = AddToCartMutation.Field()
    ClearCart = ClearCartMutation.Field()
    UpdateCart = UpdateCartMutation.Field()
