package org.taboralemu.RocketFitJavaOfficial.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.taboralemu.RocketFitJavaOfficial.Models.Exercise;
import org.taboralemu.RocketFitJavaOfficial.Services.ExerciseService;

@RequestMapping("api/exercises")
@RestController
public class ExerciseController {
	
	@Autowired
	private ExerciseService _eService;
	
	@GetMapping(value = "")
	public Exercise findExerciseBasedOnId(@RequestParam Integer id) {
		return _eService.findByExerciseId(id);
	}
	
	@GetMapping(value = "/all")
	public List<Exercise> getAllExercises() {
		return _eService.getAllExercises();
	}

}
