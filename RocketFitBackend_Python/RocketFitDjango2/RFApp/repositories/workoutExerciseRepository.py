from ..models import Workoutexercise

class WorkoutExerciseRepo:
    @staticmethod
    def get_all():
        return Workoutexercise.objects.all()
    
    @staticmethod
    def get_we_by_id(id):
        return Workoutexercise.objects.filter(authid = id)

