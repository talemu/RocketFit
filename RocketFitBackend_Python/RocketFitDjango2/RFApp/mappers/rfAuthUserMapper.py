
from RFApp.dtos.RFAuthUserDTO import RfAuthUserDTO
from RFApp.models import Rfauthuser


class RfAuthUserMapper:
    def map_to_dto(self, rfAuthUser):
        """
        Maps Rfauthuser object to RfAuthUserDTO object.

        Args:
            rfAuthUser (Rfauthuser): The Rfauthuser object to be mapped.

        Returns:
            RfAuthUserDTO: The mapped RfAuthUserDTO object.
        """
        return RfAuthUserDTO(
            id = rfAuthUser.id,
            username = rfAuthUser.username,
            emailAddress = rfAuthUser.email_address
        )
    
    def map_to_rau(self, rfAuthUserDto):
        """
        Maps RfAuthUserDTO object to Rfauthuser object.

        Args:
            rfAuthUserDto (RfAuthUserDTO): The RfAuthUserDTO object to be mapped.

        Returns:
            Rfauthuser: The mapped Rfauthuser object.
        """
        return Rfauthuser(
            username = rfAuthUserDto.username,
            password = rfAuthUserDto.password,
            email_address = rfAuthUserDto.emailAddress
        )