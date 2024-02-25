from django.http import JsonResponse
from ..services.exerciseService import ExerciseService
from ..serializers import ExerciseSerializer


class ExerciseView:
    def retrieve_all_exercises(request):
        if request.method == 'GET':
            e = ExerciseSerializer(ExerciseService.get_all_exercises(), many = True)
            return JsonResponse(e.data, safe = False)
        
    def retrieve_exercise_given_id(request):
        if request.method == 'GET':
            id = request.GET.get('id', 0)
            e = ExerciseSerializer(ExerciseService.get_exercise_by_id(id))
            return JsonResponse(e.data, safe = False)