package org.taboralemu.RocketFitJavaOfficial.DTOs;

public class WorkoutExerciseDTO {

	 private int ID;
	 
	 private int Day; 

	 private String Exercise; 

	 private int Sets;

	 private int Reps;

	 private int Rest;

	 private double Weight;
	 
	 private int AuthID;
	 
	 public WorkoutExerciseDTO(int i, int d, String e, int s, int r, int res, double w, int auId) {
		 setID(i);
		 setDay(d);
		 setExercise(e);
		 setSets(s);
		 setReps(r);
		 setRest(res);
		 setWeight(w);
		 setAuthID(auId);
	 }

	public int getID() {
		return ID;
	}

	public int getDay() {
		return Day;
	}

	public String getExercise() {
		return Exercise;
	}

	public int getSets() {
		return Sets;
	}

	public int getReps() {
		return Reps;
	}

	public int getRest() {
		return Rest;
	}
	
	public int getAuthID() {
		return AuthID;
	}

	public double getWeight() {
		return Weight;
	}

	public void setID(int iD) {
		ID = iD;
	}

	public void setDay(int day) {
		Day = day;
	}

	public void setExercise(String exercise) {
		Exercise = exercise;
	}

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

	public void setAuthID(int authID) {
		AuthID = authID;
	}
	
	
	 
	 
}
