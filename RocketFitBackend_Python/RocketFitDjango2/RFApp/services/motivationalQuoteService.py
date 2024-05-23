from RFApp.dtos.MotivationalQuoteDTO import MotivationalQuoteDTO
from ..mappers.motivationalQuoteMapper import MotivationalQuoteMapper
from ..repositories.motivationalQuoteRepo import MotivationalQuoteRepo


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
        
    def get_motivational_quotes_length(self):
        try:
            num_quotes = self._mqRepo.get_quotes_length()
            return num_quotes
        except Exception as e:
            raise Exception(e.args[0])
    
    def get_motivational_quote_by_id(self, id:int) -> MotivationalQuoteDTO:
        try:
            quote = self._mqRepo.get_motivation_quote_by_id(id)[0]
            quoteDTO = self._mqMapper.map_to_dto(quote)
            return quoteDTO
        except Exception as e:
            raise Exception(quoteDTO)