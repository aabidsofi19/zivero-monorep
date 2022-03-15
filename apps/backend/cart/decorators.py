from functools import wraps
from .cart import Cart
from .models import PersistentCart
from graphql_jwt.shortcuts import get_user_by_token


def migrate_cart_to_db(func):
    @wraps(func)
    def wrapper(cls, root, info, **kwargs):
        #
        #
        session_cart = Cart(info.context)
        res = func(cls, root, info, **kwargs)

        if session_cart.total_items() <= 0:
            return res

        user = info.context.user
        if user.is_authenticated and user.is_customer:
            cart = PersistentCart.get_or_create(info.context.user.id)
            cart.add_from_session(session_cart)
        return res

    return wrapper


def get_user(request):

    auth = request.META.get("HTTP_AUTHORIZATION")
    if auth:
        prefix, token = auth.split(" ")
        if prefix == "JWT":
            user = get_user_by_token(token)
            return user
    return None


def migrate_cart_to_session(func):
    @wraps(func)
    def wrapper(cls, root, info, **kwargs):

        user = get_user(info.context)

        db_cart = None
        if user.is_authenticated and user.is_customer:
            db_cart = PersistentCart.objects.get(user_id=user.id)

        res = func(cls, root, info, **kwargs)

        if db_cart:
            if db_cart.total_items() <= 0:
                return res

            cart = Cart(info.context)
            cart.add_from_db(db_cart)

        return res

    return wrapper
