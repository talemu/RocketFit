from ..repositories.exerciseRepository import ExerciseRepo

class ExerciseService:
    def get_all_exercises():
        return ExerciseRepo.get_all()
    
    def get_exercise_by_id(id):
        return ExerciseRepo.get_exercise_by_id(id)