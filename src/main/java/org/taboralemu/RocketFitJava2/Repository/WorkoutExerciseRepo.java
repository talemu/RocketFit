package org.taboralemu.RocketFitJava2.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.taboralemu.RocketFitJava2.Models.WorkoutExercise;

@Repository
public interface WorkoutExerciseRepo extends JpaRepository<WorkoutExercise, Long> {
	
}
