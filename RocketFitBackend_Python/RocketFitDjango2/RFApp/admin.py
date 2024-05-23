from django.contrib import admin
from .models import Motivationalquote, Workoutexercise, Workouttemplate, Rfauthuser, Workout, Exercise, Exerciserecord

"""
Registers the Models to be used in the Django Admin interface. 
"""
admin.site.register(Workoutexercise)
admin.site.register(Workouttemplate)
admin.site.register(Rfauthuser)
admin.site.register(Workout)
admin.site.register(Exercise)
admin.site.register(Exerciserecord)
admin.site.register(Motivationalquote)

# Register your models here.
