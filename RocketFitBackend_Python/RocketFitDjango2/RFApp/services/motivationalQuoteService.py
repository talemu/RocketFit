from RFApp.dtos.MotivationalQuoteDTO import MotivationalQuoteDTO
from ..mappers.motivationalQuoteMapper import MotivationalQuoteMapper
from ..repositories.motivationalQuoteRepo import MotivationalQuoteRepo
import random


class MotivationalQuoteService:

    _mqRepo = MotivationalQuoteRepo()
    _mqMapper = MotivationalQuoteMapper()

    def get_all_motivational_quotes(self):
        try:
            quotes = self._mqRepo.get_all()
            quotesDTO = list(map(lambda x: self._mqMapper.map_to_dto(x), quotes))
            return quotesDTO
        except Exception as e:
            raise Exception(e.args[0])
    
    def get_random_motivational_quote(self) -> MotivationalQuoteDTO:
        try:
            random_id = random.choice(self._mqRepo.get_quotes_motivation_ids())
            quote = self._mqRepo.get_motivation_quote_by_id(random_id)
            quoteDTO = self._mqMapper.map_to_dto(quote)
            return quoteDTO
        except Exception as e:
            raise Exception(e.args[0])