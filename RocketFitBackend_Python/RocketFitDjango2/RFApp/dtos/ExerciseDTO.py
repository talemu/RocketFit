
class ExerciseDTO:
    exerciseId : int
    exerciseName : str

    def __init__(self, **kwargs):
        try:
            self.exerciseId = kwargs['exerciseId']
        except:
            self.exerciseId = 0
        self.exerciseName = kwargs['exerciseName']
    
    def asdict(self):
        return {
            'exerciseId' : self.exerciseId,
            'exerciseName' : self.exerciseName
        }