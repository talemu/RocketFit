from ..models import Rfauthuser

class RfauthUserRepo:
    def get_all():
        return Rfauthuser.objects.all()
    
    def authenticate_user(loginKey, password):
        try:
            return Rfauthuser.objects.get(username = loginKey, password = password)
        except Rfauthuser.DoesNotExist:
            return -1