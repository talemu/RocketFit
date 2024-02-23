from django.http import JsonResponse
from ..services.workoutExerciseService import WorkoutExerciseService
from ..serializers import WorkoutexerciseSerializer

class WorkoutExerciseView:
    def retrieve_all_workout_exercises(request):
        if request.method == 'GET':
            we = WorkoutexerciseSerializer(WorkoutExerciseService.get_all_WorkoutExercises(), many = True)
            return JsonResponse(we.data, safe=False)
        
    def retrieve_workout_exercises_by_id(request, id):
        if request.method == 'GET':
            we = WorkoutexerciseSerializer(WorkoutExerciseService.get_WorkoutExercise_By_ID(id), many = True)
            return JsonResponse(we.data, safe=False)