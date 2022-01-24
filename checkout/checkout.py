import stripe
from django.conf import settings
from Orders.models import Order,OrderItem

def create_checkout_session(request):
    if request:
        domain_url = 'http://localhost:8000/'
        stripe.api_key = settings.STRIPE_SECRET_KEY
        try:
        
            checkout_session = stripe.checkout.Session.create(
                success_url=domain_url + 'success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url=domain_url + 'cancelled/',
                payment_method_types=['card'],
                mode='payment',
                line_items=[
                    {
                        'name': 'T-shirt',
                        'quantity': 1,
                        'currency': 'usd',
                        'amount': '2000',
                    }
                ]
            )
            return checkout_session['id']
        except Exception as e:
            return  str(e)

def create_payment_intent(order_id):
    stripe.api_key=settings.STRIPE_SECRET_KEY
    print(stripe.api_key)
    order=Order.objects.get(id=order_id)
    #print("order_id",order_id)
    total_price=order.total_amount() *100
    print("total_price in paisa",total_price)
    intent=stripe.PaymentIntent.create(
        amount=total_price,
        currency='inr',
        # payment_method_types=['card'],
        automatic_payment_methods = {"enabled": True},
        )
    order.payment_id=intent['id']
    order.save()
    #print("intent",intent)
    return intent
