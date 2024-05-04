import datetime
from django.test import TestCase

from ..dtos.ExerciseDTO import ExerciseDTO
from ..dtos.ExerciseRecordDTO import ExerciseRecordDTO
from ..dtos.RFAuthUserDTO import RfAuthUserDTO
from ..dtos.WorkoutExerciseDTO import WorkoutExerciseDTO
from ..dtos.WorkoutTemplateDTO import WorkoutTemplateDTO

from ..services.exerciseRecordService import ExerciseRecordService
from ..services.exerciseService import ExerciseService
from ..services.rfAuthUserService import RfauthUserService
from ..services.workoutExerciseService import WorkoutExerciseService
from ..services.workoutTemplateService import WorkoutTemplateService


class ExerciseRecordsServiceTests(TestCase):
    _test_er_service = ExerciseRecordService()

    def test_get_all_exercise_records(self):
        exercise_records = self._test_er_service.get_all_exercise_records()
        self.assertEqual(len(exercise_records), 2)
        self.assertTrue(all(isinstance(item, ExerciseRecordDTO) for item in exercise_records))

    def test_get_ExerciseRecord_based_on_exercise_day_wn_id(self):
        exercise_records = self._test_er_service.get_ExerciseRecord_based_on_exercise_day_wn_id("Test Case", 0, 0, 1)
        self.assertEqual(exercise_records[0].exerciseName, "Test Case")
        self.assertTrue(all(isinstance(item, ExerciseRecordDTO) for item in exercise_records))

    def test_get_ExerciseRecord_based_on_exercise_day_wn_id_non_existent(self):
        exercise_records = self._test_er_service.get_ExerciseRecord_based_on_exercise_day_wn_id("Random", 0, 0, 1)
        self.assertEqual(exercise_records, -10)

    def test_get_ExerciseRecord_average_based_on_name_id(self):
        average_weight = self._test_er_service.get_ExerciseRecord_average_based_on_name_id("Test Case", 1)
        self.assertEqual(average_weight, 10.25)

    def test_get_ExerciseRecord_average_based_on_name_id_no_records(self):
        average_weight = self._test_er_service.get_ExerciseRecord_average_based_on_name_id("Test Case", 0)
        self.assertEqual(average_weight, 0)

    def test_get_exercise_record_by_name_startdate_enddate_id(self):
        exercise_records = self._test_er_service.get_exercise_record_by_name_startdate_enddate_id("Test Case", "2024-05-02", "2024-05-03", 1)
        self.assertEqual(exercise_records[0].exerciseName, "Test Case")
        self.assertTrue(all(isinstance(item, ExerciseRecordDTO) for item in exercise_records))

    def test_get_exercise_record_by_name_startdate_enddate_id_fault(self):
        exercise_records = self._test_er_service.get_exercise_record_by_name_startdate_enddate_id("Test Case", "2024-05-02", "2024-05-03", 5)
        self.assertEqual(len(exercise_records), 0)

    def test_get_exercise_Record_by_unique_exercise_record(self):
        exercise_records = self._test_er_service.get_exercise_Record_by_unique_exercise_record("Test", 1)
        self.assertEqual(exercise_records[0], "Test Case")
    
    def test_get_exercise_Record_by_unique_exercise_record_empty(self):
        exercise_records = self._test_er_service.get_exercise_Record_by_unique_exercise_record("Test", 5)
        self.assertEqual(len(exercise_records), 0)

    def test_exerciseRecord_track_workout(self):
        pre_added_er = self._test_er_service.get_all_exercise_records()
        er = ExerciseRecordDTO(exerciseName = "Test Case 2", sets = 1, reps = 1, weight = 20, authId = 2, day = 1, workoutNumber = 1, targetWeight = 0, createdDate = datetime.datetime.now())
        returned_dto = self._test_er_service.exerciseRecord_track_workout(er)
        post_added_er = self._test_er_service.get_all_exercise_records()
        #Check item added to repo
        self.assertEqual(len(pre_added_er) + 1, len(post_added_er))
        #Check if the newly created ExerciseRecordDTO is added to the repo
        self.assertEqual(post_added_er[len(post_added_er) - 1].exerciseName, "Test Case 2")
        #Check if the function returns a DTO to controller
        self.assertTrue(isinstance(returned_dto, ExerciseRecordDTO))

    def test_exerciseRecord_track_workout_fault(self):
        pre_added_er = self._test_er_service.get_all_exercise_records()
        with self.assertRaises(Exception):
            #missing sets field
            er = ExerciseRecordDTO(exerciseName = "Test Case 2", reps = 1, weight = 20, authId = 2, day = 1, workoutNumber = 1)
            returned_dto = self._test_er_service.exerciseRecord_track_workout(er)
        post_added_er = self._test_er_service.get_all_exercise_records()
        self.assertEqual(len(pre_added_er), len(post_added_er))
        

