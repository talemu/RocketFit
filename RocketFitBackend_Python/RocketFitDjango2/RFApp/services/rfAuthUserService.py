from RFApp.mappers.rfAuthUserMapper import RfAuthUserMapper
from RFApp.serializers import RfauthuserSerializer
from ..repositories.rfAuthUserRepository import RfauthUserRepo

class RfauthUserService:

    _rfAuthRepo = RfauthUserRepo()
    _rfAuthMapper = RfAuthUserMapper()

    def get_all_auth_users(self):
        return list(map(lambda x : self._rfAuthMapper.map_to_dto(x), self._rfAuthRepo.get_all()))
    
    def get_user_id(self, loginKey, password):
        user = self._rfAuthRepo.authenticate_user(loginKey, password)
        if type(user) is not int:
            return user.id
        else:
            return -10
        
    def add_user(self, rfauthuser):
        try: 
            entity = self._rfAuthMapper.map_to_rau(rfauthuser)
            self._rfAuthRepo.save_user(entity)
            return self._rfAuthMapper.map_to_dto(entity)
        except Exception as e:
            raise (e.args[0])
