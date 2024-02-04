package org.taboralemu.RocketFitJavaOfficial.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taboralemu.RocketFitJavaOfficial.Models.ExerciseRecord;
import org.taboralemu.RocketFitJavaOfficial.Models.WorkoutExercise;
import org.taboralemu.RocketFitJavaOfficial.Repository.ExerciseRecordRepo;

@Service
public class ExerciseRecordService {
	
	@Autowired
	private ExerciseRecordRepo _erRepo;
	
	public void trackWorkout(ExerciseRecord exerciseRecord) {
		_erRepo.save(exerciseRecord);
		
	}
	
	public List<ExerciseRecord> retrieveExerciseRecords() {
		return _erRepo.findAll();
	}
	
	public double retrieveExerciseRecord(String exerciseName, int day, int workoutNum, int auth) {
		try {
			ExerciseRecord record = _erRepo.findRecord(exerciseName, day, workoutNum, auth);
			return record.getWeight();
		}
		catch (Exception e) {
			return -1;
		}
	}
	
	public double averageOfWeightInExerciseRecords(String exercise, int auth_id) {
		List<ExerciseRecord> records = _erRepo.getAllSpecificExerciseRecords(exercise, auth_id);
		double sum = 0;
		for(ExerciseRecord r : records) {
			double oneRep = r.getWeight() / (1 - (.0225 * r.getReps()));
			sum += oneRep;
		}
		return sum / records.size();
	}
}
