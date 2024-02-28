package org.taboralemu.RocketFitJavaOfficial.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ExerciseRecord")
public class ExerciseRecord {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	private String exercise_name;
	private int sets;
	private int reps;
	private double weight;
	private int auth_id;
	private int day;
	private int workout_number;
	
	public ExerciseRecord() {
		
	}

	public ExerciseRecord(String eName, int s, int r, double w, int aID, int d, int wn) {
		setExercise_name(eName);
		setSets(s);
		setReps(r);
		setWeight(w);
		setAuthId(aID);
		setDay(d);
		setWorkoutNumber(wn);
	}

	public int getId() {
		return id;
	}

	public String getExercise_name() {
		return exercise_name;
	}

	public int getSets() {
		return sets;
	}

	public int getReps() {
		return reps;
	}

	public double getWeight() {
		return weight;
	}

	public int getAuthId() {
		return auth_id;
	}
	
	public int getDay() {
		return day;
	}

	public int getWorkoutNumber() {
		return workout_number;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setExercise_name(String exercise_name) {
		this.exercise_name = exercise_name;
	}

	public void setSets(int sets) {
		this.sets = sets;
	}

	public void setReps(int reps) {
		this.reps = reps;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public void setAuthId(int id) {
		this.auth_id = id;
	}
	
	public void setDay(int day) {
		this.day = day;
	}
	
	public void setWorkoutNumber(int workoutNumber) {
		this.workout_number = workoutNumber;
	}

}
