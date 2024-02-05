package org.taboralemu.RocketFitJavaOfficial.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.taboralemu.RocketFitJavaOfficial.Models.ExerciseRecord;
import org.taboralemu.RocketFitJavaOfficial.Models.WorkoutExercise;

public interface ExerciseRecordRepo extends JpaRepository<ExerciseRecord, Integer>{

	@Query("Select e FROM ExerciseRecord e WHERE e.exercise_name = :exercise and e.auth_id = :auth_id")
	List<ExerciseRecord> getAllSpecificExerciseRecords(@Param("exercise") String exercise, @Param ("auth_id") int auth_id);
	
	@Query("Select e FROM ExerciseRecord e WHERE e.exercise_name = :exercise and e.day = :day and e.workout_number = :workoutNum and e.auth_id = :auth_id")
	ExerciseRecord findRecord(@Param("exercise") String exercise, @Param("day") int day, @Param("workoutNum") int workoutNum, @Param("auth_id") int auth_id);
}
