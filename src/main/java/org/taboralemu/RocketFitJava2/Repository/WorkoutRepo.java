package org.taboralemu.RocketFitJava2.Repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.taboralemu.RocketFitJava2.Models.Workout;


public interface WorkoutRepo extends JpaRepository<Workout, Long> {
}
