
from RFApp.dtos.ExerciseRecordDTO import ExerciseRecordDTO
from RFApp.models import Exerciserecord


class ExerciseRecordMapper:

    def map_to_dto(self, exerciserecord):
        """
        Maps an ExerciseRecord object to an ExerciseRecordDTO object.

        Args:
            exerciserecord: An ExerciseRecord object.

        Returns:
            An ExerciseRecordDTO object.
        """
        return ExerciseRecordDTO(
            exerciseName=exerciserecord.exercise_name,
            sets=exerciserecord.sets,
            reps=exerciserecord.reps,
            weight=exerciserecord.weight,
            authId=exerciserecord.auth_id,
            day=exerciserecord.day,
            workoutNumber=exerciserecord.workout_number,
            targetWeight=exerciserecord.target_weight,
            createdDate=exerciserecord.created_date
        )

    def map_to_er(self, exerciserecorddto: ExerciseRecordDTO):
        """
        Maps an ExerciseRecordDTO object to an ExerciseRecord object.

        Args:
            exerciserecorddto: An ExerciseRecordDTO object.

        Returns:
            An ExerciseRecord object.
        """
        return Exerciserecord(
            exercise_name=exerciserecorddto.exerciseName,
            sets=exerciserecorddto.sets,
            reps=exerciserecorddto.reps,
            weight=exerciserecorddto.weight,
            auth_id=exerciserecorddto.authId,
            day=exerciserecorddto.day,
            workout_number=exerciserecorddto.workoutNumber,
            target_weight=exerciserecorddto.targetWeight
        )