from ast import Str
import base64
from mongoengine.errors import DoesNotExist

from shop.models import Variation
from shop.types import ProductType, VariationType
from django.core.paginator import Paginator
import graphene
from graphene import Int, relay
import json
from graphene_django import DjangoObjectType, DjangoConnectionField
from graphene_django.filter import DjangoFilterConnectionField

from .models import Order, OrderItem
from Users.models import User, Customer, Address
from cart.cart import Cart
from cart.models import PersistentCart
from graphql_jwt.decorators import login_required, superuser_required


from django_filters import FilterSet, OrderingFilter


def object_id_from_global_id(global_id: Str) -> Int:
    global_id_decoded = base64.decodebytes(bytes(global_id, "utf-8")).decode("utf-8")
    return int(global_id_decoded.split(":")[1])


class OrderFilter(FilterSet):
    class Meta:
        model = Order
        fields = {
            "id": ["exact"],
            "customer": ["exact"],
            "paid": ["exact"],
            "payment_method": ["exact"],
            "payment_status": ["exact"],
            "fulfillment_status": ["exact"],
            "created_at": ["exact", "gt", "gte", "lt", "lte", "range", "date"],
            "updated_at": ["exact"],
            # "extra_charges": ["exact"],
        }

    order_by = OrderingFilter(fields=(("updated_at", "created_at"),))


class CountableConnectionBase(relay.Connection):
    class Meta:
        abstract = True

    total_items = graphene.Int()

    def resolve_total_items(self, *args, **kwargs):
        return self.length


class OrderNode(DjangoObjectType):
    class Meta:
        model = Order
        interfaces = (relay.Node,)
        connection_class = CountableConnectionBase

    totalAmount = graphene.Int()

    def resolve_totalAmount(self, info):

        return self.total_amount


class OrderItemType(DjangoObjectType):
    class Meta:
        model = OrderItem

    product = graphene.Field(lambda: ProductType)
    variation = graphene.Field(lambda: VariationType)
    totalAmount = graphene.Int()

    def resolve_totalAmount(self, info):
        return self.total_amount

    def resolve_product(self, info):

        return self.product

    def resolve_variation(self, info):
        try:
            return self.product.get_variation(self.variation_id)
        except DoesNotExist:
            return Variation(price=0)


class Query(graphene.ObjectType):
    # order= graphene.Field(OrderType)
    orders = DjangoFilterConnectionField(OrderNode, filterset_class=OrderFilter)

    order_items = graphene.List(OrderItemType, order_id=graphene.String())

    order = relay.node.Field(
        OrderNode, id=graphene.String(), get_current=graphene.Boolean()
    )

    @login_required
    def resolve_order(self, info, id=None, get_current=None):
        user = info.context.user
        if id is not None:
            id = object_id_from_global_id(id)

        if get_current:
            session = info.context.session
            id = session.get("order_id")
            if not id:
                raise Exception("No current / active  Order Found ")
            return Order.objects.get(id=id)
        if user.is_superuser:
            return Order.objects.get(id=id)
        return Order.objects.get(Customer=user.customer, id=id)

    @login_required
    def resolve_orders(self, info, **kwargs):

        if kwargs.get("id"):

            kwargs["id"] = object_id_from_global_id(kwargs["id"])

        user = info.context.user
        if user.is_superuser:
            orders = OrderFilter(kwargs).qs
            return orders
        elif user.is_customer:
            kwargs["Customer"] = user.customer
            orders = OrderFilter(kwargs).qs
            return orders
        else:
            raise Exception("YOU ARE NOT LOGGED IN")

    @login_required
    def resolve_order_items(self, info, order_id, **kwargs):
        user = info.context.user
        if user.is_customer:
            order_items = OrderItem.objects.filter(
                order__id=order_id, Customer__user=user
            )
            return order_items
        raise Exception("You are not a customer")


class OrderInput(graphene.InputObjectType):
    # user=graphene.String()
    address_id = graphene.String()
    is_primary = graphene.Boolean()


class CreateOrderMutation(graphene.Mutation):
    order = graphene.Field(OrderNode)
    order_items = graphene.List(OrderItemType)

    class Arguments:
        input = OrderInput()

    @login_required
    def mutate(root, info, input):
        #
        user = info.context.user

        if user.is_customer:
            cart = PersistentCart.objects.get(user_id=user.id)
        else:
            raise Exception("You are not a customer")

        if cart.total_items() < 1:
            raise Exception("Cart is Empty")

        customer = Customer.objects.get(user=user)

        # address=Address.objects.get(pk=input.address_id)
        if input.is_primary:
            address = customer.default_address
        else:
            address = customer.Addresses.get(pk=int(input.address_id))
        order = Order(customer=customer, address=address)
        order.save()

        order_items = []

        for item in cart.products():

            if not item.variation.available:
                raise Exception("Product Not Available")

            price = int(item.price)
            product_id = item.product.id
            variation_id = item.variation._id
            order_item = OrderItem(
                order=order,
                product_id=str(product_id),
                amount=price,
                customer=customer,
                quantity=item.quantity,
                variation_id=str(variation_id),
            )

            order_item.save()
            order_items.append(order_item)
            session = info.context.session
            session["order_id"] = order.id
            session.modified = True
        return CreateOrderMutation(order=order, order_items=order_items)


class UpdateOrderMutation(graphene.Mutation):

    order = graphene.Field(OrderNode)

    class Arguments:
        order_id = graphene.String()
        fulfillment_status = graphene.String()

    @superuser_required
    def mutate(self, info, order_id, fulfillment_status, **kwargs):
        id = object_id_from_global_id(order_id)
        order = Order.objects.get(pk=id)
        order.fulfillment_status = fulfillment_status
        order.save()
        return UpdateOrderMutation(order=order)


class Mutation(graphene.ObjectType):
    create_order = CreateOrderMutation.Field()
    update_order = UpdateOrderMutation.Field()
