package org.taboralemu.RocketFitJavaOfficial.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "WorkoutExercise")
public class WorkoutExercise {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int WorkoutExerciseID;
	private String days;
	private String exercises;
	private String sets;
	private String reps;
	private String rest;
	private int weeks;
	private int auth_id;
	private int workoutNumber;
	private String workoutName;

	private WorkoutExercise() {

	}

	public WorkoutExercise(String days, String exercises, String sets, String reps, String rest, int weeks, int authID,
			int workoutNumber, String workoutName) {
		setDays(days);
		setExercises(exercises);
		setSets(sets);
		setReps(reps);
		setRest(rest);
		setWeeks(weeks);
		setAuth_id(auth_id);
		setWorkoutNumber(workoutNumber);
		setWorkoutName(workoutName);
	}

	public int getWorkoutExerciseID() {
		return WorkoutExerciseID;
	}

	public String getDays() {
		return days;
	}

	public String getExercises() {
		return exercises;
	}

	public String getSets() {
		return sets;
	}

	public String getReps() {
		return reps;
	}

	public String getRest() {
		return rest;
	}

	public int getWeeks() {
		return weeks;
	}

	public int getAuth_id() {
		return auth_id;
	}

	public int getWorkoutNumber() {
		return workoutNumber;
	}

	public String getWorkoutName() {
		return workoutName;
	}

	public void setWorkoutExerciseID(int workoutExerciseID) {
		WorkoutExerciseID = workoutExerciseID;
	}

	public void setDays(String days) {
		this.days = days;
	}

	public void setExercises(String exercises) {
		this.exercises = exercises;
	}

	public void setSets(String sets) {
		this.sets = sets;
	}

	public void setReps(String reps) {
		this.reps = reps;
	}

	public void setRest(String rest) {
		this.rest = rest;
	}

	public void setWeeks(int weeks) {
		this.weeks = weeks;
	}

	public void setAuth_id(int auth_id) {
		this.auth_id = auth_id;
	}

	public void setWorkoutNumber(int workoutNumber) {
		this.workoutNumber = workoutNumber;
	}

	public void setWorkoutName(String workoutName) {
		this.workoutName = workoutName;
	}

}
