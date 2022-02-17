# third party packages
import graphene
from graphene_django.types import DjangoObjectType
from graphql_auth.schema import UserQuery, MeQuery
from graphql_auth import mutations
from graphql_auth.models import UserStatus
from graphql_jwt.decorators import login_required, superuser_required
from graphene_django.filter import DjangoFilterConnectionField
from django_filters import FilterSet
from utils import CountableConnectionBase
from graphene import relay

# app packages
from .models import User, Customer, Address
from cart.decorators import migrate_cart_to_db, migrate_cart_to_session


class UserType(DjangoObjectType):
    class Meta:
        model = User

    verified = graphene.Boolean()

    def resolve_verified(self, *args, **kwargs):
        return self.status.verified


class CustomerType(DjangoObjectType):
    class Meta:
        model = Customer


class AddressType(DjangoObjectType):
    class Meta:
        model = Address


class MeQuery(MeQuery):
    class Meta:
        abstract = True

    me = graphene.Field(UserType)

    @login_required
    def resolve_me(self, info):
        return info.context.user


class CustomerFilter(FilterSet):
    class Meta:
        model = Customer
        fields = {
            "user": ["exact"],
            "user__first_name": ["exact"],
            "user__last_name": ["exact"],
            "user__email": ["exact"],
            "phone_number": ["exact"],
        }


class CustomerNode(DjangoObjectType):
    class Meta:
        model = Customer
        interfaces = (relay.Node,)
        connection_class = CountableConnectionBase

    total_orders = graphene.Int()

    def resolve_total_orders(self, info):
        return self.orders.count()


class Query(UserQuery, MeQuery, graphene.ObjectType):
    # user=graphene.Field(UserType)
    customer = graphene.Field(CustomerType)
    # users=graphene.List(UserType)
    # customers = graphene.List(CustomerType)

    customers = DjangoFilterConnectionField(
        CustomerNode, filterset_class=CustomerFilter
    )
    default_address = graphene.Field(AddressType)
    addresses = graphene.List(AddressType)

    @superuser_required
    def resolve_customers(self, info, **kwargs):

        return CustomerFilter(kwargs).qs

    @login_required
    def resolve_customer(self, info, **kwargs):
        user = info.context.user
        # print(user)
        if user.is_customer:
            customer = Customer.objects.get(user=user)
            # print("customer", customer)
            return customer
        raise Exception("You are not registerd as customer")

    @login_required
    def resolve_default_address(self, info, **kwargs):
        user = info.context.user
        # if user.is_customer:
        customer = Customer.objects.get(user=user)
        # print(customer)
        return customer.default_address

    @login_required
    def resolve_addresses(self, info, **kwargs):
        user = info.context.user
        # print(user)
        customer = Customer.objects.get(user=user)
        return customer.Addresses.all()


class AddressInput(graphene.InputObjectType):
    name = graphene.String()
    pincode = graphene.String()
    state = graphene.String()
    country = graphene.String()
    city = graphene.String()
    town = graphene.String()
    apartment_no = graphene.String()
    is_primary = graphene.Boolean()
    is_work = graphene.Boolean()
    is_home = graphene.Boolean()
    phone_number = graphene.String()


class AddAddressMutation(graphene.Mutation):
    address = graphene.Field(AddressType)

    class Arguments:
        address = AddressInput()

    @login_required
    def mutate(self, info, address):
        user = info.context.user
        is_primary = address.get("is_primary")
        del address["is_primary"]
        # print("address",address)
        # #print(user)
        customer = Customer.objects.get(user=user)
        address = Address(**address)
        address.save()
        # print(address)

        if is_primary:
            customer.default_address = address
        else:
            customer.Addresses.add(address)

        customer.save()
        return AddAddressMutation(address=address)


class ChangeDefaultAddressMutation(graphene.Mutation):
    address = graphene.Field(AddressType)

    class Arguments:
        address_id = graphene.String()

    @login_required
    def mutate(self, info, address_id):
        user = info.context.user
        customer = Customer.objects.get(user=user)
        # remove is _primary from previous default address
        # previous_default = customer.Addresses.filter(is_primary=True)
        # for p in previous_default:
        #     p.is_primary = False
        #     p.update()
        # # add is_primary to new address
        address = customer.Addresses.get(id=address_id)
        customer.default_address = address
        # address.is_primary = True
        address.update()
        customer.update()
        return ChangeDefaultAddressMutation(address=address)


class UpdateAddressMutation(graphene.Mutation):
    address = graphene.Field(AddressType)

    class Arguments:
        address_id = graphene.String()
        update_values = AddressInput()

    @login_required
    def mutate(self, info, address_id, update_values):
        user = info.context.user
        if user.is_authenticated:
            customer = Customer.objects.get(user=user)
            address = customer.Addresses.get(id=address_id)
            address.update_fields(update_values)
            if update_values.is_primary:
                # print("setting as primary")
                customer.default_address = address
                customer.Addresses.remove(int(address_id))
            if (
                update_values.is_primary == False
                and customer.default_address == address
            ):
                customer.default_address.delete()
            address.save()
            customer.save()
            return UpdateAddressMutation(address=address)


class DeleteAddressMutation(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        address_id = graphene.String()

    @login_required
    def mutate(self, info, address_id):
        user = info.context.user
        if user.is_authenticated:
            customer = Customer.objects.get(user=user)
            customer.Addresses.remove(int(address_id))
            if customer.default_address.id == int(address_id):
                customer.default_address.delete()

            # address.delete()
            return DeleteAddressMutation(success=True)


class TokenAuth(mutations.ObtainJSONWebToken):
    @classmethod
    @migrate_cart_to_db
    def resolve_mutation(cls, root, info, **kwargs):
        response = super().resolve_mutation(root, info, **kwargs)
        return response


class RevokeToken(mutations.RevokeToken):
    @classmethod
    @migrate_cart_to_session
    def resolve_mutation(cls, root, info, **kwargs):
        response = super().resolve_mutation(root, info, **kwargs)
        return response


class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()
    verify_account = mutations.VerifyAccount.Field()
    resend_activation_email = mutations.ResendActivationEmail.Field()
    send_password_reset_email = mutations.SendPasswordResetEmail.Field()
    password_reset = mutations.PasswordReset.Field()
    password_set = mutations.PasswordSet.Field()  # For passwordless registration
    password_change = mutations.PasswordChange.Field()
    update_account = mutations.UpdateAccount.Field()
    archive_account = mutations.ArchiveAccount.Field()
    delete_account = mutations.DeleteAccount.Field()
    send_secondary_email_activation = mutations.SendSecondaryEmailActivation.Field()
    verify_secondary_email = mutations.VerifySecondaryEmail.Field()
    swap_emails = mutations.SwapEmails.Field()
    remove_secondary_email = mutations.RemoveSecondaryEmail.Field()

    # django-graphql-jwt inheritances
    # token_auth = mutations.ObtainJSONWebToken.Field()
    token_auth = TokenAuth.Field()
    verify_token = mutations.VerifyToken.Field()
    refresh_token = mutations.RefreshToken.Field()
    revoke_token = RevokeToken.Field()


class Mutation(AuthMutation, graphene.ObjectType):
    add_address = AddAddressMutation.Field()
    change_default_address = ChangeDefaultAddressMutation.Field()
    update_address = UpdateAddressMutation.Field()
    delete_address = DeleteAddressMutation.Field()
