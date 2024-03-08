
class WorkoutExerciseDTO:
    days : str
    exercises : str
    sets : str
    reps : str
    rest : str
    weeks : int
    authid : int
    workoutNumber : int
    workoutName : str

    def __init__(self, **kwargs) -> None:
        self.days = kwargs["days"]
        self.exercises = kwargs["exercises"]
        self.sets = kwargs["sets"]
        self.reps = kwargs["reps"]
        self.rest = kwargs["rest"]
        self.weeks = kwargs["weeks"]
        self.authid = kwargs["authid"]
        self.workoutNumber = kwargs["workoutNumber"]
        self.workoutName = kwargs["workoutName"]

    def asdict(self):
        return {
            'days' : self.days,
            'exercises' : self.exercises,
            'sets' : self.sets,
            'reps' : self.reps,
            'rest' : self.rest,
            'weeks' : self.weeks,
            'authid' : self.authid,
            'workoutNumber' : self.workoutNumber,
            'workoutName' : self.workoutName
        }
