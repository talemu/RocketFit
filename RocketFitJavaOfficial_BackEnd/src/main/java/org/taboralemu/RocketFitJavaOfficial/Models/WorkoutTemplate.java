package org.taboralemu.RocketFitJavaOfficial.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "WorkoutTemplate")
public class WorkoutTemplate {
	
	@Id
	private int WorkoutTemplateID;
	private String WorkoutName;
	private String Exercises ;
	private String Sets ;
	private String Reps ;
	private String Rest ;
	private String Day;
	private int Weeks;
	
	
	public WorkoutTemplate() {
		
	}
	
	public int getWorkoutTemplateID() {
		return WorkoutTemplateID;
	}
	public String getWorkoutName() {
		return WorkoutName;
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
	public String getDay() {
		return Day;
	}
	public int getWeeks() {
		return Weeks;
	}
	public void setWorkoutTemplateID(int workoutTemplateID) {
		WorkoutTemplateID = workoutTemplateID;
	}
	public void setWorkoutName(String workoutName) {
		WorkoutName = workoutName;
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
	public void setDay(String day) {
		Day = day;
	}
	public void setWeeks(int weeks) {
		Weeks = weeks;
	}
	
	
	
}
