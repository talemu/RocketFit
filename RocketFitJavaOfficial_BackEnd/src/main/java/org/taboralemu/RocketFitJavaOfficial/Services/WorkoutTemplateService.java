package org.taboralemu.RocketFitJavaOfficial.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taboralemu.RocketFitJavaOfficial.Models.WorkoutTemplate;
import org.taboralemu.RocketFitJavaOfficial.Repository.WorkoutTemplateRepo;

@Service
public class WorkoutTemplateService {
	
	@Autowired
	private WorkoutTemplateRepo _wtRepo;
	
	public List<WorkoutTemplate> retrieveWorkoutTemplates() {
		return _wtRepo.findAll();
	}

}
