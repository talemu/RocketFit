package org.taboralemu.RocketFitJava2.Controllers;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.taboralemu.RocketFitJava2.Models.Workout;
import org.taboralemu.RocketFitJava2.Models.WorkoutExercise;
import org.taboralemu.RocketFitJava2.Repository.WorkoutExerciseRepo;
import org.taboralemu.RocketFitJava2.Repository.WorkoutRepo;
import org.taboralemu.RocketFitJava2.Services.WorkoutExerciseService;
import org.taboralemu.RocketFitJava2.Services.WorkoutService;


@RestController

public class WorkoutExerciseController {

    @Autowired
    private WorkoutExerciseService _weService;
    
    @GetMapping
    String getWorkout(Model model) {
        return "localhost running";
    }

    @Async
     @GetMapping(value = "/api/workouts")
     public CompletableFuture<List<WorkoutExercise>> getAllWorkoutsExer() {
         return _weService.getAllWorkoutsExer();
     }
}