class ExerciseServiceTests(TestCase):
    _test_exercise_service = ExerciseService()
    
    def test_get_all_exercises(self):
        exercises = self._test_exercise_service.get_all_exercises()
        # asserts that it returns all the 35 records of exercises in the test database
        self.assertEqual(len(exercises), 35)
        # asserts that all the returned exercises are DTOs
        self.assertTrue(all(isinstance(x, ExerciseDTO) for x in exercises))

    def test_get_exercise_by_id(self):
        exercise = self._test_exercise_service.get_exercise_by_id_or_name(1, "")
        self.assertEqual(exercise.exerciseName, "Barbell Bench Press")
        self.assertTrue(isinstance(exercise, ExerciseDTO))

    def test_get_exercise_by_id_fault(self):
        #id doesn't exist
        #should raise exception
        with self.assertRaises(Exception):
            exercise = self._test_exercise_service.get_exercise_by_id_or_name(0, "")

    def test_get_exercise_by_name(self):
        exercise = self._test_exercise_service.get_exercise_by_id_or_name(0, "Barbell Bench Press")
        self.assertEqual(exercise.exerciseId, 1)
        self.assertTrue(isinstance(exercise, ExerciseDTO))

    def test_get_exercise_by_name_fault(self):
        #name doesn't exist
        #should raise exception
        with self.assertRaises(Exception):
            exercise = self._test_exercise_service.get_exercise_by_id_or_name(0, "Random Exercise")

    def test_query_exercise_by_name_substring(self):
        exercises = self._test_exercise_service.get_query_exercise_by_name_substring("Bench")
        self.assertEqual(len(exercises), 4)
        self.assertTrue(all(isinstance(exercise, ExerciseDTO) for exercise in exercises))

    def test_add_exercise(self):
        exercise = self._test_exercise_service.add_exercise(ExerciseDTO(exerciseName = "Test Exercise 2"))
        exercises = self._test_exercise_service.get_all_exercises()
        #ensures the new exercise is added
        self.assertEqual(exercises[len(exercises) - 1].exerciseName, "Test Exercise 2")
        #returned type must be a ExerciseDTO
        self.assertTrue(isinstance(exercise, ExerciseDTO))

    def test_add_exercise_fault(self):
        pre_attempted_add_exercises = self._test_exercise_service.get_all_exercises()
        with self.assertRaises(Exception):
            exercise = self._test_exercise_service.add_exercise(ExerciseDTO())
        post_attempted_add_exercises = self._test_exercise_service.get_all_exercises()
        #ensuring no exercise was saved to the exercises repo
        self.assertEqual(len(pre_attempted_add_exercises), len(post_attempted_add_exercises))

class RFAuthUserServiceTest(TestCase):

    _test_rf_auth_service = RfauthUserService()

    def test_get_all_auth_users(self):
        users = self._test_rf_auth_service.get_all_auth_users()
        #2 users in test database
        self.assertEqual(len(users), 2)
        #ensure each item in user is a dto
        self.assertTrue(all(isinstance(user, RfAuthUserDTO) for user in users))

    def test_get_user_id(self):
        user_id = self._test_rf_auth_service.get_user_id("adminOne", "admin123")
        self.assertEqual(user_id, 100000)
    
    def test_get_user_id__user_does_not_exist(self):
        user_id = self._test_rf_auth_service.get_user_id("adminOne", "wrongPassword")
        self.assertEqual(user_id, -10)

    def test_add_user(self):
        new_user = self._test_rf_auth_service.add_user(RfAuthUserDTO(username = "TestUser", password = "TestPassword", emailAddress = "TestEmail@email.com"))
        users = self._test_rf_auth_service.get_all_auth_users()
        self.assertEqual(users[len(users) - 1].username, "TestUser")
        self.assertTrue(isinstance(new_user, RfAuthUserDTO))

    def test_check_email_username_exists(self):
        #user doesn't exist
        check = self._test_rf_auth_service.check_email_username_exists("", "")
        self.assertEqual(check, "Valid")

    def test_check_email_username_exists_email_exists(self):
        #email exists
        check = self._test_rf_auth_service.check_email_username_exists("alemutabor@gmail.com", "")
        self.assertEqual(check, "Email already exists.")

    def test_check_email_username_exists_username_exists(self):
        #username exists
        check = self._test_rf_auth_service.check_email_username_exists("", "adminOne")
        self.assertEqual(check, "Username already exists.")

    def test_add_user_fault(self):
        pre_attempted_users = self._test_rf_auth_service.get_all_auth_users()
        #missing password field
        with self.assertRaises(Exception):
            new_user = self._test_rf_auth_service.add_user(RfAuthUserDTO(username = "TestUser", emailAddress = "TestEmail@email.com"))
        post_attempted_users = self._test_rf_auth_service.get_all_auth_users()
        #Ensuring no user is added
        self.assertEqual(len(pre_attempted_users), len(post_attempted_users))

    def test_add_user_faulty_email(self):
        pre_attempted_users = self._test_rf_auth_service.get_all_auth_users()
        with self.assertRaises(Exception):
            #invalid email (missing @)
            new_user = self._test_rf_auth_service.add_user(RfAuthUserDTO(username = "TestUser", password = "TestPassword", emailAddress = "TestEmailemail.com"))
        post_attempted_users = self._test_rf_auth_service.get_all_auth_users()
        #Ensuring no user is added
        self.assertEqual(len(pre_attempted_users), len(post_attempted_users))

