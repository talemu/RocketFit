from django.http import JsonResponse
from ..services.workoutTemplateService import WorkoutTemplateService
from ..serializers import WorkouttemplateSerializer
from rest_framework import viewsets

class WorkoutTemplateViewSet(viewsets.ViewSet):

    queryset = WorkoutTemplateService.get_all_workout_templates()

    def list(self, request):
        wt = WorkouttemplateSerializer(self.queryset, many = True)
        return JsonResponse(wt.data, safe = False)