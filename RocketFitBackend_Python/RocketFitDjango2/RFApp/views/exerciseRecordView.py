from django.http import JsonResponse
from RFApp.mappers.TransformRequestMapper import TransformRequestMapper
from ..services.exerciseRecordService import ExerciseRecordService
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.decorators import action

class ExerciseRecordViewSet(viewsets.ViewSet):

    """
    Class: ViewSet (controller) class dedicated to handling Exercise Record requests.
    """

    _erService = ExerciseRecordService()

    #GET /exerciseRecord/
    def list(self, request):
        response_data = self._erService.get_all_exercise_records()
        response = list(map(lambda x: x.asdict(), response_data))
        return JsonResponse(response, safe = False)
    
    #GET /exerciseRecord/item?params
    @action(detail=False, methods=['get'], url_path='item')
    def retrieve_er(self, request):
        exercise = request.query_params.get('exercise', '')
        day = request.query_params.get('day', -1)
        workoutNum = request.query_params.get('workoutNum', -1)
        auth = request.query_params.get('auth', -1)
        response_data = self._erService.get_ExerciseRecord_based_on_exercise_day_wn_id(exercise, day, workoutNum, auth)
        if response_data == -10:
            response = response_data
        else:
            response = response_data.asdict()
        return JsonResponse(response, safe = False)
    
    #GET /exerciseRecord/averageweight?params
    @action(detail=False, methods=['get'], url_path='averageweight')
    def averageweight(self, request):
        name = request.query_params.get('exercise', '')
        id = request.query_params.get('auth', 0)
        response = self._erService.get_ExerciseRecord_average_based_on_name_id(name, id)
        return JsonResponse(response, safe=False)
        
    #POST /exerciseRecord/
    @csrf_exempt 
    def create(self, request):
        try : 
            dto = TransformRequestMapper.to_er_dto(request.data)
            er = self._erService.exerciseRecord_track_workout(dto)
            response = er.asdict()
            return JsonResponse(response, status=status.HTTP_201_CREATED, safe= False)
        except Exception as e:
            return JsonResponse({'error log' : e.args[0]}, status = status.HTTP_400_BAD_REQUEST, safe = False)
        # else:
        #     return Response(er[0], status=400)

