package org.taboralemu.RocketFitJavaOfficial.DTOs;

public class ExerciseDTO {

	private int ExerciseID;
	private String ExerciseName;
	

	public ExerciseDTO(int id, String exerciseName) {
		ExerciseID = id;
		ExerciseName = exerciseName;
	}
	
	public int getExerciseId() {
		return this.ExerciseID;
	}

	public String getExerciseName() {
		return ExerciseName;
	}
	
	public void setExerciseId(int id) {
		this.ExerciseID = id;
	}

	public void setExerciseName(String exerciseName) {
		ExerciseName = exerciseName;
	}
	
	
}
