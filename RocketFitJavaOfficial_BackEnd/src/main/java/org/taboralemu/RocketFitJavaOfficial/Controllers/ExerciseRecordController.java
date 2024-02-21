package org.taboralemu.RocketFitJavaOfficial.Controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.taboralemu.RocketFitJavaOfficial.Models.ExerciseRecord;
import org.taboralemu.RocketFitJavaOfficial.Services.ExerciseRecordService;

@RequestMapping("api/exerciserecord")
@RestController
public class ExerciseRecordController {
	
	@Autowired
    public ExerciseRecordService _erService;
	
	@PostMapping(value= "/save")
    public void trackUpdatedWorkout(@RequestBody Map<String, Object> exerciseRecord) {
//    	_erService.trackWorkout(exerciseRecord);
		String s = (String) exerciseRecord.get("exercise_name");
		ExerciseRecord er = new ExerciseRecord(
				(int) exerciseRecord.get("auth_id"), 
				(String) exerciseRecord.get("exercise_name"),
				(int) exerciseRecord.get("reps"),
				(int) exerciseRecord.get("sets"),
				((Integer) exerciseRecord.get("weight")).doubleValue(),
				(int) exerciseRecord.get("day"),
				(int) exerciseRecord.get("workoutNum")
				);
		_erService.trackWorkout(er);
    }
    
    @GetMapping(value = "/")
    public List<ExerciseRecord> retrieveAllRecord() {
    	return _erService.retrieveExerciseRecords();
    }
    
    @GetMapping(value = "")
    public double retrieveRecord(@RequestParam String exercise, @RequestParam int day, @RequestParam int workoutNum, @RequestParam int auth) {
    	
    	return _erService.retrieveExerciseRecord(exercise, day, workoutNum, auth);
    }
    
    @GetMapping(value= "/averageweight")
    public double retrieveAverageWeight(@RequestParam String exercise, @RequestParam int auth_id) {
    	return _erService.averageOfWeightInExerciseRecords(exercise, auth_id);
    }

}
