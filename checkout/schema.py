import graphene
from graphql_jwt.decorators import login_required
from .checkout import create_checkout_session, create_payment_intent


class CheckoutIdType(graphene.ObjectType):
    checkout_id = graphene.String()


class CheckoutSecretType(graphene.ObjectType):
    checkout_secret = graphene.String()


class Query(graphene.ObjectType):
    checkout_id = graphene.Field(CheckoutIdType)
    checkout_secret = graphene.Field(CheckoutSecretType)

    @login_required
    def resolve_checkout_id(self, info, **kwargs):

        checkout = create_checkout_session(info)
        #
        # checkout_id_= checkout.get('id')
        return CheckoutIdType(checkout_id=checkout)

    @login_required
    def resolve_checkout_secret(self, info, **kwargs):
        session = info.context.session

        order_id = session["order_id"]

        checkout = create_payment_intent(order_id)
        return CheckoutSecretType(checkout_secret=checkout["client_secret"])
