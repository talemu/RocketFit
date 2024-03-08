from ..models import Rfauthuser

class RfauthUserRepo:
    def get_all(self):
        return Rfauthuser.objects.all()
    
    def authenticate_user(self, loginKey, password):
        try:
            return Rfauthuser.objects.get(username = loginKey, password = password)
        except Rfauthuser.DoesNotExist:
            return -1
        
    def save_user(self, user):
        return user.save()