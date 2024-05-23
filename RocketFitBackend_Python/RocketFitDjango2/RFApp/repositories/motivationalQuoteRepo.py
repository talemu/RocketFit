from ..models import Motivationalquote

class MotivationalQuoteRepo:

    def get_all(self):
        return Motivationalquote.objects.all()
    
    def get_quotes_length(self):
        return Motivationalquote.objects.count()
    
    def get_motivation_quote_by_id(self, id:int):
        try:
            print(Motivationalquote.objects.filter(motivation_id = id).first().quote)
            return Motivationalquote.objects.filter(motivation_id = id)
        except Motivationalquote.DoesNotExist:
            return None