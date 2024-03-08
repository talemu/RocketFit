
from RFApp.dtos.ExerciseRecordDTO import ExerciseRecordDTO
from RFApp.models import Exerciserecord

class ExerciseRecordMapper:
    def map_to_dto(self, exerciserecord):
        return ExerciseRecordDTO(
            exerciseName = exerciserecord.exercise_name,
            sets = exerciserecord.sets,
            reps = exerciserecord.reps,
            weight = exerciserecord.weight,
            authId = exerciserecord.auth_id,
            day = exerciserecord.day,
            workoutNumber = exerciserecord.workout_number
        )
    
    def map_to_er(self, exerciserecorddto:ExerciseRecordDTO):
        return Exerciserecord(
            exercise_name = exerciserecorddto.exerciseName,
            sets = exerciserecorddto.sets,
            reps = exerciserecorddto.reps,
            weight = exerciserecorddto.weight,
            auth_id = exerciserecorddto.authId,
            day = exerciserecorddto.day,
            workout_number = exerciserecorddto.workoutNumber
        )