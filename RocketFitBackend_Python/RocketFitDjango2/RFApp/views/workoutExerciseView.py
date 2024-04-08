from django.http import JsonResponse
from RFApp.mappers.TransformRequestMapper import TransformRequestMapper

from RFApp.serializers import WorkoutexerciseSerializer
from ..services.workoutExerciseService import WorkoutExerciseService
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action

class WorkoutExerciseViewSet(viewsets.ViewSet):

    """
    Class: ViewSet (controller) class dedicated to handling Workout Exercise requests.
    """

    _weService = WorkoutExerciseService()
    
    #GET /workoutexercise/
    def list(self, request):
        response_data = self._weService.get_all_WorkoutExercises()
        response = list(map(lambda x: x.asdict(), response_data))
        return JsonResponse(response, safe=False)

    #GET /workoutexercise/{pk}/
    def retrieve(self, request, pk):
        response_data = self._weService.get_workoutexercise_by_auth_id(pk)
        response = list(map(lambda x: x.asdict(), response_data))
        return JsonResponse(response, safe=False)
    
    #POST /workoutexercise/
    def create(self, request):
        try:
            dto = TransformRequestMapper.to_we_dto(request.data)
            we = self._weService.add_workout(dto)
            response = we.asdict()
            return JsonResponse(response, status=status.HTTP_201_CREATED, safe= False)
        except Exception as e:
            return JsonResponse({'error log' : e.args[0]}, status = status.HTTP_400_BAD_REQUEST, safe = False)
