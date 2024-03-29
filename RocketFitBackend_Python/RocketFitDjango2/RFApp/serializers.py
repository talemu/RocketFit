from rest_framework import serializers
from .models import Workoutexercise, Workouttemplate, Rfauthuser, Exercise, Exerciserecord

class WorkoutexerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workoutexercise
        fields = '__all__'

    def to_representation(self, instance):
        # Call the superclass method to get the original representation
        ret = super().to_representation(instance)
        # Filter out any fields that are None (or you could customize the condition)
        return {key: value for key, value in ret.items() if value is not None}
    
    def serialize(self, item):
        return item.asdict()
        

class WorkouttemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workouttemplate
        fields = '__all__'

    def to_representation(self, instance):
        # Call the superclass method to get the original representation
        ret = super().to_representation(instance)
        # Filter out any fields that are None (or you could customize the condition)
        return {key: value for key, value in ret.items() if value is not None}

class RfauthuserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rfauthuser
        fields = '__all__'

    def to_representation(self, instance):
        # Call the superclass method to get the original representation
        ret = super().to_representation(instance)
        # Filter out any fields that are None (or you could customize the condition)
        return {key: value for key, value in ret.items() if value is not None}

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'

    def to_representation(self, instance):
        # Call the superclass method to get the original representation
        ret = super().to_representation(instance)
        # Filter out any fields that are None (or you could customize the condition)
        return {key: value for key, value in ret.items() if value is not None}

class ExerciserecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exerciserecord
        fields = '__all__'

    def to_representation(self, instance):
        # Call the superclass method to get the original representation
        ret = super().to_representation(instance)
        # Filter out any fields that are None (or you could customize the condition)
        return {key: value for key, value in ret.items() if value is not None}

