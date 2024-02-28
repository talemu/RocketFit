package org.taboralemu.RocketFitJavaOfficial.Services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.taboralemu.RocketFitJavaOfficial.DTOs.WorkoutExerciseDTO;
import org.taboralemu.RocketFitJavaOfficial.Models.WorkoutExercise;
import org.taboralemu.RocketFitJavaOfficial.Repository.WorkoutExerciseRepo;

@Service
public class WorkoutExerciseService {
	
	@Autowired
	public WorkoutExerciseRepo _weRepo;
	
	public WorkoutExerciseService (WorkoutExerciseRepo repo) {
		_weRepo = repo;
	}
	
	public List<WorkoutExerciseDTO> findAllWorkouts() {
		CompletableFuture<List<WorkoutExercise>> workouts = CompletableFuture.completedFuture(_weRepo.findAll());
		List<WorkoutExerciseDTO> weDTOList = new ArrayList<WorkoutExerciseDTO>();
		for (WorkoutExercise x : workouts.join()) {
			WorkoutExerciseDTO weTemp = new WorkoutExerciseDTO(
					x.getDays(),
					x.getExercises(),
					x.getSets(),
					x.getReps(),
					x.getRest(),
					x.getWeeks(),
					x.getAuth_id(),
					x.getWorkoutNumber(),
					x.getWorkoutName()
					);
			weDTOList.add(weTemp);
		}
		return weDTOList;
	}
	
	public List<WorkoutExerciseDTO> findWorkoutExerciseByAuthID(int id) {
		CompletableFuture<List<WorkoutExercise>> workouts = CompletableFuture.completedFuture(_weRepo.findWorkoutsBasedOnAuthId(id));
		List<WorkoutExerciseDTO> weDTOList = new ArrayList<WorkoutExerciseDTO>();
		for (WorkoutExercise x : workouts.join()) {
			WorkoutExerciseDTO weTemp = new WorkoutExerciseDTO(
					x.getDays(),
					x.getExercises(),
					x.getSets(),
					x.getReps(),
					x.getRest(),
					x.getWeeks(),
					x.getAuth_id(),
					x.getWorkoutNumber(),
					x.getWorkoutName()
					);
			weDTOList.add(weTemp);
		}
		return weDTOList;
	}
	

	public List<WorkoutExerciseDTO> findWorkoutBasedOnIdandDay(int id, int workoutNum) {
		CompletableFuture<List<WorkoutExercise>> exercises = CompletableFuture.completedFuture(_weRepo.findWorkoutsBasedOnIdandDay(id, workoutNum));
		List<WorkoutExercise> workoutExercises = exercises.join();
		List<WorkoutExerciseDTO> dtos = new ArrayList<WorkoutExerciseDTO>();
		for (int i = 0; i < workoutExercises.size(); i ++) {
			WorkoutExercise current = workoutExercises.get(i);
			dtos.add(new WorkoutExerciseDTO(
					 current.getDays(),
					 current.getExercises(),
					 current.getSets(),
					 current.getReps(),
					 current.getRest(),
					 current.getWeeks(),
					 current.getAuth_id(),
					 current.getWorkoutNumber(),
					 current.getWorkoutName()
					));
		}
		return dtos;
	}
	
	public void addWorkoutExerciseToRepo(WorkoutExerciseDTO workoutexercise) {
		WorkoutExercise weTemp = new WorkoutExercise(
				workoutexercise.getDays(),
				workoutexercise.getExercises(),
				workoutexercise.getSets(),
				workoutexercise.getReps(),
				workoutexercise.getRest(),
				workoutexercise.getWeeks(),
				workoutexercise.getAuth_id(),
				workoutexercise.getWorkoutNumber(),
				workoutexercise.getWorkoutName()
				);
		_weRepo.save(weTemp);
	}
}