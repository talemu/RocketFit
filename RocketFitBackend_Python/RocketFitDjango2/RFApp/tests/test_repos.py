from django.test import TestCase

from ..models import Exercise, Exerciserecord, Rfauthuser, Workoutexercise, Workouttemplate
from ..repositories.exerciseRecordsRepository import ExerciseRecordRepo
from ..repositories.exerciseRepository import ExerciseRepo
from ..repositories.rfAuthUserRepository import RfauthUserRepo
from ..repositories.workoutExerciseRepository import WorkoutExerciseRepo


class ExerciseRecordsRepoTests(TestCase):
    """
    This class contains unit tests for the ExerciseRecordRepo class.
    It tests various methods of the ExerciseRecordRepo class to ensure their correctness.
    """

    _test_er_repo = ExerciseRecordRepo()

    def test_get_all_er(self):
        obj = self._test_er_repo.get_all()
        self.assertEqual(obj.count() > 0, True)

    # get exercise record based on exercise day, workout number, and auth id
    def test_get_er_based_on_exercise_day_wn_id(self):
        obj = self._test_er_repo.get_er_based_on_exercise_day_wn_id("Test Case", 0, 0, 1)
        self.assertEqual(obj.count(), 1)
        self.assertEqual(obj[0].exercise_name, "Test Case")

    # get exercise record that doesn't exist
    def test_get_all_er_based_on_exercise_id_fault(self):
        obj = self._test_er_repo.get_er_based_on_exercise_day_wn_id("Empty", 0, 0, 1)
        self.assertEqual(obj.count(), 0)

    # save a new record and ensure it is saved in the test database
    def test_save_new_exercise_record(self):
        new_record = Exerciserecord(exercise_name = "New Record", sets = 0, reps = 0, weight = 10, day = 0, workout_number = 0, auth_id = 1)
        self._test_er_repo.save_record(new_record)
        obj = self._test_er_repo.get_all()
        self.assertEqual(obj[obj.count() - 1].exercise_name, "New Record")

    # faulty record save
    def test_save_new_exercise_record_fault(self):
        pre_attempted_save = self._test_er_repo.get_all()
        try:
            new_record = Exerciserecord(exercise_name = "New Record")
            self._test_er_repo.save_record(new_record)
        except:
            post_attempted_save = self._test_er_repo.get_all()
            self.assertEqual(pre_attempted_save.count(), post_attempted_save.count())
    
class ExerciseRepoTests(TestCase):

    _test_exercise_repo = ExerciseRepo()

    def test_get_all_exercises(self):
        exercises = self._test_exercise_repo.get_all()
        self.assertEqual(exercises.count(), 35)

    def test_get_exercise_by_id(self):
        exercise = self._test_exercise_repo.get_exercise_by_id(1)
        self.assertEqual(exercise.exercisename, "Barbell Bench Press")

    def test_get_exercise_by_id_fault(self):
        exercise = self._test_exercise_repo.get_exercise_by_id(100)
        self.assertEqual(exercise, None)

    def test_save_exercise(self):
        exercise = Exercise(exercisename = "test exercise")
        self._test_exercise_repo.save_exercise(exercise)
        exercises = self._test_exercise_repo.get_all()
        self.assertEqual(exercises[exercises.count() - 1].exercisename, exercise.exercisename)

    def test_save_exercise_fault(self):
        pre_attempted_exercise_add = self._test_exercise_repo.get_all()
        try:
            exercise = Exercise()
            self._test_exercise_repo.save_exercise(exercise)
        except:
            post_attemped_exercise_add = self._test_exercise_repo.get_all()
            print(post_attemped_exercise_add[post_attemped_exercise_add.count() - 2].exerciseid)
            self.assertEqual(pre_attempted_exercise_add.count(), post_attemped_exercise_add.count())

class RFAuthUserRepoTests(TestCase):

    _test_rfauthuser_repo = RfauthUserRepo()

    def test_get_all(self):
        users = self._test_rfauthuser_repo.get_all()
        self.assertEqual(users.count(), 2)

    def test_authenticate_user(self):
        user = self._test_rfauthuser_repo.authenticate_user("adminOne", "admin123")
        self.assertEqual(int(user.id), 100000)

    def test_authenticate_user_email_login(self):
        user = self._test_rfauthuser_repo.authenticate_user("alemutabor@gmail.com", "admin123")
        self.assertEqual(int(user.id), 100000)

    def test_authenticate_user_fault(self):
        user = self._test_rfauthuser_repo.authenticate_user("adminOne", "wrongPassword")
        self.assertEqual(user, -1)

    def test_save_user(self):
        user = Rfauthuser(password = "testPassword", username = "testUser", email_address = "testEmailAddress@gmail.com")
        self._test_rfauthuser_repo.save_user(user)
        users = self._test_rfauthuser_repo.get_all()
        self.assertEqual(users[users.count() - 1].username, "testUser")

    def test_save_user_fault(self):
        pre_attempted_add_users = self._test_rfauthuser_repo.get_all()
        try:
            user = Rfauthuser(password = "testPassword", username = "testUser", email_address = "testEmailAddress")
            self._test_rfauthuser_repo.save_user(user)
        except:
            post_attempted_add_users = self._test_rfauthuser_repo.get_all()
            self.assertEqual(pre_attempted_add_users.count(), post_attempted_add_users.count())

class WorkoutExerciseRepoTest(TestCase):

    _test_we_repo = WorkoutExerciseRepo()

    def test_get_all_we(self):
        workout_exercises = self._test_we_repo.get_all()
        self.assertEqual(workout_exercises.count(), 1)

    def test_get_we_by_auth_id(self):
        workout_exercises = self._test_we_repo.get_we_by_auth_id(100000)
        self.assertEqual(workout_exercises.count(), 1)

    def test_get_we_by_auth_id_empty(self):
        workout_exercises = self._test_we_repo.get_we_by_auth_id(1)
        self.assertEqual(workout_exercises.count(), 0)

    def test_save_workout(self):
        workout_exercise = Workoutexercise(days = '0', exercises = '0', sets = '0', reps = '0', rest= '0', weeks = '0', authid = '0', workoutnumber = 0, workoutname = 'Test Workout')
        self._test_we_repo.save_workout(workout_exercise)
        workout_exercises = self._test_we_repo.get_all()
        self.assertEqual(workout_exercises[workout_exercises.count() - 1].workoutname, 'Test Workout')

    def test_save_workout_fault(self):
        pre_attempted_save = self._test_we_repo.get_all()
        try:
            workout_exercise = Workoutexercise(exercises = '0', sets = '0', reps = '0', rest= '0', weeks = '0', authid = '0', workoutnumber = 0, workoutname = 'Test Workout')
            self._test_we_repo.save_workout(workout_exercise)
        except:
            post_attempted_save = self._test_we_repo.get_all()
            self.assertEqual(pre_attempted_save.count(), post_attempted_save.count())