
from RFApp.dtos.RFAuthUserDTO import RfAuthUserDTO
from RFApp.models import Rfauthuser


class RfAuthUserMapper:
    def map_to_dto(self, rfAuthUser):
        return RfAuthUserDTO(
            id = rfAuthUser.id,
            username = rfAuthUser.username,
            emailAddress = rfAuthUser.email_address
        )
    
    def map_to_rau(self, rfAuthUserDto):
        return Rfauthuser(
            username = rfAuthUserDto.username,
            password = rfAuthUserDto.password,
            email_address = rfAuthUserDto.emailAddress
        )