

class RfAuthUserDTO:

    """
    Class: Data Transfer Object class for RFAuthUser objects.
    """

    id : int
    username : str
    emailAddress = str

    def __init__(self, **kwargs):
        try:
            self.id = kwargs['id']
        except:
            self.id = 0
            self.password = kwargs['password']
        self.username = kwargs['username']
        self.emailAddress = kwargs['emailAddress']

    def asdict(self):
        return {
            'id' : self.id,
            'username' : self.username,
            'emailAddress' : self.emailAddress
        }
