import json
import pdb
from django.test import TestCase
from django.http import JsonResponse

from rest_framework.test import APIClient

from ..views.exerciseRecordView import ExerciseRecordViewSet
from ..views.exerciseView import ExerciseViewSet
from ..views.rfAuthUserView import RFAuthUserViewSet
from ..views.workoutExerciseView import WorkoutExerciseViewSet
from ..views.workoutTemplateView import WorkoutTemplateViewSet

class ExerciseRecordViewTest(TestCase):

    #django test case set up for mock client, django test framework understands setup() method
    def setUp(self):
        self.client = APIClient()
        self.viewset = ExerciseRecordViewSet()
        self.url = '/api'

    def test_list(self):
        response = self.client.get(self.url + '/exerciserecord/')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 200)
        #ensuring the response contains 2 exercise record items
        self.assertEqual(len(json.loads(response.content.decode('utf-8'))), 2)

    def test_retrieve_er(self):
        response = self.client.get(self.url + '/exerciserecord/item?exercise=Test Case&day=0&workoutNum=0&auth=1', follow=True)
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 201)
        self.assertEqual(json.loads(response.content.decode('utf-8'))[0].get('weight'), 10.0)

    def test_retrieve_er_fault(self):
        #auth_id excluded (viewset sets it to -1 which later throws an exception in service layer)
        response = self.client.get(self.url + '/exerciserecord/item?exercise=Test Case&day=0&workoutNum=0', follow=True)
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 201)
        self.assertEqual(json.loads(response.content.decode('utf-8')), -10)

    def test_averageweight(self):
        response = self.client.get(self.url + '/exerciserecord/averageweight?exercise=Test Case&auth=1', follow=True)
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content.decode('utf-8')), 10.25)

    def test_averageweight_fault(self):
        #record does not exist
        response = self.client.get(self.url + '/exerciserecord/averageweight?exercise=Test Case&auth=100', follow=True)
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 200)
        self.assertEqual((json.loads(response.content.decode('utf-8'))), 0.0)

    def test_create(self):
        pre_inserted_er = self.client.get(self.url + '/exerciserecord/')
        data = {
            "exerciseName" : "Test Case 3",
            "day" : 1,
            "workoutNumber" : 1,
            "weight" : 100,
            "authId" : 1,
            "sets" : 3,
            "reps" : 4,
            "targetWeight" : "0.0"
        }
        response = self.client.post(self.url + '/exerciserecord/', data=data)
        post_inserted_er = self.client.get(self.url + '/exerciserecord/')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 201)
        #ensuring the exercise record was inserted into the database
        self.assertEqual(len(json.loads(post_inserted_er.content.decode('utf-8'))), len(json.loads(pre_inserted_er.content.decode('utf-8'))) + 1)

    def test_create_fault(self):
        pre_inserted_er = self.client.get(self.url + '/exerciserecord/')
        data = {
            "day" : 1,
            "workoutNumber" : 1,
            "weight" : 100,
            "authId" : 1,
            "sets" : 3,
            "reps" : 4
        }
        response = self.client.post(self.url + '/exerciserecord/', data=data)
        post_inserted_er = self.client.get(self.url + '/exerciserecord/')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 400)
        #ensuring the no exercise record was inserted into the database
        self.assertEqual(len(json.loads(post_inserted_er.content.decode('utf-8'))), len(json.loads(pre_inserted_er.content.decode('utf-8'))))
        #expected error message
        self.assertEqual(response.content.decode('utf-8'), '{"error log": "Request Mapper Issue: exerciseName"}')

class ExerciseViewSetTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.viewset = ExerciseViewSet()
        self.url = '/api'

    def test_list(self):
        response = self.client.get(self.url + '/exercise/')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(json.loads(response.content.decode('utf-8'))), 35)

    def test_retrieve_exercise_given_id(self):
        response = self.client.get(self.url + "/exercise/item?id=2", follow = True)
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content.decode('utf-8')).get('exerciseName'), "Barbell Squats")

    def test_retrieve_exercise_given_id_fault(self):
        response = self.client.get(self.url + "/exercise/item?id=37", follow = True)
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 400)
        #expected error message
        self.assertEqual(json.loads(response.content.decode('utf-8')).get('error log'), "Exercise Does Not Exist with ID")

    def test_retrieve_exercise_given_name(self):
        response = self.client.get(self.url + "/exercise/item?name=Barbell Squats", follow = True)
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content.decode('utf-8')).get('exerciseId'), 2)
    
    def test_retrieve_exercise_given_name_fault(self):
        response = self.client.get(self.url + "/exercise/item?name=Barbell Squat", follow = True)
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 400)
        #expected error message
        self.assertEqual(json.loads(response.content.decode('utf-8')).get('error log'), "Exercise Does Not Exist with Name")

    def test_query_exercise_by_name_substring(self):
        response = self.client.get(self.url + "/exercise/query?name=Bar", follow = True)
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(json.loads(response.content.decode('utf-8'))), 8)

    def test_create(self):
        pre_inserted_exercise = self.client.get(self.url + "/exercise/")
        response = self.client.post(self.url + "/exercise/", data = {"exerciseName" : "Test Exercise tdb"})
        post_inserted_exercise = self.client.get(self.url + "/exercise/")
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 201)
        #ensuring the exercise was inserted into the database
        self.assertEqual(len(json.loads(pre_inserted_exercise.content.decode())) + 1, len(json.loads(post_inserted_exercise.content.decode())))

    def test_create_fault(self):
        pre_inserted_exercise = self.client.get(self.url + "/exercise/")
        #empty exercise name
        response = self.client.post(self.url + "/exercise/", data = {"exerciseName" : ""})
        post_inserted_exercise = self.client.get(self.url + "/exercise/")
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 400)
        #ensuring the exercise was not inserted into the database
        self.assertEqual(len(json.loads(pre_inserted_exercise.content.decode())), len(json.loads(post_inserted_exercise.content.decode())))

class RFAuthUserViewSetTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.viewset = RFAuthUserViewSet()
        self.url = '/api'

    def test_list_er(self):
        response = self.client.get(self.url + '/auth/')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(json.loads(response.content.decode('utf-8'))), 2)
    
    def test_login(self):
        response = self.client.get(self.url + '/auth/login/?loginKey=adminOne&password=admin123')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content.decode('utf-8')), 100000)

    def test_login_user_does_not_exist(self):
        response = self.client.get(self.url + '/auth/login/?loginKey=adminThree&password=randomPassword')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content.decode('utf-8')), -10)
    
    def test_login_fault(self):
        #missing loginKey
        response = self.client.get(self.url + '/auth/login/?password=randomPassword')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(json.loads(response.content.decode('utf-8')).get('error log'), "LoginKey or Password is empty.")

    def test_check_email_username_exists(self):
        response = self.client.get(self.url + '/auth/checkEmailUsername/?email=alemutabo@gmail.com&username=adminOn')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content.decode('utf-8')), "Valid")
    
    def test_check_email_username_exists_email_exists(self):
        response = self.client.get(self.url + '/auth/checkEmailUsername/?email=alemutabor@gmail.com&username=adminOn')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content.decode('utf-8')), "Email already exists.")
    
    def test_check_email_username_exists_username_exists(self):
        response = self.client.get(self.url + '/auth/checkEmailUsername/?email=alemutabo@gmail.com&username=adminOne')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content.decode('utf-8')), "Username already exists.")

    def test_create(self):
        pre_inserted_users = self.client.get(self.url + '/auth/')
        data = {
            "username" : "TestUser",
            "password" : "TestPassword",
            "emailAddress" : "test.user@email.com"
        }
        response = self.client.post(self.url + '/auth/', data=data)
        post_inserted_users = self.client.get(self.url + '/auth/')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 201)
        #ensuring the user was inserted into the database
        self.assertEqual(len(json.loads(pre_inserted_users.content.decode('utf-8'))) + 1, len(json.loads(post_inserted_users.content.decode('utf-8'))))

    def test_create__fault(self):
        pre_inserted_users = self.client.get(self.url + '/auth/')
        #missing username field
        data = {
            "password" : "TestPassword",
            "emailAddress" : "test.user@email.com"
        }
        response = self.client.post(self.url + '/auth/', data=data)
        post_inserted_users = self.client.get(self.url + '/auth/')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 400)
        #ensuring the user was inserted into the database
        self.assertEqual(len(json.loads(pre_inserted_users.content.decode('utf-8'))), len(json.loads(post_inserted_users.content.decode('utf-8'))))
        #expected error message
        self.assertEqual(json.loads(response.content.decode('utf-8')).get('error log'), "Request Mapper Issue: username")

class WorkoutExerciseViewSetTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.viewset = WorkoutExerciseViewSet()
        self.url = '/api'
    
    def test_list(self):
        response = self.client.get(self.url + '/workoutexercise/')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(json.loads(response.content.decode('utf-8'))), 1)

    def test_retrieve(self):
        response = self.client.get(self.url + '/workoutexercise/100000/')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(json.loads(response.content.decode('utf-8'))), 1)
        self.assertEqual(json.loads(response.content.decode('utf-8'))[0].get('workoutName'), "Workout Name")

    def test_retrieve_fault(self):
        response = self.client.get(self.url + '/workoutexercise/100/')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 200)
        #no workout exercise with auth id 100
        self.assertEqual(len(json.loads(response.content.decode('utf-8'))), 0)

    def test_retrieve_we_based_on_auth_id_and_workout_num(self):
        response = self.client.get(self.url + '/workoutexercise/item/?authId=100000&workoutNum=1')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.content.decode('utf-8')).get('workoutName'), "Workout Name")

    def test_retrieve_we_based_on_auth_id_and_workout_num_fault(self):
        response = self.client.get(self.url + '/workoutexercise/item/?authId=100000&workoutNum=2')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 400)
        #no workout exercise with auth id 100000 and workout number 2
        self.assertEqual(json.loads(response.content.decode('utf-8')).get('error log'), "Workout Exercise not found")
    
    def test_create(self):
        pre_inserted_workout_exercises = self.client.get(self.url + '/workoutexercise/')
        data = {
            "days": "2,2,4",
            "exercises": "29,30,31",
            "sets": "3,3,3",
            "reps": "12,12,12",
            "rest": "90,90,90",
            "weeks": 4,
            "authid": 100000,
            "workoutNumber": 1,
            "workoutName": "Test Workout"
        }
        response = self.client.post(self.url + '/workoutexercise/', data=data)
        post_inserted_workout_exercises = self.client.get(self.url + '/workoutexercise/')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 201)
        #ensuring the workout exercise was inserted into the database
        self.assertEqual(json.loads(post_inserted_workout_exercises.content.decode('utf-8'))[1].get('reps'), "12,12,12")
        self.assertEqual(len(json.loads(pre_inserted_workout_exercises.content.decode('utf-8'))) + 1, len(json.loads(post_inserted_workout_exercises.content.decode('utf-8'))))

    def test_create_fault(self):
        pre_inserted_workout_exercises = self.client.get(self.url + '/workoutexercise/')
        #missing days field
        data = {
            "exercises": "29,30,31",
            "sets": "3,3,3",
            "reps": "12,12,12",
            "rest": "90,90,90",
            "weeks": 4,
            "authid": 100000,
            "workoutNumber": 1,
            "workoutName": "Test Workout"
        }
        response = self.client.post(self.url + '/workoutexercise/', data=data)
        post_inserted_workout_exercises = self.client.get(self.url + '/workoutexercise/')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 400)
        #ensuring the workout exercise was not inserted into the database
        self.assertEqual(len(json.loads(pre_inserted_workout_exercises.content.decode('utf-8'))), len(json.loads(post_inserted_workout_exercises.content.decode('utf-8'))))

class WorkoutTemplateViewSetTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.viewset = WorkoutTemplateViewSet()
        self.url = '/api'
    
    def test_list(self):
        response = self.client.get(self.url + '/workouttemplate/')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(json.loads(response.content.decode('utf-8'))), 2)
    
    def test_create(self):
        pre_inserted_workout_templates = self.client.get(self.url + '/workouttemplate/')
        data = {
            "days": "2,2,4",
            "exercises": "29,30,31",
            "sets": "3,3,3",
            "reps": "12,12,12",
            "rest": "90,90,90",
            "weeks": 4,
            "workoutName": "Test Workout"
        }
        response = self.client.post(self.url + '/workouttemplate/', data=data)
        post_inserted_workout_templates = self.client.get(self.url + '/workouttemplate/')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 201)
        #ensuring the workout template was inserted into the database
        self.assertEqual(json.loads(post_inserted_workout_templates.content.decode('utf-8'))[2].get('sets'), "3,3,3")
        self.assertEqual(len(json.loads(pre_inserted_workout_templates.content.decode('utf-8'))) + 1, len(json.loads(post_inserted_workout_templates.content.decode('utf-8'))))

    def test_create_fault(self):
        pre_inserted_workout_templates = self.client.get(self.url + '/workouttemplate/')
        #missing days field
        data = {
            "exercises": "29,30,31",
            "sets": "3,3,3",
            "reps": "12,12,12",
            "rest": "90,90,90",
            "weeks": 4,
            "workoutName": "Test Workout"
        }
        response = self.client.post(self.url + '/workouttemplate/', data=data)
        post_inserted_workout_templates = self.client.get(self.url + '/workouttemplate/')
        self.assertTrue(isinstance(response, JsonResponse))
        self.assertEqual(response.status_code, 400)
        #ensuring the workout template was not inserted into the database
        self.assertEqual(len(json.loads(pre_inserted_workout_templates.content.decode('utf-8'))), len(json.loads(post_inserted_workout_templates.content.decode('utf-8'))))