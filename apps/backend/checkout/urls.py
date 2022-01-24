from django.urls import path
from .webhooks import StripePaymentIntentWebhook
urlpatterns = [
    path('stripe-payment-intent-webhook/', StripePaymentIntentWebhook.as_view(), name='stripe-webhook'),
]
