from ..models import Workoutexercise

class WorkoutExerciseRepo:
    
    def get_all(self):
        return Workoutexercise.objects.all()
    
    
    def get_we_by_id(self, id):
        return Workoutexercise.objects.filter(authid = id)
    
    def save_workout(self, workout):
        return workout.save()

