from django.test import TestCase

from ..dtos.ExerciseRecordDTO import ExerciseRecordDTO

from ..services.exerciseRecordService import ExerciseRecordService

class ExerciseRecordsServiceTests(TestCase):
    _test_er_service = ExerciseRecordService()

    def test_get_all_exercise_records(self):
        exercise_records = self._test_er_service.get_all_exercise_records()
        self.assertEqual(len(exercise_records), 1)
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
        self.assertEqual(average_weight, 10)

    def test_get_ExerciseRecord_average_based_on_name_id_no_records(self):
        average_weight = self._test_er_service.get_ExerciseRecord_average_based_on_name_id("Test Case", 0)
        self.assertEqual(average_weight, 0)

    def test_exerciseRecord_track_workout(self):
        pre_added_er = self._test_er_service.get_all_exercise_records()
        er = ExerciseRecordDTO(exerciseName = "Test Case 2", sets = 1, reps = 1, weight = 20, authId = 2, day = 1, workoutNumber = 1)
        returned_dto = self._test_er_service.exerciseRecord_track_workout(er)
        post_added_er = self._test_er_service.get_all_exercise_records()
        #Check item added to repo
        self.assertEqual(len(pre_added_er) + 1, len(post_added_er))
        #Check if the newly created ExerciseRecordDTO is added to the repo
        self.assertEqual(post_added_er[len(post_added_er) - 1].exerciseName, "Test Case 2")
        #Check if the function returns a DTO to controller
        self.assertTrue(isinstance(returned_dto, ExerciseRecordDTO))
        

    