from django.test import TestCase

from ..models import Exercise, Exerciserecord, Rfauthuser, Workoutexercise, Workouttemplate
from ..repositories.exerciseRecordsRepository import ExerciseRecordRepo
from ..repositories.exerciseRepository import ExerciseRepo
from ..repositories.rfAuthUserRepository import RfauthUserRepo
from ..repositories.workoutExerciseRepository import WorkoutExerciseRepo
from ..repositories.workoutTemplateRepository import WorkoutTemplateRepo


class ExerciseRecordsRepoTests(TestCase):
    """
    This class contains unit tests for the ExerciseRecordRepo class.
    It tests various methods of the ExerciseRecordRepo class to ensure their correctness.
    """

    _test_er_repo = ExerciseRecordRepo()

    def test_get_all_er(self):
        obj = self._test_er_repo.get_all()
        self.assertEqual(len(obj) > 0, True)

    # get exercise record based on exercise day, workout number, and auth id
    def test_get_er_based_on_exercise_day_wn_id(self):
        obj = self._test_er_repo.get_er_based_on_exercise_day_wn_id("Test Case", 0, 0, 1)
        self.assertEqual(len(obj), 1)
        self.assertEqual(obj[0].exercise_name, "Test Case")

    # get exercise record that doesn't exist
    def test_get_all_er_based_on_exercise_id_fault(self):
        obj = self._test_er_repo.get_er_based_on_exercise_day_wn_id("Empty", 0, 0, 1)
        self.assertEqual(len(obj), 0)

    # save a new record and ensure it is saved in the test database
    def test_save_new_exercise_record(self):
        new_record = Exerciserecord(exercise_name="New Record", sets=1, reps=1, weight=10, day=1, workout_number=1, auth_id=1, target_weight=0)
        self._test_er_repo.save_record(new_record)
        obj = self._test_er_repo.get_all()
        self.assertEqual(obj[len(obj) - 1].exercise_name, "New Record")

class ExerciseRepoTests(TestCase):
    """
    This class contains unit tests for the ExerciseRepo class.
    It tests various methods of the ExerciseRepo class to ensure their correctness.
    """

    _test_exercise_repo = ExerciseRepo()

    def test_get_all_exercises(self):
        exercises = self._test_exercise_repo.get_all()
        self.assertEqual(len(exercises), 35)

    def test_get_exercise_by_id(self):
        exercise = self._test_exercise_repo.get_exercise_by_id(1)
        self.assertEqual(exercise.exercisename, "Barbell Bench Press")

    def test_get_exercise_by_id_fault(self):
        exercise = self._test_exercise_repo.get_exercise_by_id(100)
        self.assertEqual(exercise, None)

    def test_save_exercise(self):
        exercise = Exercise(exercisename="test exercise")
        self._test_exercise_repo.save_exercise(exercise)
        exercises = self._test_exercise_repo.get_all()
        self.assertEqual(exercises[len(exercises) - 1].exercisename, exercise.exercisename)

class RFAuthUserRepoTests(TestCase):
    """
    This class contains unit tests for the RfauthUserRepo class.
    It tests various methods of the RfauthUserRepo class to ensure their correctness.
    """
    _test_rfauthuser_repo = RfauthUserRepo()

    def test_get_all(self):
        users = self._test_rfauthuser_repo.get_all()
        self.assertEqual(len(users), 2)

    def test_authenticate_user(self):
        user = self._test_rfauthuser_repo.authenticate_user("adminOne", "admin123")
        self.assertEqual(int(user.id), 100000)

    def test_authenticate_user_email_login(self):
        user = self._test_rfauthuser_repo.authenticate_user("alemutabor@gmail.com", "admin123")
        self.assertEqual(int(user.id), 100000)

    def test_authenticate_user_fault(self):
        user = self._test_rfauthuser_repo.authenticate_user("adminOne", "wrongPassword")
        self.assertEqual(user, None)

    def test_save_user(self):
        user = Rfauthuser(password="testPassword", username="testUser", email_address="testEmailAddress@gmail.com")
        self._test_rfauthuser_repo.save_user(user)
        users = self._test_rfauthuser_repo.get_all()
        self.assertEqual(users[len(users) - 1].username, "testUser")

class WorkoutExerciseRepoTest(TestCase):
    """
    This class contains unit tests for the WorkoutExerciseRepo class.
    It tests various methods of the WorkoutExerciseRepo class to ensure their correctness.
    """

    _test_we_repo = WorkoutExerciseRepo()

    def test_get_all_we(self):
        workout_exercises = self._test_we_repo.get_all()
        self.assertEqual(len(workout_exercises), 1)

    def test_get_we_by_auth_id(self):
        workout_exercises = self._test_we_repo.get_we_by_auth_id(100000)
        self.assertEqual(len(workout_exercises), 1)

    def test_get_we_by_auth_id_empty(self):
        workout_exercises = self._test_we_repo.get_we_by_auth_id(1)
        self.assertEqual(len(workout_exercises), 0)

    def test_save_workout(self):
        workout_exercise = Workoutexercise(days='0', exercises='0', sets='0', reps='0', rest='0', weeks='0', authid='0', workoutnumber=0, workoutname='Test Workout')
        self._test_we_repo.save_workout(workout_exercise)
        workout_exercises = self._test_we_repo.get_all()
        self.assertEqual(workout_exercises[len(workout_exercises) - 1].workoutname, 'Test Workout')

class WorkoutTemplateRepoTest(TestCase):
    """
    This class contains unit tests for the WorkoutTemplateRepo class.
    It tests various methods of the WorkoutTemplateRepo class to ensure their correctness.
    """

    _test_wt_repo = WorkoutTemplateRepo()

    def test_get_all(self):
        templates = self._test_wt_repo.get_all()
        self.assertEqual(len(templates), 2)

    def test_save_template(self):
        template = Workouttemplate(days='0', exercises='0', sets='0', reps='0', rest='0', weeks='0', workoutname='Test Workout')
        self._test_wt_repo.save_template(template)
        templates = self._test_wt_repo.get_all()
        self.assertEqual(templates[len(templates) - 1].workoutname, 'Test Workout')