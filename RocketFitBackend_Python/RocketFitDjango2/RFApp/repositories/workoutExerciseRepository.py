from ..models import Workoutexercise

class WorkoutExerciseRepo:
    
    def get_all():
        return Workoutexercise.objects.all()
    
    
    def get_we_by_id(id):
        return Workoutexercise.objects.filter(authid = id)

