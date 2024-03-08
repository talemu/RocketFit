

from RFApp.dtos.WorkoutExerciseDTO import WorkoutExerciseDTO
from RFApp.models import Workoutexercise


class WorkoutExerciseMapper:
    def map_to_dto(self, workoutExercise):
        return WorkoutExerciseDTO (
            days = workoutExercise.days,
            exercises = workoutExercise.exercises ,           
            sets = workoutExercise.sets,
            reps = workoutExercise.reps,
            rest = workoutExercise.rest,
            weeks = workoutExercise.weeks,
            authid = workoutExercise.authid,
            workoutNumber = workoutExercise.workoutnumber,
            workoutName = workoutExercise.workoutname
        )   

    def map_to_we(self, workoutExerciseDto):
        return Workoutexercise (
            days = workoutExerciseDto.days,
            exercises = workoutExerciseDto.exercises ,         
            sets = workoutExerciseDto.sets,
            reps = workoutExerciseDto.reps,
            rest = workoutExerciseDto.rest,
            weeks = workoutExerciseDto.weeks,
            authid = workoutExerciseDto.authid,
            workoutnumber = workoutExerciseDto.workoutNumber,
            workoutname = workoutExerciseDto.workoutName
        )           
        