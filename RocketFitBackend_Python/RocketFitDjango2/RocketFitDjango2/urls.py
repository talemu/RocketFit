"""
URL configuration for RocketFitDjango2 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from RFApp.views.workoutExerciseView import WorkoutExerciseViewSet
from RFApp.views.exerciseRecordView import ExerciseRecordViewSet
from RFApp.views.workoutTemplateView import WorkoutTemplateViewSet
from RFApp.views.rfAuthUserView import RFAuthUserViewSet
from RFApp.views.exerciseView import ExerciseViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"workoutexercise", WorkoutExerciseViewSet, basename='workoutexercise')
router.register(r"exerciserecord", ExerciseRecordViewSet, basename='exerciserecord')
router.register(r"workouttemplate", WorkoutTemplateViewSet, basename='workouttemplate')
router.register(r"auth",RFAuthUserViewSet, basename='rfauthuser' )
router.register(r"exercise", ExerciseViewSet, basename='exercise')

urlpatterns = [
    #WorkoutExercise
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    #ExerciseRecords
    #url changed
    # path('api/exerciserecord', ExerciseRecordView.retrieve_exercise_records_based_on_name_day_wn_id, name='retrieve_exercise_records_based_on_name_day_wn_id'),
    #http://127.0.0.1:8000/api/exerciserecord/track/

]
