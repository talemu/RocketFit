from RFApp.dtos.WorkoutTemplateDTO import WorkoutTemplateDTO
from RFApp.mappers.workoutTemplateMapper import WorkoutTemplateMapper
from RFApp.serializers import WorkouttemplateSerializer
from ..repositories.workoutTemplateRepository import WorkoutTemplateRepo

class WorkoutTemplateService:

    _wtRepo = WorkoutTemplateRepo()
    _wtMapper = WorkoutTemplateMapper()
    
    def get_all_workout_templates(self) -> list[WorkoutTemplateDTO]:
        return (list(map(lambda x: self._wtMapper.map_to_dto(x), self._wtRepo.get_all())))
    
    def add_template(self, workouttemplate: WorkoutTemplateDTO):
        try:
            entity = self._wtMapper.map_to_wt(workouttemplate)
            self._wtRepo.save_template(entity)
            return self._wtMapper.map_to_dto(entity)
        except Exception as e:
            raise Exception("error log: " + e.args[0])