from ..models import Rfauthuser

class RfauthUserRepo:
    @staticmethod
    def get_all():
        return Rfauthuser.objects.all()
    
    def authenticate_user(username, password):
        return Rfauthuser.objects.filter(username = username, password = password)