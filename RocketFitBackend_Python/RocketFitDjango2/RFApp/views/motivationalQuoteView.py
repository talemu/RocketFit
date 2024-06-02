from ..services.motivationalQuoteService import MotivationalQuoteService
from django.http import JsonResponse
from rest_framework import status, viewsets
from rest_framework.decorators import action


class MotivationalQuoteViewSet(viewsets.ViewSet):

    _mqService = MotivationalQuoteService()

    def list(self, request):
        try:
            quotes = self._mqService.get_all_motivational_quotes()
            response = list(map(lambda x: x.asdict(), quotes))
            return JsonResponse(response, safe=False)
        except Exception as e:
            return JsonResponse({'error log' : e.args[0]}, status = status.HTTP_400_BAD_REQUEST, safe = False)
        
    @action(detail=False, methods=['get'], url_path='item')
    def get_random_item(self, request):
        try:
            quote = self._mqService.get_random_motivational_quote()
            response = quote.asdict()
            return JsonResponse(response, safe=False)
        except Exception as e:
            return JsonResponse({'error log' : e.args[0]}, status = status.HTTP_400_BAD_REQUEST, safe = False)