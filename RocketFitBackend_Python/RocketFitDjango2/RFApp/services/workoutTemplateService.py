from RFApp.dtos.WorkoutTemplateDTO import WorkoutTemplateDTO
from RFApp.mappers.workoutTemplateMapper import WorkoutTemplateMapper
from RFApp.serializers import WorkouttemplateSerializer
from ..repositories.workoutTemplateRepository import WorkoutTemplateRepo

class WorkoutTemplateService:
    """
    Class: Service class dedicated to handling Workout Template business logic.
    """
    _wtRepo = WorkoutTemplateRepo()
    _wtMapper = WorkoutTemplateMapper()
    
    def get_all_workout_templates(self) -> list[WorkoutTemplateDTO]:
        return (list(map(lambda x: self._wtMapper.map_to_dto(x), self._wtRepo.get_all())))
    
    """
        Method: Validates the Workout Template sent from the client side. 
        If the record is valid, it is saved to the database (sent to repo class).

            Input: WorkoutTemplateDTO object containing the exercise record to be saved.

            Returns: WorkoutTemplateDTO object containing the saved workout template record if successful."""
    def add_template(self, workouttemplate: WorkoutTemplateDTO):
        try:
            entity = self._wtMapper.map_to_wt(workouttemplate)
            self._wtRepo.save_template(entity)
            return self._wtMapper.map_to_dto(entity)
        except Exception as e:
            raise Exception("error log: " + e.args[0])