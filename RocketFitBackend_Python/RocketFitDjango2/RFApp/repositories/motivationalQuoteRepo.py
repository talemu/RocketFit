from ..models import Motivationalquote

class MotivationalQuoteRepo:

    def get_all(self):
        return Motivationalquote.objects.all()
    
    def get_quotes_motivation_ids(self):
        return Motivationalquote.objects.values_list('motivation_id', flat = True)
    
    def get_motivation_quote_by_id(self, id:int):
        try:
            return Motivationalquote.objects.get(motivation_id = id)
        except Motivationalquote.DoesNotExist:
            return None