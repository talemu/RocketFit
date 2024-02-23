from django.http import JsonResponse
from ..services.workoutTemplateService import WorkoutTemplateService
from ..serializers import WorkouttemplateSerializer

class WorkoutTemplateView:
    def retrieve_all_workout_templates(request):
        if request.method == 'GET':
            wt = WorkouttemplateSerializer(WorkoutTemplateService.get_all_workout_templates(), many = True)
            return JsonResponse(wt.data, safe = False)