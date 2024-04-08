from django.http import JsonResponse

from RFApp.mappers.TransformRequestMapper import TransformRequestMapper
from ..services.exerciseService import ExerciseService
from ..serializers import ExerciseSerializer
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status


class ExerciseViewSet(viewsets.ViewSet):
    """
    Class: ViewSet (controller) class dedicated to handling Exercise requests.
    """
    
    _eService = ExerciseService()

    #GET /exercise/
    def list(self, request):
        response_data = self._eService.get_all_exercises()
        response = list(map(lambda x : x.asdict(), response_data))
        return JsonResponse(response, safe = False)
        
    #GET /exercise/item?id=1
    @action(detail = False, methods=['get'], url_path='item')
    def retrieve_exercise_given_id(self, request):
        id = request.GET.get('id', 0)
        try:
            response_data = self._eService.get_exercise_by_id(id)
            response = response_data.asdict()
            return JsonResponse(response, safe = False)
        except Exception as e:
            return JsonResponse({"error log" : e.args[0]}, status = status.HTTP_400_BAD_REQUEST, safe = False)
    
    #POST /exercise/
    @csrf_exempt
    def create(self, request):
        try:
            dto = TransformRequestMapper.to_e_dto(request.data)
            e = self._eService.add_exercise(dto)
            response = e.asdict()
            return JsonResponse(response, status=status.HTTP_201_CREATED, safe= False)
        except Exception as e:
            return JsonResponse({'error log' : e.args[0]}, status = status.HTTP_400_BAD_REQUEST, safe = False)

