package org.taboralemu.RocketFitJavaOfficial.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.taboralemu.RocketFitJavaOfficial.Models.Exercise;

public interface ExerciseRepo extends JpaRepository<Exercise, Long> {
	
	@Query("Select e from Exercise e where e.ExerciseID = :ExerciseID")
	public Exercise findByExerciseId(@Param("ExerciseID") Integer id );
}
