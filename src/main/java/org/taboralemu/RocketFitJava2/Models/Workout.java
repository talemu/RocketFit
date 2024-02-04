package org.taboralemu.RocketFitJava2.Models;

import java.util.List;

import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="Workout")
public class Workout {
    @Id
    private int WorkoutID;
	private int WorkoutDay;
	
//	@OneToMany(mappedBy = "WorkoutExerciseID")
//	public List<WorkoutExercise> WorkoutExercises;

	public Workout() {
    	
    }

//    public Workout(int id, int day, List<WorkoutExercise> wexers) {
//        setWorkoutID(id);
//        setWorkoutDay(day);
//        setWorkoutExercises(wexers);
//    }

    public int getWorkoutID() {
		return WorkoutID;
	}

	public void setWorkoutID(int workoutID) {
		WorkoutID = workoutID;
	}

	public int getWorkoutDay() {
		return WorkoutDay;
	}

	public void setWorkoutDay(int workoutDay) {
		WorkoutDay = workoutDay;
	}

//	public List<WorkoutExercise> getWorkoutExercises() {
//		return WorkoutExercises;
//	}
//
//	public void setWorkoutExercises(List<WorkoutExercise> workoutExercises) {
//		this.WorkoutExercises = workoutExercises;
//	}


}
