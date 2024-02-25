from ..models import Exercise

class ExerciseRepo:
    def get_all():
        return Exercise.objects.all()
    
    def get_exercise_by_id(id):
        try:
            return Exercise.objects.get(exerciseid = id)
        except Exercise.DoesNotExist:
            return -1