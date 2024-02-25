from ..repositories.rfAuthUserRepository import RfauthUserRepo

class RfauthUserService:
    def get_all_auth_users():
        return RfauthUserRepo.get_all()
    
    def get_user(loginKey, password):
        user = RfauthUserRepo.authenticate_user(loginKey, password)
        if type(user) is not int:
            return user.id
        else:
            return -10