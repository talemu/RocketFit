from ..models import Workouttemplate

class WorkoutTemplateRepo:
    @staticmethod
    def get_all():
        return Workouttemplate.objects.all()