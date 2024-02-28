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
import org.taboralemu.RocketFitJavaOfficial.DTOs.ExerciseRecordDTO;
import org.taboralemu.RocketFitJavaOfficial.Models.ExerciseRecord;
import org.taboralemu.RocketFitJavaOfficial.Services.ExerciseRecordService;

@RequestMapping("api/exerciserecord")
@RestController
public class ExerciseRecordController {
	
	@Autowired
    public ExerciseRecordService _erService;
	
	@PostMapping(value= "")
    public void trackUpdatedWorkout(@RequestBody ExerciseRecordDTO exerciseRecord) {
		_erService.trackWorkout(exerciseRecord);
    }
    
    @GetMapping(value = "/all")
    public List<ExerciseRecordDTO> retrieveAllRecord() {
    	return _erService.retrieveExerciseRecords();
    }
    
    @GetMapping(value = "")
    public double retrieveRecord(@RequestParam String exercise, @RequestParam int day, @RequestParam int workoutNum, @RequestParam int auth_id) {
    	
    	return _erService.retrieveExerciseRecord(exercise, day, workoutNum, auth_id);
    }
    
    @GetMapping(value= "/averageweight")
    public double retrieveAverageWeight(@RequestParam String exercise, @RequestParam int auth_id) {
    	return _erService.averageOfWeightInExerciseRecords(exercise, auth_id);
    }

}
