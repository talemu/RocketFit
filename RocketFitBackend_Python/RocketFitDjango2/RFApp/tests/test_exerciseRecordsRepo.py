from django.test import TestCase

from ..models import Exerciserecord
from ..repositories.exerciseRecordsRepository import ExerciseRecordRepo

# Create your tests here.
class ExerciseRecordsRepoTests(TestCase):

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
        new_record = Exerciserecord(exercise_name = "New Record")
        self._test_er_repo.save_record(new_record)
        post_attempted_save = self._test_er_repo.get_all()
        self.assertEqual(pre_attempted_save.count() == post_attempted_save.count(), True)
    
