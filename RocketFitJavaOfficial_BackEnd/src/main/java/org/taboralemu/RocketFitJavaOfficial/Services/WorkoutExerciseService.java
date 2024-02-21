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
	
	public List<WorkoutExercise> findAllWorkouts() {
		CompletableFuture<List<WorkoutExercise>> workouts = CompletableFuture.completedFuture(_weRepo.findAll());
		return workouts.join();
	}
	
	public List<WorkoutExercise> findWorkoutExerciseByAuthID(int id) {
		CompletableFuture<List<WorkoutExercise>> workouts = CompletableFuture.completedFuture(_weRepo.findWorkoutsBasedOnAuthId(id));
		return workouts.join();
	}
	
//	public List<List<WorkoutExerciseDTO>> findAllWorkoutsAsync() {
//		CompletableFuture<List<WorkoutExercise>> exercises = CompletableFuture.completedFuture(_weRepo.findAll());
//		List<WorkoutExercise> workoutExercises = exercises.join();
//		List<WorkoutExerciseDTO> dtos = new ArrayList<WorkoutExerciseDTO>();
//		for (int i = 0; i < workoutExercises.size(); i ++) {
//			WorkoutExercise current = workoutExercises.get(i);
//			dtos.add(new WorkoutExerciseDTO(
//					current.getWorkoutExerciseID(),
//					current.getWorkout().getWorkoutDay(),
//					 current.getExercise().getExerciseName(),
//					 current.getSets(),
//					 current.getReps(),
//					 current.getRest(),
//					 current.getWeight(),
//					 current.getAuthId()
//					));
//		}
//		List<List<WorkoutExerciseDTO>> returnedList = new ArrayList<List<WorkoutExerciseDTO>>();
//		Map<Integer, List<WorkoutExerciseDTO>> groupedByDay = dtos.stream().collect(Collectors.groupingBy(WorkoutExerciseDTO::getDay));
//		for (int key : groupedByDay.keySet()) {
//			List<WorkoutExerciseDTO> temp = new ArrayList<WorkoutExerciseDTO>();
//			for (WorkoutExerciseDTO item : groupedByDay.get(key)) {
//				temp.add(item);
//			}
//			returnedList.add(temp);
//		}
//		return returnedList;
//	}
//	
	
	

	public List<WorkoutExerciseDTO> findWorkoutBasedOnIdandDay(int id, int workoutNum) {
		CompletableFuture<List<WorkoutExercise>> exercises = CompletableFuture.completedFuture(_weRepo.findWorkoutsBasedOnIdandDay(id, workoutNum));
		List<WorkoutExercise> workoutExercises = exercises.join();
		List<WorkoutExerciseDTO> dtos = new ArrayList<WorkoutExerciseDTO>();
		for (int i = 0; i < workoutExercises.size(); i ++) {
			WorkoutExercise current = workoutExercises.get(i);
			dtos.add(new WorkoutExerciseDTO(
					current.getWorkoutExerciseID(),
					 current.getDays(),
					 current.getExercises(),
					 current.getSets(),
					 current.getReps(),
					 current.getRest(),
					 current.getWeeks(),
					 current.getAuthID(),
					 current.getWorkoutNumber(),
					 current.getWorkoutName()
					));
		}
//		List<List<WorkoutExerciseDTO>> returnedList = new ArrayList<List<WorkoutExerciseDTO>>();
//		Map<Integer, List<WorkoutExerciseDTO>> groupedByDay = dtos.stream().collect(Collectors.groupingBy(WorkoutExerciseDTO::getDay));
//		List<Integer> temp2 = new ArrayList<>(groupedByDay.keySet());
//		Collections.sort(temp2);
//		for (int key : temp2) {
//			List<WorkoutExerciseDTO> temp = new ArrayList<WorkoutExerciseDTO>();
//			for (WorkoutExerciseDTO item : groupedByDay.get(key)) {
//				temp.add(item);
//			}
//			returnedList.add(temp);
//		}
		return dtos;
	}

//	
//	public List<WorkoutExercise> findAllWorkouts() {
//		return _weRepo.findAll();
//	}
//	
//	public List<Integer> findAllDistinctWorkouts() {
//		CompletableFuture<List<Integer>> workouts = CompletableFuture.completedFuture(_weRepo.findAllTheDistinctWorkouts());
//		return workouts.join();
//	}

//	private List<WorkoutExercise> getAllWorkoutsExer() {
//		return _weRepo.findAll();
//	}
}