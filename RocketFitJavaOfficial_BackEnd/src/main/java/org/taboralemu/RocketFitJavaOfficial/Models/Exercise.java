package org.taboralemu.RocketFitJavaOfficial.Models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="Exercise")
public class Exercise {
	
	@Id
	private int ExerciseID;
	private String ExerciseName;
	
//	@OneToMany(mappedBy = "WorkoutExerciseID")
//	private List<WorkoutExercise> workoutExercises;
	
	public Exercise() {
		
	}
	
//	private Exercise (int e, String name, List<WorkoutExercise> wexers) {
//		setExerciseID(e);
//		setExerciseName(name);
//		setWorkoutExercises(wexers);
//	}
	
	
	public int getExerciseID() {
		return ExerciseID;
	}
	public String getExerciseName() {
		return ExerciseName;
	}
//	private List<WorkoutExercise> getWorkoutExercises() {
//		return workoutExercises;
//	}
	public void setExerciseID(int exerciseID) {
		ExerciseID = exerciseID;
	}
	public void setExerciseName(String exerciseName) {
		ExerciseName = exerciseName;
	}
//	private void setWorkoutExercises(List<WorkoutExercise> workoutExercises) {
//		this.workoutExercises = workoutExercises;
//	}
	
	
}
