from ..repositories.exerciseRecordsRepository import ExerciseRecordRepo

class ExerciseRecordService:
    
    def get_all_exercise_records():
        return ExerciseRecordRepo.get_all()
    
    
    def get_ExerciseRecord_based_on_exercise_day_wn_id(name, day, workoutNum, id):
        return ExerciseRecordRepo.get_er_based_on_exercise_day_wn_id(name, day, workoutNum, id)
    
    
    def get_ExerciseRecord_average_based_on_name_id(name, id):
        er = ExerciseRecordRepo.get_all_er_based_on_exercise_id(name, id)
        sum = 0
        for item in er:
            sum += item.weight
        return sum / len(er)
    
    
    def exerciseRecord_track_workout(exerciseRecord):
        ExerciseRecordRepo.save_record(exerciseRecord)