package org.taboralemu.RocketFitJavaOfficial.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.taboralemu.RocketFitJavaOfficial.Models.Workout;
import org.taboralemu.RocketFitJavaOfficial.Models.WorkoutTemplate;

public interface WorkoutTemplateRepo extends JpaRepository<WorkoutTemplate, Integer>{
	
}
