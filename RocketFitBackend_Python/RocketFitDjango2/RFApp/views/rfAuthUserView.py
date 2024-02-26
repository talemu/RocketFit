from django.http import JsonResponse
from ..serializers import RfauthuserSerializer
from ..services.rfAuthUserService import RfauthUserService
from rest_framework import viewsets
from rest_framework.decorators import action

class RFAuthUserViewSet(viewsets.ViewSet):

    queryset = RfauthUserService.get_all_auth_users()

    @action(detail=False, methods=['get'], url_path='users')
    def retrieve_users(self, request):
        er = RfauthuserSerializer(self.queryset, many = True)
        return JsonResponse(er.data, safe = False)

    @action(detail=False, methods=['get'], url_path='login')
    def login(self, request):
            loginKey = request.GET.get('loginKey', '')
            password = request.GET.get('password', '')
            er = RfauthUserService.get_user(loginKey, password)
            return JsonResponse(er, safe=False)
