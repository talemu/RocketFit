# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Exercise(models.Model):
    exerciseid = models.AutoField(db_column='ExerciseID', primary_key=True)  # Field name made lowercase.
    exercisename = models.CharField(db_column='ExerciseName', max_length=30, db_collation='SQL_Latin1_General_CP1_CI_AS')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Exercise'

    def __str__(self):
        return str(self.exerciseid) + " -- " + self.exercisename
    
    def clean(self):
        if (self.exercisename is None):
            raise AssertionError("Exercise is missing exercisename")


class Exerciserecord(models.Model):
    id = models.AutoField(primary_key=True)
    exercise_name = models.CharField(max_length=50, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=False, null=False)
    sets = models.IntegerField()
    reps = models.IntegerField()
    weight = models.FloatField()
    auth_id = models.IntegerField()
    day = models.IntegerField()
    workout_number = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'ExerciseRecord'

    def __str__(self):
        return str(self.auth_id)
    
    def clean(self):
        if (self.exercise_name is None or self.sets is None or self.reps 
            is None or self.weight is None or self.auth_id is None or self.day 
            is None or self.workout_number is None):
            raise AssertionError("ExerciseRecord is missing value/values")

class Rfauthuser(models.Model):
    id = models.AutoField(db_column='Id', primary_key=True)  # Field name made lowercase.
    password = models.CharField(db_column='Password', max_length=28, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=False, null=False)  # Field name made lowercase.
    username = models.CharField(max_length=20, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=False, null=False)
    email_address = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=False, null=False)

    class Meta:
        managed = False
        db_table = 'RFAuthUser'

    def __str__(self):
        return str(self.id)
    
    def clean(self):
        if (self.password is (None or '') or self.username is (None or '') or self.email_address is (None or '')):
            raise AssertionError("RFAuthUser is missing value/values")
        if ('@' not in self.email_address):
            raise AssertionError("RFAuthUser does not contain a valid email address")


class Workout(models.Model):
    workoutid = models.AutoField(db_column='WorkoutID', primary_key=True)  # Field name made lowercase.
    workoutday = models.IntegerField(db_column='WorkoutDay')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Workout'

    def __str__(self):
        return str(self.workoutid)
    
class Workoutexercise(models.Model):
    workoutexerciseid = models.AutoField(db_column='WorkoutExerciseID', primary_key=True)  # Field name made lowercase.
    days = models.CharField(db_column='Days', max_length=200, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=False, null=False)  # Field name made lowercase.
    exercises = models.CharField(db_column='Exercises', max_length=200, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=False, null=False)  # Field name made lowercase.
    sets = models.CharField(db_column='Sets', max_length=200, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=False, null=False)  # Field name made lowercase.
    reps = models.CharField(db_column='Reps', max_length=200, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=False, null=False)  # Field name made lowercase.
    rest = models.CharField(db_column='Rest', max_length=200, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=False, null=False)  # Field name made lowercase.
    weeks = models.IntegerField(db_column='Weeks', blank=False, null=False)  # Field name made lowercase.
    authid = models.IntegerField(db_column='AuthID', blank=False, null=False)  # Field name made lowercase.
    workoutnumber = models.IntegerField(db_column='WorkoutNumber', blank=False, null=False)  # Field name made lowercase.
    workoutname = models.CharField(db_column='WorkoutName', max_length=50, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=False, null=False)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'WorkoutExercise'

    def __str__(self):
        return self.workoutname
    
    def clean(self):
        if (self.days is (None or '') or self.exercises is (None or '') or self.sets is (None or '')
            or self.reps is (None or '') or self.rest is (None or '') or self.weeks is (None or '')
            or self.authid is (None or '') or self.workoutnumber is (None or '') or self.workoutname is (None or '')):
            raise AssertionError("WorkoutExercise is missing value/values")


class Workouttemplate(models.Model):
    workouttemplateid = models.AutoField(db_column='WorkoutTemplateID', primary_key=True)  # Field name made lowercase.
    workoutname = models.CharField(db_column='WorkoutName', max_length=200, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=False, null=False)  # Field name made lowercase.
    exercises = models.CharField(db_column='Exercises', max_length=200, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=False, null=False)  # Field name made lowercase.
    sets = models.CharField(db_column='Sets', max_length=200, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=False, null=False)  # Field name made lowercase.
    reps = models.CharField(db_column='Reps', max_length=200, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=False, null=False)  # Field name made lowercase.
    rest = models.CharField(db_column='Rest', max_length=200, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=False, null=False)  # Field name made lowercase.
    days = models.CharField(db_column='Days', max_length=200, db_collation='SQL_Latin1_General_CP1_CI_AS', blank=False, null=False)  # Field name made lowercase.
    weeks = models.IntegerField(db_column='Weeks', blank=False, null=False)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'WorkoutTemplate'

    def __str__(self):
        return self.workoutname
    
    def clean(self):
        if (self.days is None or self.exercises is None or self.sets is None
            or self.reps is None or self.rest is None or self.weeks is None
            or self.workoutname is None):
            raise AssertionError("WorkoutTemplate is missing value/values")


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150, db_collation='SQL_Latin1_General_CP1_CI_AS')

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AS')

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128, db_collation='SQL_Latin1_General_CP1_CI_AS')
    last_login = models.DateTimeField(blank=False, null=False)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150, db_collation='SQL_Latin1_General_CP1_CI_AS')
    first_name = models.CharField(max_length=150, db_collation='SQL_Latin1_General_CP1_CI_AS')
    last_name = models.CharField(max_length=150, db_collation='SQL_Latin1_General_CP1_CI_AS')
    email = models.CharField(max_length=254, db_collation='SQL_Latin1_General_CP1_CI_AS')
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS', blank=False, null=False)
    object_repr = models.CharField(max_length=200, db_collation='SQL_Latin1_General_CP1_CI_AS')
    action_flag = models.SmallIntegerField()
    change_message = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS')
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=False, null=False)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AS')
    model = models.CharField(max_length=100, db_collation='SQL_Latin1_General_CP1_CI_AS')

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')
    name = models.CharField(max_length=255, db_collation='SQL_Latin1_General_CP1_CI_AS')
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40, db_collation='SQL_Latin1_General_CP1_CI_AS')
    session_data = models.TextField(db_collation='SQL_Latin1_General_CP1_CI_AS')
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'
