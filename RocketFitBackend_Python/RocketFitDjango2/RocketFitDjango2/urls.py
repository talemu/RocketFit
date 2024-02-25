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
from django.urls import path
from RFApp.views.workoutExerciseView import WorkoutExerciseView
from RFApp.views.exerciseRecordView import ExerciseRecordView
from RFApp.views.workoutTemplateView import WorkoutTemplateView
from RFApp.views.rfAuthUserView import RFAuthUserView
from RFApp.views.exerciseView import ExerciseView

urlpatterns = [
    #WorkoutExercise
    path('admin/', admin.site.urls),
    path('api/workoutexercises/', WorkoutExerciseView.retrieve_all_workout_exercises, name='retrieve_all_workout_exercises'),
    path('api/workoutexercises/id/<int:id>', WorkoutExerciseView.retrieve_workout_exercises_by_id, name = 'retrieve_all_workout_exercises'),
    
    #ExerciseRecords
    path('api/exerciserecord/', ExerciseRecordView.retrieve_all_exercise_records, name = 'retrieve_all_exercise_records'),
    path('api/exerciserecord', ExerciseRecordView.retrieve_exercise_records_based_on_name_day_wn_id, name='retrieve_exercise_records_based_on_name_day_wn_id'),
    path('api/exerciserecord/averageweight', ExerciseRecordView.retrieve_exercise_record_average_based_on_name_id, name = 'retrieve_exercise_record_average_based_on_name_id'),
    path('api/exerciserecord/save', ExerciseRecordView.track_workout, name='track_workout'),

    #WorkoutTemplate
    path('api/workouttemplate', WorkoutTemplateView.retrieve_all_workout_templates, name = 'retrieve_all_workout_templates'),

    #RFAuthUser
    path('api/auth/users', RFAuthUserView.retrieve_all_auth_users, name = 'retrieve_all_auth_users'),
    path('api/auth/login', RFAuthUserView.authenticate_potential_rf_user, name = 'authenticate_potential_rf_user'),

    #Exercise
    path('api/exercises/all', ExerciseView.retrieve_all_exercises, name = 'retrieve_all_exercises'),
    path('api/exercises', ExerciseView.retrieve_exercise_given_id, name = 'retrieve_exercise_given_id')
]
