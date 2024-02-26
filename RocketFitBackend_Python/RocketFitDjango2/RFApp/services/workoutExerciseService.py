from RFApp.serializers import WorkoutexerciseSerializer
from ..repositories.workoutExerciseRepository import WorkoutExerciseRepo

class WorkoutExerciseService:
    def get_all_WorkoutExercises():
        return WorkoutExerciseRepo.get_all()
    
    def get_WorkoutExercise_By_ID(id):
        return WorkoutExerciseRepo.get_we_by_id(id)