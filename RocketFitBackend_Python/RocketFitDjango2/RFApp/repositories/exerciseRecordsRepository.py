from ..models import Exerciserecord

class ExerciseRecordRepo:
    @staticmethod
    def get_all():
        return Exerciserecord.objects.all()
    
    @staticmethod
    def get_er_based_on_exercise_day_wn_id(name, day, workoutNum, id):
        return Exerciserecord.objects.filter(exercise_name = name, day = day, workout_number = workoutNum, auth_id = id)
    
    @staticmethod
    def get_all_er_based_on_exercise_id(name, id):
        return Exerciserecord.objects.filter(exercise_name = name, auth_id = id)
    
    @staticmethod
    def save_record(exercise):
        return exercise.save()