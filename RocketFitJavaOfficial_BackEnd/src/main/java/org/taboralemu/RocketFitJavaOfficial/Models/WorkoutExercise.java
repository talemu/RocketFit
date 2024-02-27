package org.taboralemu.RocketFitJavaOfficial.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "WorkoutExercise")
public class WorkoutExercise {
	@Id
	private int WorkoutExerciseID;
	private String Days;
	private String Exercises ;
	private String Sets;
	private String Reps;
	private String Rest;
	private int Weeks;
	private int AuthID;
	private int WorkoutNumber;
	private String WorkoutName;

	private WorkoutExercise() {

	}

	public WorkoutExercise(String days, String exercises, String sets, String reps, String rest, int weeks, int authID,
			int workoutNumber, String workoutName) {
		Days = days;
		Exercises = exercises;
		Sets = sets;
		Reps = reps;
		Rest = rest;
		Weeks = weeks;
		AuthID = authID;
		WorkoutNumber = workoutNumber;
		WorkoutName = workoutName;
	}



	public int getWorkoutExerciseID() {
		return WorkoutExerciseID;
	}

	public String getDays() {
		return Days;
	}

	public String getExercises() {
		return Exercises;
	}

	public String getSets() {
		return Sets;
	}

	public String getReps() {
		return Reps;
	}

	public String getRest() {
		return Rest;
	}

	public int getWeeks() {
		return Weeks;
	}

	public int getAuthID() {
		return AuthID;
	}

	public int getWorkoutNumber() {
		return WorkoutNumber;
	}

	public String getWorkoutName() {
		return WorkoutName;
	}

	public void setWorkoutExerciseID(int workoutExerciseID) {
		WorkoutExerciseID = workoutExerciseID;
	}

	public void setDays(String days) {
		Days = days;
	}

	public void setExercises(String exercises) {
		Exercises = exercises;
	}

	public void setSets(String sets) {
		Sets = sets;
	}

	public void setReps(String reps) {
		Reps = reps;
	}

	public void setRest(String rest) {
		Rest = rest;
	}

	public void setWeeks(int weeks) {
		Weeks = weeks;
	}

	public void setAuthID(int authID) {
		AuthID = authID;
	}

	public void setWorkoutNumber(int workoutNumber) {
		WorkoutNumber = workoutNumber;
	}
	
	public void setWorkoutName(String workoutName) {
		WorkoutName = workoutName;
	}

}
