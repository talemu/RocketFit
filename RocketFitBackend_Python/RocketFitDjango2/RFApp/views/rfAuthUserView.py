from django.http import JsonResponse
from ..serializers import RfauthuserSerializer
from ..services.rfAuthUserService import RfauthUserService

class RFAuthUserView():
    def retrieve_all_auth_users(request):
        if request.method == 'GET':
            er = RfauthuserSerializer(RfauthUserService.get_all_auth_users(), many = True)
            return JsonResponse(er.data, safe = False)

    def authenticate_potential_rf_user(request):
        if request.method == 'GET':
            loginKey = request.GET.get('loginKey', '')
            password = request.GET.get('password', '')
            er = RfauthUserService.get_user(loginKey, password)
            return JsonResponse(er, safe=False)
