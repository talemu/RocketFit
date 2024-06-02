
from django.contrib import admin
from django.urls import include, path
from RFApp.views.workoutExerciseView import WorkoutExerciseViewSet
from RFApp.views.exerciseRecordView import ExerciseRecordViewSet
from RFApp.views.workoutTemplateView import WorkoutTemplateViewSet
from RFApp.views.rfAuthUserView import RFAuthUserViewSet
from RFApp.views.exerciseView import ExerciseViewSet
from RFApp.views.motivationalQuoteView import MotivationalQuoteViewSet
from RFApp.views.contactSupportFormView import CustomerSupportFormViewSet
from rest_framework.routers import DefaultRouter

"""
URL configuration for RocketFitDjango2 project.
"""

""" 
Registers the urls specified in the viewsets to be used in the Django application.
"""
router = DefaultRouter()
router.register(r"workoutexercise", WorkoutExerciseViewSet, basename='workoutexercise')
router.register(r"exerciserecord", ExerciseRecordViewSet, basename='exerciserecord')
router.register(r"workouttemplate", WorkoutTemplateViewSet, basename='workouttemplate')
router.register(r"auth",RFAuthUserViewSet, basename='rfauthuser' )
router.register(r"exercise", ExerciseViewSet, basename='exercise')
router.register(r"motivationalquote", MotivationalQuoteViewSet, basename='motivationalquote')
router.register(r"emailfunction", CustomerSupportFormViewSet, basename='emailfunction')


urlpatterns = [
    #WorkoutExercise
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    #ExerciseRecords
    #url changed
    # path('api/exerciserecord', ExerciseRecordView.retrieve_exercise_records_based_on_name_day_wn_id, name='retrieve_exercise_records_based_on_name_day_wn_id'),
    #http://127.0.0.1:8000/api/exerciserecord/track/

]
