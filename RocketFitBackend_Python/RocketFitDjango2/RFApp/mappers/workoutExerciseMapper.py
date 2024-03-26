

from RFApp.dtos.WorkoutExerciseDTO import WorkoutExerciseDTO
from RFApp.models import Workoutexercise



class WorkoutExerciseMapper:

    def map_to_dto(self, workoutExercise):
        """
        Maps a WorkoutExercise object to a WorkoutExerciseDTO object.

        Parameters:
        - workoutExercise: The WorkoutExercise object to be mapped.

        Returns:
        - WorkoutExerciseDTO: The mapped WorkoutExerciseDTO object.
        """
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
        """
        Maps a WorkoutExerciseDTO object to a Workoutexercise object.

        Parameters:
        - workoutExerciseDto: The WorkoutExerciseDTO object to be mapped.

        Returns:
        - Workoutexercise: The mapped Workoutexercise object.
        """
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
        