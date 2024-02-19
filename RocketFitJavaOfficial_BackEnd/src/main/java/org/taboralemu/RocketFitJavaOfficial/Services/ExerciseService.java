package org.taboralemu.RocketFitJavaOfficial.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taboralemu.RocketFitJavaOfficial.Models.Exercise;
import org.taboralemu.RocketFitJavaOfficial.Repository.ExerciseRepo;

@Service
public class ExerciseService {
	
	@Autowired
	private ExerciseRepo _eRepo;
	
	public Exercise findByExerciseId(Integer id) {
		return _eRepo.findByExerciseId(id);
	}
	
	public List<Exercise> getAllExercises() {
		return _eRepo.findAll();
	}

}
