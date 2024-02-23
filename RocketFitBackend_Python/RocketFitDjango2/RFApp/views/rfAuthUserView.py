from django.http import JsonResponse
from ..serializers import RfauthuserSerializer
from ..services.rfAuthUserService import RfauthUserService

class RFAuthUserView():
    def retrieve_all_auth_users(request):
        if request.method == 'GET':
            er = RfauthuserSerializer(RfauthUserService.get_all_exercise_records(), many = True)
            return JsonResponse(er.data, safe = False)