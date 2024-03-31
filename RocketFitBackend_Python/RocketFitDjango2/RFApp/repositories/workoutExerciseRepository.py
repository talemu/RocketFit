from ..models import Workoutexercise

class WorkoutExerciseRepo:
    """
    Class: Repository class dedicated to reading and writing Workout Exercise Records to the database.
    """

    def get_all(self):
        return Workoutexercise.objects.all()
    
    def get_we_by_auth_id(self, id):
        return Workoutexercise.objects.filter(authid = id)
    
    """
        Method: Saves a workout exercise to the Workoutexercise model.
    """
    def save_workout(self, workout):
        workout.clean()
        return workout.save()

