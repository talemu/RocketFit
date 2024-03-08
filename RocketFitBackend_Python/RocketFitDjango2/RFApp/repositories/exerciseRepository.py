from ..models import Exercise

class ExerciseRepo:
    def get_all(self):
        return Exercise.objects.all()
    
    def get_exercise_by_id(self, id):
        try:
            return Exercise.objects.get(exerciseid = id)
        except Exercise.DoesNotExist:
            return None
        
    def save_exercise(self, exercise):
        return exercise.save()