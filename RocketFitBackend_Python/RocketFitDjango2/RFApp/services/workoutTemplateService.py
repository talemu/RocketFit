from ..repositories.workoutTemplateRepository import WorkoutTemplateRepo

class WorkoutTemplateService:
    @staticmethod
    def get_all_workout_templates():
        return WorkoutTemplateRepo.get_all()