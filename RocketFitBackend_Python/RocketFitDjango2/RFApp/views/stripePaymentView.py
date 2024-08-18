import json
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import action
from RFApp.services.stripePaymentService import StripePaymentService

class StriptePaymentViewSet(viewsets.ViewSet):
    
        _stripeService = StripePaymentService()

        @action(detail=False, methods=['post'], url_path='getTokenInfo')
        def getTokenInfo(self, request):
            try:
                #Decode request body and parse as json
                body_unicode = request.body.decode('utf-8')
                body_data = json.loads(body_unicode)

                #Get token from request body
                token = body_data.get('token', '')
                print(token)
                token_info = self._stripeService.retrieve_token_info(token)
                return JsonResponse({"data" : token_info}, status = status.HTTP_200_OK, safe = False)
            except Exception as e:
                return JsonResponse({'error log' : e.args[0]}, status = status.HTTP_400_BAD_REQUEST, safe = False)
    
        @csrf_exempt
        def create(self, request):
            try:
                membership = request.data.get('membership', '')
                amount = request.data.get('amount', '')
                email = request.data.get('email', '')
                username = request.data.get('username', '')
                password = request.data.get('password', '')
                service_return = self._stripeService.charge(email, username, password, membership, amount)
                return JsonResponse({'message': service_return}, status = status.HTTP_201_CREATED, safe = False)
            except Exception as e:
                return JsonResponse({'error log' : e.args[0]}, status = status.HTTP_400_BAD_REQUEST, safe = False)
        