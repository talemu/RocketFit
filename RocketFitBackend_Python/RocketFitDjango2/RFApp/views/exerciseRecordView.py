from django.http import JsonResponse
from ..services.exerciseRecordService import ExerciseRecordService
from ..serializers import ExerciserecordSerializer
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.decorators import action

class ExerciseRecordViewSet(viewsets.ViewSet):

    queryset = ExerciseRecordService.get_all_exercise_records()

    def list(self, request):
        er = ExerciserecordSerializer(self.queryset, many = True)
        return JsonResponse(er.data, safe = False)
    
    @action(detail=False, methods=['get'], url_path='retrieveer')
    def retrieve_er(self, request):
        exercise = request.query_params.get('exercise', '')
        day = request.query_params.get('day', -1)
        workoutNum = request.query_params.get('workoutNum', -1)
        auth = request.query_params.get('auth', -1)
        er = ExerciserecordSerializer(ExerciseRecordService.get_ExerciseRecord_based_on_exercise_day_wn_id(exercise, day, workoutNum, auth), many = True)
        return JsonResponse(er.data, safe = False)
    
    @action(detail=False, methods=['get'], url_path='averageweight')
    def averageweight(self, request):
        name = request.GET.get('exercise', '')
        id = request.GET.get('auth_id', 0)
        er = ExerciseRecordService.get_ExerciseRecord_average_based_on_name_id(name, id)
        return JsonResponse(er, safe = False)
        
    @action(detail=False, methods=['post'], url_path='save')
    @csrf_exempt 
    def track_workout(self, request, *args, **kwargs):
        serializedER = ExerciserecordSerializer(data=request.data)
        if (serializedER.is_valid()):
            ExerciseRecordService.exerciseRecord_track_workout(serializedER)
            return Response(serializedER.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializedER.errors, status=400)
