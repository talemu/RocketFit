from rest_framework import serializers
from .models import Workoutexercise, Workouttemplate, Rfauthuser, Workout, Exercise, Exerciserecord

class WorkoutexerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workoutexercise
        fields = [
            "days",
            "exercises",
            "sets",
            "reps",
            "rest",
            "weeks",
            "workoutnumber",
            "workoutname"]

class WorkouttemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workouttemplate
        fields = ["workoutname",
                "exercises",
                "sets",
                "reps",
                "rest",
                "day",
                "weeks"]

class RfauthuserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rfauthuser
        fields = ['password',
                'username', 
                'email_address' ]

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = '__all__'

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['exercisename']

class ExerciserecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exerciserecord
        fields = ['exercise_name', 
                    'sets', 
                    "reps",
                    "weight",
                    "day",
                    "workout_number"]

