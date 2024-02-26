from django.http import JsonResponse
from ..services.workoutExerciseService import WorkoutExerciseService
from ..serializers import WorkoutexerciseSerializer
from rest_framework import viewsets

class WorkoutExerciseViewSet(viewsets.ViewSet):

    queryset = WorkoutExerciseService.get_all_WorkoutExercises()

    def list(self, request):
        we = WorkoutexerciseSerializer(self.queryset, many = True)
        return JsonResponse(we.data, safe=False)
        
    def retrieve(self, request, pk):
        we = WorkoutexerciseSerializer(WorkoutExerciseService.get_WorkoutExercise_By_ID(pk), many = True)
        return JsonResponse(we.data, safe=False)