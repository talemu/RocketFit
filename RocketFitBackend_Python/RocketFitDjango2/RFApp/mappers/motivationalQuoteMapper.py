

from RFApp.dtos.MotivationalQuoteDTO import MotivationalQuoteDTO
from RFApp.models import Motivationalquote


class MotivationalQuoteMapper:

    def map_to_dto(self, motivationalquote : Motivationalquote):
        """
        Maps a MotivationalQuote object to a MotivationalQuoteDTO object.

        Args:
            motivationalquote: A MotivationalQuote object.

        Returns:
            A MotivationalQuoteDTO object.
        """
        return MotivationalQuoteDTO(
            quote=motivationalquote.quote,
            author=motivationalquote.author
        )
    
    def map_to_mq(self, motivationalquotedto: MotivationalQuoteDTO):
        """
        Maps a MotivationalQuoteDTO object to a MotivationalQuote object.

        Args:
            motivationalquotedto: A MotivationalQuoteDTO object.

        Returns:
            A MotivationalQuote object.
        """
        return Motivationalquote(
            quote=motivationalquotedto.quote,
            author=motivationalquotedto.author
        )