from django.http import JsonResponse

from RFApp.mappers.TransformRequestMapper import TransformRequestMapper

from ..services.workoutTemplateService import WorkoutTemplateService
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

class WorkoutTemplateViewSet(viewsets.ViewSet):

    _wtService = WorkoutTemplateService()

    def list(self, request):
        response_data = self._wtService.get_all_workout_templates()
        response = list(map(lambda x : x.asdict(), response_data))
        return JsonResponse(response, safe = False)
    
    def create(self,request):
        try:
            dto = TransformRequestMapper.to_wt_dto(request.data)
            wt = self._wtService.add_template(dto)
            response = wt.asdict()
            return JsonResponse(response, status=status.HTTP_201_CREATED, safe= False)
        except Exception as e:
            return JsonResponse({'error log' : e.args[0]}, status = status.HTTP_400_BAD_REQUEST, safe = False)
