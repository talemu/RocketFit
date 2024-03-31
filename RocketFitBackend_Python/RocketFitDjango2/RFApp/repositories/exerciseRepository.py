from ..models import Exercise


class ExerciseRepo:
    """
    Class: Repository class dedicated to reading and writing Exercises to the database.
    """

    def get_all(self):
        return Exercise.objects.all()
    
    def get_exercise_by_id(self, id):
        try:
            return Exercise.objects.get(exerciseid=id)
        except Exercise.DoesNotExist:
            return None
        
    """
        Method: Saves an exercise to the Exercise model.
    """
    def save_exercise(self, exercise):
        exercise.clean()
        return exercise.save()