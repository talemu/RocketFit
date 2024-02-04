package org.taboralemu.RocketFitJava2.Services;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.taboralemu.RocketFitJava2.Models.WorkoutExercise;
import org.taboralemu.RocketFitJava2.Repository.WorkoutExerciseRepo;

@Service
public class WorkoutExerciseService {
	
	@Autowired
	private WorkoutExerciseRepo _weRepo;
	
	public WorkoutExerciseService (WorkoutExerciseRepo repo) {
		_weRepo = repo;
	}
	
	@Async
	public CompletableFuture<List<WorkoutExercise>> getAllWorkoutsExer() {
		CompletableFuture<List<WorkoutExercise>> future = new CompletableFuture<>();
		try {
			future.complete(_weRepo.findAll());
		}
		catch (Exception  e) {
			future.completeExceptionally(e);
		}
		return future;
	}

}
