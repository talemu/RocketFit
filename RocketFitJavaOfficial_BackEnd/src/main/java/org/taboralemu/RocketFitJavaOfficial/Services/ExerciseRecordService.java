package org.taboralemu.RocketFitJavaOfficial.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taboralemu.RocketFitJavaOfficial.DTOs.ExerciseRecordDTO;
import org.taboralemu.RocketFitJavaOfficial.Models.ExerciseRecord;
import org.taboralemu.RocketFitJavaOfficial.Models.WorkoutExercise;
import org.taboralemu.RocketFitJavaOfficial.Repository.ExerciseRecordRepo;

@Service
public class ExerciseRecordService {
	
	@Autowired
	private ExerciseRecordRepo _erRepo;
	
	public void trackWorkout(ExerciseRecordDTO exerciseRecord) {
		ExerciseRecord er = new ExerciseRecord(
				exerciseRecord.getExercise_name(),
				exerciseRecord.getSets(),
				exerciseRecord.getReps(),
				exerciseRecord.getWeight(),
				exerciseRecord.getAuthId(),
				exerciseRecord.getDay(),
				exerciseRecord.getWorkoutNumber()
				);
		_erRepo.save(er);
	}
	
	public List<ExerciseRecordDTO> retrieveExerciseRecords() {
		List<ExerciseRecordDTO> erDTOList = new ArrayList<ExerciseRecordDTO>();
		for (ExerciseRecord x : _erRepo.findAll()) {
			ExerciseRecordDTO erTemp = new ExerciseRecordDTO(
					x.getExercise_name(),
					x.getSets(),
					x.getReps(),
					x.getWeight(),
					x.getAuthId(),
					x.getDay(),
					x.getWorkoutNumber()
					);
			erDTOList.add(erTemp);
		}
		return erDTOList;
	}
	
	public double retrieveExerciseRecord(String exerciseName, int day, int workoutNum, int auth) {
		try {
			ExerciseRecord record = _erRepo.findRecord(exerciseName, day, workoutNum, auth);
			if (record == null) {
				return -1;
			}
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
