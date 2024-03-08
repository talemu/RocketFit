
class WorkoutTemplateDTO:
    workoutName : str
    exercises : str
    sets : str
    reps : str
    rest : str
    day : str
    weeks: int

    def __init__(self, **kwargs):
        self.workoutName = kwargs['workoutName']
        self.exercises = kwargs['exercises']
        self.sets = kwargs['sets']
        self.reps = kwargs['reps']
        self.rest = kwargs['rest']
        self.days = kwargs['days']
        self.weeks = kwargs['weeks']

    def asdict(self):
        return {
            'workoutName' : self.workoutName ,
            'exercises' : self.exercises,
            'sets' : self.sets,
            'reps' : self.reps,
            'rest' : self.rest,
            'days'  : self.days,
            'weeks' : self.weeks    
            }