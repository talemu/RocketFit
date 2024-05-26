from RFApp.mappers.rfAuthUserMapper import RfAuthUserMapper
from RFApp.serializers import RfauthuserSerializer
from ..dtos.RFAuthUserDTO import RfAuthUserDTO
from ..repositories.rfAuthUserRepository import RfauthUserRepo

class RfauthUserService:
    """
    Class: Service class dedicated to handling RF Autherized User business logic.
    """
    _rfAuthRepo = RfauthUserRepo()
    _rfAuthMapper = RfAuthUserMapper()

    def get_all_auth_users(self):
        return list(map(lambda x : self._rfAuthMapper.map_to_dto(x), self._rfAuthRepo.get_all()))
    
    def get_user_by_id(self, id):
        user = self._rfAuthRepo.get_user_by_id(id)
        if user is None:
            return None
        return self._rfAuthMapper.map_to_dto(user)
    
    def change_user_password(self, id, password) -> RfAuthUserDTO:
        try:
            user = self._rfAuthRepo.get_user_by_id(id)
            if (user is None):
                raise Exception("User not found.")
            self._rfAuthRepo.change_user_password(id, password)
            return self._rfAuthMapper.map_to_dto()
        except Exception as e:
            raise Exception(e.args[0])
    
    """
        Method: Authenticate a user by checking if the loginKey 
        and password match a user in the Rfauthuser model.

            Returns: Id of the validated user if user found, -10 if unsuccessful.
    """
    def get_user_id(self, loginKey, password):
        if (loginKey == '' or password == ''):
            raise Exception("LoginKey or Password is empty.")
        user = self._rfAuthRepo.authenticate_user(loginKey, password)
        if user is None:
            return -10
        else:
            return user.id
        
    def check_email_username_exists(self, email, username):
        return self._rfAuthRepo.check_if_email_or_username_exists(email, username)
        
    """
        Method: Validates the potential user sent from the client side. 
        If the record is valid, it is saved to the database (sent to repo class).

            Input: RFAuthUserDTO object containing the exercise record to be saved.

            Returns: RFAuthUserDTO object containing the saved rfauthuser if successful.
    """
    def add_user(self, rfauthuser):
        try: 
            user = self._rfAuthMapper.map_to_rau(rfauthuser)
            #ensure user has all the valid fields
            user.clean()
            self._rfAuthRepo.save_user(user)
            return self._rfAuthMapper.map_to_dto(user)
        except Exception as e:
            raise (e.args[0])
