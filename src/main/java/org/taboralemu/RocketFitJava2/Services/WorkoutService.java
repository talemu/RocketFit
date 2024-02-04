package org.taboralemu.RocketFitJava2.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taboralemu.RocketFitJava2.Models.Workout;
import org.taboralemu.RocketFitJava2.Repository.WorkoutRepo;

@Service
public class WorkoutService {
    
    @Autowired
    private WorkoutRepo _workoutRepo;
    
    public List<Workout> getAllWorkouts() {
    	return _workoutRepo.findAll();
    }
    
}
