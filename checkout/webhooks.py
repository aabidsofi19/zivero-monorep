from django.views import View
from django.http import JsonResponse, HttpResponse
import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt

from django.utils.decorators import method_decorator
from Orders.models import Order


@method_decorator(csrf_exempt, name="dispatch")
class StripePaymentIntentWebhook(View):
    def post(self, request, *args, **kwargs):

        payload = self.request.body
        sig_header = self.request.META["HTTP_STRIPE_SIGNATURE"]
        event = None
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
            )
        except ValueError as e:
            # Invalid payload

            return HttpResponse(status=400)
        except stripe.error.SignatureVerificationError as e:
            # Invalid signature

            return HttpResponse(status=400)
        except Exception as e:

            return HttpResponse(content=e, status=400)
        # Handle the checkout.session.completed event
        # Handle the event

        if event["type"] == "payment_intent.canceled":
            payment_intent = event["data"]["object"]
        elif event["type"] == "payment_intent.created":
            payment_intent = event["data"]["object"]
        elif event["type"] == "payment_intent.payment_failed":
            payment_intent = event["data"]["object"]
        elif event["type"] == "payment_intent.processing":
            payment_intent = event["data"]["object"]
        elif event["type"] == "payment_intent.requires_action":
            payment_intent = event["data"]["object"]
        elif event["type"] == "payment_intent.succeeded":
            payment_intent = event["data"]["object"]
        # ... handle other event types
        else:

            return HttpResponse(status=400)
        # Display the payment intent status

        #

        # Handle the paymentIntent event
        # currently we are saving the payment status in db

        payment_id = payment_intent["id"]
        order = Order.objects.get(payment_id=payment_id)
        order.payment_status = payment_intent["status"]
        order.save()

        return JsonResponse({"status": "success"})
