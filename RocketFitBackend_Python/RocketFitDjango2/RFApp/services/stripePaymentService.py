#Stripe payment service that works with stripePaymentView.py
from django.conf import settings
from django.core.cache import cache
import stripe
import uuid

class StripePaymentService:

    def __init__(self):
        stripe.api_key = settings.STRIPE_SECRET_KEY

        
    def charge(self, email, username, password, membership, amount):
        try:
            token = str(uuid.uuid4())
            cache.set(token, {'email': email, 'username': username, 'password': password}, timeout=600)
            price_data = {
                'currency': 'usd',
                'product_data': {
                    'name': membership,
                },
                'unit_amount': int(round(amount * 100)),
            }
            session = stripe.checkout.Session.create(
                payment_method_types = ['card'],
                line_items = [{
                    'price_data': price_data,
                    'quantity': 1,
                }],
                mode = 'payment',
                success_url = settings.ROCKETFIT_WEBPAGE + "/success?token=" + token,
                cancel_url = settings.ROCKETFIT_WEBPAGE + "/register",
            )
            return session
        except Exception as e:
            return e.args[0]

    def retrieve_token_info(self, token):
        return cache.get(token)