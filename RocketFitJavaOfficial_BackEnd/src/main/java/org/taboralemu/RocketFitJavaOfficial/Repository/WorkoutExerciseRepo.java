package org.taboralemu.RocketFitJavaOfficial.Repository;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Repository;
import org.taboralemu.RocketFitJavaOfficial.Models.ExerciseRecord;
import org.taboralemu.RocketFitJavaOfficial.Models.WorkoutExercise;


public interface WorkoutExerciseRepo extends JpaRepository<WorkoutExercise, Integer> {
	
	@Query("Select we From WorkoutExercise we Where we.auth_id = :id")
	List<WorkoutExercise> findWorkoutsBasedOnAuthId(@Param("id") int id);
	
//findWorkoutBasedOnId Copy minus days
	@Query("SELECT we FROM WorkoutExercise we WHERE we.auth_id = :id AND we.workoutNumber = :workoutNum")
	List<WorkoutExercise> findWorkoutsBasedOnIdandDay(@Param("id") int id, @Param ("workoutNum") int workoutNum);
	
	
//	@Query("SELECT DISTINCT we.WorkoutNumber From WorkoutExercise we")
//	List<Integer> findAllTheDistinctWorkouts();
	
}
