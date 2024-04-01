from ..models import Rfauthuser

class RfauthUserRepo:
    """
    Class: Repository class dedicated to reading and writing RF Autherized Users to the database.
    """
    def get_all(self):
        return Rfauthuser.objects.all()
    
    """
        Method: Authenticate a user by checking if the loginKey and password match a user in the Rfauthuser model.
    """
    def authenticate_user(self, loginKey, password):
        try:
            if "@" not in loginKey:
                return Rfauthuser.objects.get(username = loginKey, password = password)
            else:
                return Rfauthuser.objects.get(email_address = loginKey, password = password)
        except Rfauthuser.DoesNotExist:
            return -1
        
    """
        Method: Saves a user to the Rfauthuser model.
    """
    def save_user(self, user):
        try:
            user.clean()
            return user.save()
        except Exception as e:
            raise Exception(e.args[0])