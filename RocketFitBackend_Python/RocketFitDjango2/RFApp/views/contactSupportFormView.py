from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import action


from ..services.contactSupportService import ContactSupportService

class CustomerSupportFormViewSet(viewsets.ViewSet):

    _csService = ContactSupportService()

    @csrf_exempt
    @action(detail=False, methods=['post'], url_path='sendemail')
    def send_email(self, request):
        try:
            email = request.data.get('email', '')
            subject = request.data.get('subject', '')
            description = request.data.get('description', '')
            service_return = self._csService.sendEmail(email, subject, description)
            return JsonResponse({'message': service_return}, status = status.HTTP_201_CREATED, safe = False)
        except Exception as e:
            return JsonResponse({'error log' : e.args[0]}, status = status.HTTP_400_BAD_REQUEST, safe = False)
        