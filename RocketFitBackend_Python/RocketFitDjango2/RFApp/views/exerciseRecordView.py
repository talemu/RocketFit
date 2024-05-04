import pdb
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
    _transformMapper = TransformRequestMapper()

    #GET /exerciseRecord/
    def list(self, request):
        try:
            response_data = self._erService.get_all_exercise_records()
            response = list(map(lambda x: x.asdict(), response_data))
            return JsonResponse(response, safe = False)
        except Exception as e:
            return JsonResponse({'error log' : e.args[0]}, status = status.HTTP_400_BAD_REQUEST, safe = False)
    
    #GET /exerciseRecord/item?params
    @action(detail=False, methods=['get'], url_path='item')
    def retrieve_er(self, request):
        try:
            exercise = request.query_params.get('exercise', '')
            day = request.query_params.get('day', -1)
            workoutNum = request.query_params.get('workoutNum', -1)
            auth = request.query_params.get('auth', -1)
            response_data = self._erService.get_ExerciseRecord_based_on_exercise_day_wn_id(exercise, day, workoutNum, auth)
            if response_data == -10:
                response = response_data
            else:
                response = list(map(lambda x : x.asdict(), response_data))
            return JsonResponse(response, status = status.HTTP_201_CREATED, safe = False)
        except Exception as e:
            JsonResponse({'error log' : e.args[0]}, status = status.HTTP_400_BAD_REQUEST, safe = False)
    
    #GET /exerciseRecord/averageweight?params
    @action(detail=False, methods=['get'], url_path='averageweight')
    def averageweight(self, request):
        name = request.query_params.get('exercise', '')
        id = request.query_params.get('auth', 0)
        response = self._erService.get_ExerciseRecord_average_based_on_name_id(name, id)
        return JsonResponse(response, safe=False)
    
    #GET /exerciseRecord/record?params
    @action(detail=False, methods=['get'], url_path='record')
    def retrieve_records_based_on_exerciseName_id_range(self, request):
        exerciseName = request.query_params.get('exerciseName', '')
        startDate = request.query_params.get('startDate', '')
        endDate = request.query_params.get('endDate', '')
        authId = request.query_params.get('authId', 0)
        response_data = self._erService.get_exercise_record_by_name_startdate_enddate_id(exerciseName, startDate, endDate, authId)
        response = list(map(lambda x: x.asdict(), response_data))
        return JsonResponse(response, safe=False)
    
    #GET /exerciseRecord/unique?params
    @action(detail=False, methods=['get'], url_path='uniqueERN')
    def retrieve_unique_subname(self, request):
        subName = request.query_params.get('subName', '')
        auth_id = request.query_params.get('authId', 0)
        response = self._erService.get_exercise_Record_by_unique_exercise_record(subName, auth_id)
        return JsonResponse(response, safe=False)
        
    #POST /exerciseRecord/
    @csrf_exempt 
    def create(self, request):
        try : 
            dto = self._transformMapper.to_er_dto(request.data)
            er = self._erService.exerciseRecord_track_workout(dto)
            response = er.asdict()
            return JsonResponse(response, status=status.HTTP_201_CREATED, safe= False)
        except Exception as e:
            return JsonResponse({'error log' : e.args[0]}, status = status.HTTP_400_BAD_REQUEST, safe = False)
        # else:
        #     return Response(er[0], status=400)

