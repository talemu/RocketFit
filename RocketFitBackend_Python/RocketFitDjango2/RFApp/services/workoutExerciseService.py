from RFApp.dtos.WorkoutExerciseDTO import WorkoutExerciseDTO
from RFApp.mappers.TransformRequestMapper import TransformRequestMapper
from RFApp.mappers.workoutExerciseMapper import WorkoutExerciseMapper
from RFApp.serializers import WorkoutexerciseSerializer
from ..repositories.workoutExerciseRepository import WorkoutExerciseRepo

class WorkoutExerciseService:
    """
    Class: Service class dedicated to handling Workout Exercise business logic.
    """
    _weRepo = WorkoutExerciseRepo()
    _weMapper = WorkoutExerciseMapper()

    def get_all_WorkoutExercises(self) -> list[WorkoutExerciseDTO]:
        return list(map(lambda x : self._weMapper.map_to_dto(x), self._weRepo.get_all()))
    
    def get_workoutexercise_by_auth_id(self, id):
        return list(map(lambda x : self._weMapper.map_to_dto(x), self._weRepo.get_we_by_auth_id(id)))
    
    """
        Method: Validates the Workout Exercise sent from the client side. 
        If the record is valid, it is saved to the database (sent to repo class).

            Input: WorkoutExerciseDTO object containing the exercise record to be saved.

            Returns: WorkoutExerciseDTO object containing the saved workout exercise record if successful.
    """
    def add_workout(self, workoutexercisedto):
        try:
            workout_exercise = self._weMapper.map_to_we(workoutexercisedto)
            #ensure the workout exercise has all the valid fields
            workout_exercise.clean()
            self._weRepo.save_workout(workout_exercise)
            return self._weMapper.map_to_dto(workout_exercise)
        except Exception as e:
            raise Exception(e.args[0])