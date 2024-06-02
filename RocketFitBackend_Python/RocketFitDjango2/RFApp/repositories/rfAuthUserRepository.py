from ..models import Rfauthuser

class RfauthUserRepo:
    """
    Class: Repository class dedicated to reading and writing RF Autherized Users to the database.
    """
    def get_all(self):
        return Rfauthuser.objects.all()
    
    def get_user_by_id(self, id):
        try:
            return Rfauthuser.objects.get(id = id)
        except Rfauthuser.DoesNotExist:
            return None
        
    def change_user_password(self, id, password):
        try:
            user = Rfauthuser.objects.get(id = id)
            user.password = password
            user.save()
        except Rfauthuser.DoesNotExist:
            return None
    
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
            return None
        
    def check_if_email_or_username_exists(self, email, username):
        if (Rfauthuser.objects.filter(email_address = email).exists()):
            return "Email already exists."
        elif (Rfauthuser.objects.filter(username = username).exists()):
            return "Username already exists."
        else:
            return "Valid"
        
    """
        Method: Saves a user to the Rfauthuser model.
    """
    def save_user(self, user):
        try:
            return user.save()
        except Exception as e:
            raise Exception(e.args[0])