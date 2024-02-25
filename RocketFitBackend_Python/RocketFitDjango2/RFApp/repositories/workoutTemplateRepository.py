from ..models import Workouttemplate

class WorkoutTemplateRepo:
    
    def get_all():
        return Workouttemplate.objects.all()