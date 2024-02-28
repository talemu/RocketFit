package org.taboralemu.RocketFitJavaOfficial.DTOs;

public class ExerciseRecordDTO {

	private String exercise_name;
	private int sets;
	private int reps;
	private double weight;
	private int auth_id;
	private int day;
	private int workout_number;

	public ExerciseRecordDTO() {

	}

	public ExerciseRecordDTO(String exercise_name, int sets, int reps, double weight, int auth_id, int day,
			int workout_number) {
		setExercise_name(exercise_name);
		setSets(sets);
		setReps(reps);
		setWeight(weight);
		setAuthId(auth_id);
		setDay(day);
		setWorkoutNumber(workout_number);
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
