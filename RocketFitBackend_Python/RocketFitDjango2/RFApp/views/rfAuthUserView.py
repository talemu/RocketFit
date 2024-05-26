from django.http import JsonResponse

from RFApp.mappers.TransformRequestMapper import TransformRequestMapper
from ..serializers import RfauthuserSerializer
from ..services.rfAuthUserService import RfauthUserService
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

class RFAuthUserViewSet(viewsets.ViewSet):
    """
    Class: ViewSet (controller) class dedicated to handling RF Autherized User requests.
    """

    _rfAuthService = RfauthUserService()
    _transformMapper = TransformRequestMapper()


    #GET /auth/
    def list(self, request):
        response_data = self._rfAuthService.get_all_auth_users()
        response = list(map(lambda x : x.asdict(), response_data))
        return JsonResponse(response, safe = False)
    
    def retrieve(self, request, pk=None):
        try:
            response_data = self._rfAuthService.get_user_by_id(pk)
            response = response_data.asdict()
            return JsonResponse(response, safe = False)
        except Exception as e:
            return JsonResponse({'error log' : e.args[0]}, status = status.HTTP_400_BAD_REQUEST, safe = False)
        
    #PUT /auth/changePassword?id=1&password=1
    @action(detail=False, methods=['put'], url_path='changePassword')
    def changePassword(self, request):
        try:
            id = request.GET.get('id', '')
            password = request.GET.get('password', '')
            response_data = self._rfAuthService.change_user_password(id, password)
            return JsonResponse(response_data.asdict(), safe = False)
        except Exception as e:
            return JsonResponse({'error log' : e.args[0]}, status = status.HTTP_400_BAD_REQUEST, safe = False)

    #GET /auth/login?loginKey=1&password=1
    @action(detail=False, methods=['get'], url_path='login')
    def login(self, request):
        try :
            loginKey = request.GET.get('loginKey', '')
            password = request.GET.get('password', '')
            response = self._rfAuthService.get_user_id(loginKey, password)
            return JsonResponse(response, safe=False)
        except Exception as e:
            return JsonResponse({'error log' : e.args[0]}, status = status.HTTP_400_BAD_REQUEST, safe = False)
        
    #GET /auth/checkEmailUsername?email=1&username=1
    #returns json with string response if it is an unused email or username
    @action(detail=False, methods=['get'], url_path='checkEmailUsername')
    def checkEmailUsername(self, request):
        try:
            email = request.GET.get('email', '')
            username = request.GET.get('username', '')
            response = self._rfAuthService.check_email_username_exists(email, username)
            return JsonResponse(response, safe = False)
        except Exception as e:
            return JsonResponse({'error log' : e.args[0]}, status = status.HTTP_400_BAD_REQUEST, safe = False)
    
    #POST /auth/
    def create(self, request):
        try:
            dto = self._transformMapper.to_rfau_dto(request.data)
            us = self._rfAuthService.add_user(dto)
            response = us.asdict()
            return JsonResponse(response, status=status.HTTP_201_CREATED, safe= False)
        except Exception as e:
            return JsonResponse({'error log' : e.args[0]}, status = status.HTTP_400_BAD_REQUEST, safe = False)