class WorkoutExerciseServiceTests(TestCase):

    _test_we_service = WorkoutExerciseService()

    def test_get_all_WorkoutExercises(self):
        workout_exercises = self._test_we_service.get_all_WorkoutExercises()
        self.assertEqual(len(workout_exercises), 1)
        self.assertEqual(workout_exercises[0].exercises, "1,6,8,9,10,11,12,13,14,15,16,17,18,2,20,21,22,24,25,26,27,28,29,30,31")
        #ensuring the returned item is a dto
        self.assertTrue(all(isinstance(we, WorkoutExerciseDTO) for we in workout_exercises))

    def test_get_workoutexercise_by_auth_id(self):
        workout_exercises = self._test_we_service.get_workoutexercise_by_auth_id(100000)
        self.assertEqual(len(workout_exercises), 1)
        self.assertEqual(workout_exercises[0].rest, "120,120,90,90,90,90,120,120,90,90,90,90,90,120,120,90,90,90,90,120,120,90,90,90,90")
        #ensuring the returned item is a dto
        self.assertTrue(all(isinstance(we, WorkoutExerciseDTO) for we in workout_exercises))

    def test_get_workoutexercise_by_auth_id_fault(self):
        #User has no workouts
        workout_exercises = self._test_we_service.get_workoutexercise_by_auth_id(100001)
        self.assertEqual(len(workout_exercises), 0)

    def test_get_workoutexercise_by_auth_id_workout_num(self):
        workout_exercise = self._test_we_service.get_workoutexercise_by_auth_id_workout_num(100000, 1)
        self.assertEqual(workout_exercise.workoutName, "Workout Name")
        self.assertTrue(isinstance(workout_exercise, WorkoutExerciseDTO))
    
    def test_get_workoutexercise_by_auth_id_workout_num_fault(self):
        #User has no workout with given workout number, should raise exception
        with self.assertRaises(Exception):
            self._test_we_service.get_workoutexercise_by_auth_id_workout_num(100000, 1000)

    def test_add_workout(self):
        new_workout_exercise = self._test_we_service.add_workout(WorkoutExerciseDTO(days = "1", exercises = "1", sets = "1", reps = "1", rest = "1", weeks = 1, authid = 1, workoutNumber = 1, workoutName = "Test Workout"))
        self._test_we_service.add_workout(new_workout_exercise)
        workout_exercises = self._test_we_service.get_all_WorkoutExercises()
        self.assertEqual(workout_exercises[len(workout_exercises) - 1].workoutName, "Test Workout")
        self.assertTrue(isinstance(new_workout_exercise, WorkoutExerciseDTO))

    def test_add_workout_fault(self):
        pre_workout_exercises = self._test_we_service.get_all_WorkoutExercises()
        with self.assertRaises(Exception):
            #Missing Workout Name Field
            new_workout_exercise = self._test_we_service.add_workout(WorkoutExerciseDTO(days = "1", exercises = "1", sets = "1", reps = "1", rest = "1", weeks = 1, authid = 1, workoutNumber = 1))
        post_workout_exercises = self._test_we_service.get_all_WorkoutExercises()
        self.assertEqual(len(pre_workout_exercises), len(post_workout_exercises))

class WorkoutTemplateServiceTests(TestCase):

    _test_wt_service = WorkoutTemplateService()

    def test_get_all_workout_templates(self):
        workout_templates = self._test_wt_service.get_all_workout_templates()
        self.assertEqual(len(workout_templates), 2)
        #ensuring each item returned from get_all is a dto
        self.assertTrue(all(isinstance(template, WorkoutTemplateDTO) for template in workout_templates))

    def test_add_template(self):
        new_workout_template = self._test_wt_service.add_template(WorkoutTemplateDTO(days = "1", exercises = "1", sets = "1", reps = "1", rest = "1", weeks = 1, workoutName = "Test Workout"))
        workout_templates = self._test_wt_service.get_all_workout_templates()
        self.assertEqual(workout_templates[len(workout_templates) - 1].days, "1")
        self.assertTrue(isinstance(new_workout_template, WorkoutTemplateDTO))

    def test_add_template_fault(self):
        pre_workout_templates = self._test_wt_service.get_all_workout_templates()
        with self.assertRaises(Exception):
            #missing days field
            new_workout_template = self._test_wt_service.add_template(WorkoutTemplateDTO(exercises = "1", sets = "1", reps = "1", rest = "1", weeks = 1, workoutName = "Test Workout"))
        post_workout_templates = self._test_wt_service.get_all_workout_templates()
        self.assertEqual(len(pre_workout_templates), len(post_workout_templates))
