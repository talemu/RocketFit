package org.taboralemu.RocketFitJavaOfficial.DTOs;

import jakarta.persistence.Id;

public class WorkoutExerciseDTO {

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
	 
	 public WorkoutExerciseDTO(int weID, String d, String e, String s, String rs, String rt, int w, int aId, int wn, String wNa) {
		 setWorkoutExerciseID(weID);
		 setDays(d);
		 setExercises(e);
		 setSets(s);
		 setReps(rs);
		 setRest(rt);
		 setWeeks(w);
		 setAuthID(aId);
		 setWorkoutNumber(wn);
		 setWorkoutName(wNa);
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
