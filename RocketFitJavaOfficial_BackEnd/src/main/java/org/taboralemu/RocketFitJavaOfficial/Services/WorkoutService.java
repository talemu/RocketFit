package org.taboralemu.RocketFitJavaOfficial.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taboralemu.RocketFitJavaOfficial.Models.Workout;
import org.taboralemu.RocketFitJavaOfficial.Repository.WorkoutRepo;

@Service
public class WorkoutService {
    
    @Autowired
    private WorkoutRepo _workoutRepo;
    
    public List<Workout> getAllWorkouts() {
    	return _workoutRepo.findAll();
    }
    
}
