
from RFApp.dtos.WorkoutTemplateDTO import WorkoutTemplateDTO
from RFApp.models import Workouttemplate


class WorkoutTemplateMapper:
    def map_to_dto(self, workoutTemplate):
        return WorkoutTemplateDTO(
            workoutName = workoutTemplate.workoutname,
            exercises = workoutTemplate.exercises,
            sets = workoutTemplate.sets,
            reps = workoutTemplate.reps,
            rest = workoutTemplate.rest,
            days = workoutTemplate.days,
            weeks= workoutTemplate.weeks
        )
    
    def map_to_wt(self, workoutTemplateDto):
        return Workouttemplate(
            workoutname = workoutTemplateDto.workoutName,
            exercises = workoutTemplateDto.exercises,
            sets = workoutTemplateDto.sets,
            reps = workoutTemplateDto.reps,
            rest = workoutTemplateDto.rest,
            days = workoutTemplateDto.days,
            weeks= workoutTemplateDto.weeks
        )