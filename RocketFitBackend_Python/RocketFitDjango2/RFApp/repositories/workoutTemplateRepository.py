from ..models import Workouttemplate

class WorkoutTemplateRepo:
    
    def get_all(self):
        return Workouttemplate.objects.all()
    
    def save_template(self, template):
        return template.save()