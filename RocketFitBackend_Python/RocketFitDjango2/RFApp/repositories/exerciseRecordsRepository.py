from ..models import Exerciserecord

class ExerciseRecordRepo:
    
    def get_all(self):
        return Exerciserecord.objects.all()
    
    
    def get_er_based_on_exercise_day_wn_id(self, name:str, day:int, workoutNum:int, id:int):
        return Exerciserecord.objects.filter(exercise_name = name, day = day, workout_number = workoutNum, auth_id = id)
    
    
    def get_all_er_based_on_exercise_id(self, name:str, id:int):
        return Exerciserecord.objects.filter(exercise_name = name, auth_id = id)
    
    
    def save_record(self, exercise):
        return exercise.save()