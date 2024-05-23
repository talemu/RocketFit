

class MotivationalQuoteDTO:
    quote: str
    author: str


    def __init__(self, **kwargs):
        self.quote = kwargs['quote']
        self.author = kwargs['author']

    def asdict(self):
        return {
            'quote' : self.quote,
            'author' : self.author
        }