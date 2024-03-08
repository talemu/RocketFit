
from RFApp.dtos.ExerciseDTO import ExerciseDTO
from RFApp.models import Exercise


class ExerciseMapper:
    def map_to_dto(self, exercise):
        if exercise is None:
            return None
        return ExerciseDTO(
            exerciseId = exercise.exerciseid,
            exerciseName = exercise.exercisename
        )
    
    def map_to_e(self, exerciseDto):
        if exerciseDto is None:
            return None
        return Exercise(
            exercisename = exerciseDto.exerciseName
        )