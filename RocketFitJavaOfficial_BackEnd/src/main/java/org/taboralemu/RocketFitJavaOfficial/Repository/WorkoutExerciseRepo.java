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
	
//	@Query("SELECT we FROM WorkoutExercise we JOIN Workout w ON we.workout.WorkoutID = w.WorkoutID WHERE we.auth_id = :id AND we.WorkoutNumber = :workoutNum AND we.workout.WorkoutDay >= :day AND we.workout.WorkoutDay < :day + 7")
//	List<WorkoutExercise> findWorkoutsBasedOnId(@Param("id") int id, @Param ("day") int day, @Param ("workoutNum") int workoutNum);
//	
//	@Query("SELECT DISTINCT we.WorkoutNumber From WorkoutExercise we")
//	List<Integer> findAllTheDistinctWorkouts();
	
}
