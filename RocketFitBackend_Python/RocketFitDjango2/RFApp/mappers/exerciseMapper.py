
from RFApp.dtos.ExerciseDTO import ExerciseDTO
from RFApp.models import Exercise

class ExerciseMapper:
    def map_to_dto(self, exercise):
        """Maps an Exercise object to an ExerciseDTO object.

        Args:
            exercise (Exercise): The Exercise object to be mapped.

        Returns:
            ExerciseDTO: The mapped ExerciseDTO object.
        """
        if exercise is None:
            return None
        return ExerciseDTO(
            exerciseId = exercise.exerciseid,
            exerciseName = exercise.exercisename
        )
    
    def map_to_e(self, exerciseDto):
        """Maps an ExerciseDTO object to an Exercise object.

        Args:
            exerciseDto (ExerciseDTO): The ExerciseDTO object to be mapped.

        Returns:
            Exercise: The mapped Exercise object.
        """
        if exerciseDto is None:
            return None
        return Exercise(
            exercisename = exerciseDto.exerciseName
        )