from ..repositories.rfAuthUserRepository import RfauthUserRepo

class RfauthUserService:
    @staticmethod
    def get_all_exercise_records():
        return RfauthUserRepo.get_all()
    
    def get_user(username, password):
        try:
            return RfauthUserRepo.authenticate_user
        except Exception as e:
            return -1