from ..models import Workoutexercise

class WorkoutExerciseRepo:
    """
    Class: Repository class dedicated to reading and writing Workout Exercise Records to the database.
    """

    def get_all(self):
        return Workoutexercise.objects.all()
    
    def get_we_by_auth_id(self, id):
        return Workoutexercise.objects.filter(authid = id)
    
    def get_we_by_auth_id_workout_num(self, id, workout_num):
        try:
            return Workoutexercise.objects.get(authid = id, workoutnumber = workout_num)
        except Workoutexercise.DoesNotExist:
            return None
    
    """
        Method: Saves a workout exercise to the Workoutexercise model.
    """
    def save_workout(self, workout):
        try:
            return workout.save()
        except Exception as e:
            raise Exception(e.args[0])

