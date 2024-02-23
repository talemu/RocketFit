from django.http import JsonResponse
from ..services.exerciseRecordService import ExerciseRecordService
from ..serializers import ExerciserecordSerializer
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.decorators import api_view



class ExerciseRecordView(APIView):
    def retrieve_all_exercise_records(request):
        if request.method == 'GET':
            er = ExerciserecordSerializer(ExerciseRecordService.get_all_exercise_records(), many = True)
            return JsonResponse(er.data, safe = False)
        
    def retrieve_exercise_records_based_on_name_day_wn_id(request):
        if request.method == 'GET':
            name = request.GET.get('exercise', '')
            day = request.GET.get('day', 0)
            workoutNum = request.GET.get('workoutNum', 0)
            id = request.GET.get('auth', 0)
            er = ExerciserecordSerializer(ExerciseRecordService.get_ExerciseRecord_based_on_exercise_day_wn_id(name, day, workoutNum, id), many = True)
            return JsonResponse(er.data, safe = False)
        
    def retrieve_exercise_record_average_based_on_name_id(request):
        if request.method == 'GET':
            name = request.GET.get('exercise', '')
            id = request.GET.get('auth_id', 0)
            er = ExerciseRecordService.get_ExerciseRecord_average_based_on_name_id(name, id)
            return JsonResponse(er, safe = False)
        
    @api_view(['POST'])
    @csrf_exempt 
    def track_workout(request, *args, **kwargs):
        if request.method == 'POST':
            serializedER = ExerciserecordSerializer(data=request.data)
            if (serializedER.is_valid()):
                print("hello")
                ExerciseRecordService.exerciseRecord_track_workout(serializedER)
                return Response(serializedER.data, status=status.HTTP_201_CREATED)
            else:
                print("hello2")
                return Response(serializedER.errors, status=400)
        return JsonResponse({'message': 'Invalid method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
