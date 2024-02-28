package org.taboralemu.RocketFitJavaOfficial.DTOs;

import jakarta.persistence.Id;

public class WorkoutExerciseDTO {

	private String days;
	private String exercises;
	private String sets;
	private String reps;
	private String rest;
	private int weeks;
	private int auth_id;
	private int workoutNumber;
	private String workoutName;

	public WorkoutExerciseDTO() {

	}

	public WorkoutExerciseDTO(String d, String e, String s, String rs, String rt, int w, int aId, int wn, String wNa) {
		setDays(d);
		setExercises(e);
		setSets(s);
		setReps(rs);
		setRest(rt);
		setWeeks(w);
		setAuth_id(aId);
		setWorkoutNumber(wn);
		setWorkoutName(wNa);
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
