package org.taboralemu.RocketFitJavaOfficial.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.taboralemu.RocketFitJavaOfficial.Models.WorkoutTemplate;
import org.taboralemu.RocketFitJavaOfficial.Services.WorkoutTemplateService;

@RequestMapping("api/workouttemplate")
@RestController
public class WorkoutTemplateController {
	
	@Autowired
	private WorkoutTemplateService _wtService;
	
	@GetMapping("")
	public List<WorkoutTemplate> getWorkoutTemplates() {
		return _wtService.retrieveWorkoutTemplates();
	}
	

}
