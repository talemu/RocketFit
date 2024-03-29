package org.taboralemu.RocketFitJavaOfficial.Controllers;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.taboralemu.RocketFitJavaOfficial.DTOs.WorkoutExerciseDTO;
import org.taboralemu.RocketFitJavaOfficial.Models.ExerciseRecord;
import org.taboralemu.RocketFitJavaOfficial.Models.Workout;
import org.taboralemu.RocketFitJavaOfficial.Models.WorkoutExercise;
import org.taboralemu.RocketFitJavaOfficial.Repository.WorkoutExerciseRepo;
import org.taboralemu.RocketFitJavaOfficial.Repository.WorkoutRepo;
import org.taboralemu.RocketFitJavaOfficial.Services.ExerciseRecordService;
import org.taboralemu.RocketFitJavaOfficial.Services.WorkoutExerciseService;
import org.taboralemu.RocketFitJavaOfficial.Services.WorkoutService;

@RequestMapping("/api/workoutexercise")
@RestController
public class WorkoutExerciseController {

    @Autowired
    public WorkoutExerciseService _weService;
    
    
    @GetMapping (value = "/launch")
    private String getLocalHostRunning() {
    	return "LocalHost Running";
    }

//     @GetMapping(value = "/api/workouts")
//     private List<WorkoutExercise> getAllWorkoutsExer() throws Exception {
//    	CompletableFuture<List<WorkoutExercise>> returnedList = _weService.getAllWorkoutsExer();
//    	try {
//			return returnedList.get();
//		} catch (Exception e)
//    	{
//			throw e;
//    	}
//     }
    
    @GetMapping(value = "/async")
    public List<List<WorkoutExerciseDTO>> getAllWorkoutsAsync() {
    	return _weService.findAllWorkoutsAsync();
    }
    
    @GetMapping(value = "/async/{id}")
    public List<List<WorkoutExerciseDTO>> getAllWorkoutsById(@PathVariable int id, @RequestParam int day, @RequestParam int workoutNum) {
    	return _weService.findWorkoutBasedOnId(id, day, workoutNum);
    }
    
    @GetMapping(value = "/")
    public List<WorkoutExercise> getAllWorkouts() {
    	return _weService.findAllWorkouts();
    }
    
    @GetMapping(value = "/async/workouts")
    public List<Integer> getAllDistictWorkouts() {
    	return _weService.findAllDistinctWorkouts();
    }
    
    
}
