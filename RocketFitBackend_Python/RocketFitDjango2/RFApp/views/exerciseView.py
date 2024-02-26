from django.http import JsonResponse
from ..services.exerciseService import ExerciseService
from ..serializers import ExerciseSerializer
from rest_framework import viewsets
from rest_framework.decorators import action


class ExerciseViewSet(viewsets.ViewSet):

    queryset = ExerciseService.get_all_exercises()

    @action(detail = False, methods=['get'], url_path='all')
    def retrieve_all_exercises(self, request):
        e = ExerciseSerializer(self.queryset, many = True)
        return JsonResponse(e.data, safe = False)
        
    @action(detail = False, methods=['get'], url_path='retrieve')
    def retrieve_exercise_given_id(self, request):
        id = request.GET.get('id', 0)
        e = ExerciseSerializer(ExerciseService.get_exercise_by_id(id))
        return JsonResponse(e.data, safe = False)