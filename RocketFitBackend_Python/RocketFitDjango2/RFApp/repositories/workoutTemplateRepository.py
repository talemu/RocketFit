from ..models import Workouttemplate

class WorkoutTemplateRepo:
    """
    Class: Repository class dedicated to reading and writing Workout Templates to the database.
    """
    def get_all(self):
        return Workouttemplate.objects.all()
    
    """
        Method: Saves a workout template to the Workouttemplate model.
    """
    def save_template(self, template):
        try:
            return template.save()
        except Exception as e:
            raise Exception(e.args[0])