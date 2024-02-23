from rest_framework import serializers
from .models import Workoutexercise, Workouttemplate, Rfauthuser, Workout, Exercise, Exerciserecord

class WorkoutexerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workoutexercise
        fields = '__all__'

class WorkouttemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workouttemplate
        fields = '__all__'

class RfauthuserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rfauthuser
        fields = '__all__'

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = '__all__'

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'

class ExerciserecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exerciserecord
        fields = '__all__'

