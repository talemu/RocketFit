from django.http import JsonResponse

from RFApp.mappers.TransformRequestMapper import TransformRequestMapper
from ..serializers import RfauthuserSerializer
from ..services.rfAuthUserService import RfauthUserService
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

class RFAuthUserViewSet(viewsets.ViewSet):

    _rfAuthService = RfauthUserService()

    def list(self, request):
        response_data = self._rfAuthService.get_all_auth_users()
        response = list(map(lambda x : x.asdict(), response_data))
        return JsonResponse(response, safe = False)

    @action(detail=False, methods=['get'], url_path='login')
    def login(self, request):
        loginKey = request.GET.get('loginKey', '')
        password = request.GET.get('password', '')
        response = self._rfAuthService.get_user_id(loginKey, password)
        return JsonResponse(response, safe=False)
    
    def create(self, request):
        try:
            dto = TransformRequestMapper.to_rfau_dto(request.data)
            us = self._rfAuthService.add_user(dto)
            response = us.asdict()
            return JsonResponse(response, status=status.HTTP_201_CREATED, safe= False)
        except Exception as e:
            return JsonResponse({'error log' : e.args[0]}, status = status.HTTP_400_BAD_REQUEST, safe = False)
