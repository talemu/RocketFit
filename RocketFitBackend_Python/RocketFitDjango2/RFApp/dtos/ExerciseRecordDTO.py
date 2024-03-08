

class ExerciseRecordDTO:
    exerciseName : str
    sets : int
    reps : int
    weight : int
    authId : int
    day : int
    workoutNumber : int

    def __init__(self, **kwargs) -> None:
        self.exerciseName = kwargs["exerciseName"]
        self.sets = kwargs["sets"]
        self.reps = kwargs["reps"]
        self.weight = kwargs["weight"]
        self.authId = kwargs["authId"]
        self.day = kwargs["day"]
        self.workoutNumber = kwargs["workoutNumber"]

    def asdict(self):
        return {
            "exerciseName" : self.exerciseName,
            "sets" : self.sets,
            "reps" : self.reps,
            "weight" : self.weight,
            "authId" : self.authId,
            "day" : self.day,
            "workoutNumber" : self.workoutNumber
        }