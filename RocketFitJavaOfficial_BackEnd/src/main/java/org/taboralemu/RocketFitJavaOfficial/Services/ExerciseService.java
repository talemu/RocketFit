package org.taboralemu.RocketFitJavaOfficial.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taboralemu.RocketFitJavaOfficial.DTOs.ExerciseDTO;
import org.taboralemu.RocketFitJavaOfficial.Models.Exercise;
import org.taboralemu.RocketFitJavaOfficial.Repository.ExerciseRepo;

@Service
public class ExerciseService {
	
	@Autowired
	private ExerciseRepo _eRepo;
	
	public ExerciseDTO findByExerciseId(Integer id) throws Exception {
		try {
			CompletableFuture<Exercise> exercise = CompletableFuture.completedFuture(_eRepo.findByExerciseId(id));
			ExerciseDTO eTemp = new ExerciseDTO(
					((Exercise) exercise.get()).getExerciseID(),
					((Exercise) exercise.get()).getExerciseName());
			return eTemp;
	}
		catch (Exception e) {
			throw new Exception("id not in exercise list");
		}		
	}
	
	public List<ExerciseDTO> getAllExercises() {
		CompletableFuture<List<Exercise>> exercises = CompletableFuture.completedFuture(_eRepo.findAll());
		List<ExerciseDTO> eDTOs = new ArrayList<ExerciseDTO>();
		for (Exercise e : exercises.join()) {
			ExerciseDTO eTemp = new ExerciseDTO(
					e.getExerciseID(),
					e.getExerciseName());
			eDTOs.add(eTemp);
		}
		return eDTOs;
	}

}
