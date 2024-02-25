from ..repositories.workoutTemplateRepository import WorkoutTemplateRepo

class WorkoutTemplateService:
    
    def get_all_workout_templates():
        return WorkoutTemplateRepo.get_all()