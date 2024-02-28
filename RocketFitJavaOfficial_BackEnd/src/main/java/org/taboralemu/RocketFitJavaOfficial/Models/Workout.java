package org.taboralemu.RocketFitJavaOfficial.Models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="Workout")
public class Workout {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int WorkoutID;
	private int WorkoutDay;
	
//	@OneToMany(mappedBy = "WorkoutExerciseID")
//	private List<WorkoutExercise> WorkoutExercises;

	public Workout() {
    	
    }

//    private Workout(int id, int day, List<WorkoutExercise> wexers) {
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

//	private List<WorkoutExercise> getWorkoutExercises() {
//		return WorkoutExercises;
//	}
//
//	private void setWorkoutExercises(List<WorkoutExercise> workoutExercises) {
//		this.WorkoutExercises = workoutExercises;
//	}


}
