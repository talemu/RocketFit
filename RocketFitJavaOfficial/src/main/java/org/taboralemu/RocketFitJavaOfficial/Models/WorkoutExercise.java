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
//		private int WorkoutID;
//		private int ExerciseID;
	private int Sets;
	private int Reps;
	private int Rest;
	private double Weight;
	private int auth_id;
	private int WorkoutNumber;

	@ManyToOne
	@JoinColumn(name = "WorkoutID")
	private Workout workout;
	@ManyToOne
	@JoinColumn(name = "ExerciseID")
	private Exercise exercise;

	private WorkoutExercise() {

	}

//		private WorkoutExercise(int weID, int wID, int eID, int s, int r, int res, double w, Workout wo, Exercise e) {
//			setWorkoutExerciseID(weID);
//			setWorkoutID(wID);
//			setExerciseID(eID);
//			setSets(s);
//			setReps(r);
//			setRest(res);
//			setWeight(w);
//			setWorkout(wo);
//			setExercise(e);
//		}

	public int getWorkoutExerciseID() {
		return WorkoutExerciseID;
	}

//		private int getWorkoutID() {
//			return WorkoutID;
//		}
//
//		private int getExerciseID() {
//			return ExerciseID;
//		}

	public int getSets() {
		return Sets;
	}

	public int getReps() {
		return Reps;
	}

	public int getRest() {
		return Rest;
	}

	public double getWeight() {
		return Weight;
	}

	public Workout getWorkout() {
		return workout;
	}

	public Exercise getExercise() {
		return exercise;
	}
	
	public int getAuthId() {
		return auth_id;
	}

	public int getWorkoutNumber() {
		return WorkoutNumber;
	}

	public void setWorkoutExerciseID(int workoutExerciseID) {
		WorkoutExerciseID = workoutExerciseID;
	}

//		private void setWorkoutID(int workoutID) {
//			WorkoutID = workoutID;
//		}
//
//		private void setExerciseID(int exerciseID) {
//			ExerciseID = exerciseID;
//		}

	public void setSets(int sets) {
		Sets = sets;
	}

	public void setReps(int reps) {
		Reps = reps;
	}

	public void setRest(int rest) {
		Rest = rest;
	}

	public void setWeight(double weight) {
		Weight = weight;
	}

	public void setWorkout(Workout workout) {
		this.workout = workout;
	}

	public void setExercise(Exercise exercise) {
		this.exercise = exercise;
	}
	
	public void setAuthId(int id) {
		this.auth_id = id;
		}

	public void setAuth_id(int auth_id) {
		this.auth_id = auth_id;
	}

	public void setWorkoutNumber(int workoutNumber) {
		WorkoutNumber = workoutNumber;
	}
	
	

}
