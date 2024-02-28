package org.taboralemu.RocketFitJavaOfficial.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.taboralemu.RocketFitJavaOfficial.DTOs.ExerciseDTO;
import org.taboralemu.RocketFitJavaOfficial.Models.Exercise;
import org.taboralemu.RocketFitJavaOfficial.Services.ExerciseService;

@RequestMapping("api/exercise")
@RestController
public class ExerciseController {
	
	@Autowired
	private ExerciseService _eService;
	
	@GetMapping(value = "")
	public ExerciseDTO findExerciseBasedOnId(@RequestParam Integer id) throws Exception {
		return _eService.findByExerciseId(id);
	}
	
	@GetMapping(value = "/all")
	public List<ExerciseDTO> getAllExercises() {
		return _eService.getAllExercises();
	}
	
	@PostMapping(value = "")
	public void addExercise(@RequestBody ExerciseDTO exercise) {
		_eService.addExerciseToRepo(exercise);
	}

}
