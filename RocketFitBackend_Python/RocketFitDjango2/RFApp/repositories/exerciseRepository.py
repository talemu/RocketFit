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
        
    def get_exercise_by_name(self, name):
        try:
            return Exercise.objects.get(exercisename=name)
        except Exercise.DoesNotExist:
            return None
        
    def query_exercise_by__name_substring(self, name):
        return Exercise.objects.filter(exercisename__contains=name)
        
    """
        Method: Saves an exercise to the Exercise model.
    """
    def save_exercise(self, exercise):
        try:
            return exercise.save()
        except Exception as e:
            raise Exception(e.args[0])