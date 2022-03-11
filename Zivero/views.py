from django.views.decorators.csrf import csrf_exempt
import stripe
from django.conf import settings
from django.http import JsonResponse

# from social_django.utils import psa
@csrf_exempt
def create_checkout_session(request):
    if request.method == "GET":
        # print(request)
        domain_url = "http://localhost:8000/"
        stripe.api_key = settings.STRIPE_SECRET_KEY
        try:
            # Create new Checkout Session for the order
            # Other optional params include:
            # [billing_address_collection] - to display billing address details on the page
            # [customer] - if you have an existing Stripe Customer ID
            # [payment_intent_data] - capture the payment later
            # [customer_email] - prefill the email input in the form
            # For full details see https://stripe.com/docs/api/checkout/sessions/create

            # ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
            checkout_session = stripe.checkout.Session.create(
                success_url=domain_url + "success?session_id={CHECKOUT_SESSION_ID}",
                cancel_url=domain_url + "cancelled/",
                payment_method_types=["card"],
                mode="payment",
                line_items=[
                    {
                        "name": "T-shirt",
                        "quantity": 1,
                        "currency": "usd",
                        "amount": "2000",
                    }
                ],
            )
            return JsonResponse({"sessionId": checkout_session["id"]})
        except Exception as e:
            return JsonResponse({"error": str(e)})


##@
##csrf_exempt
# @psa('social:complete')
# def register(request,backend):
#    # This view expects an access_token GET parameter, if it's needed,
#    # request.backend and request.strategy will be loaded with the current
#    # backend and strategy.
#    #print(request)
#    #print(backend)
#    token = request.GET.get('access_token')
#    user = request.backend.do_auth(token)
#    #print(user)
#    if user:
#       # login(request, user)
#        return JsonResponse({'hi':'hi'})
#    else:
#        return JsonResponse({'error':'error'})
