package org.taboralemu.RocketFitJavaOfficial.Repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.taboralemu.RocketFitJavaOfficial.Models.Workout;


public interface WorkoutRepo extends JpaRepository<Workout, Integer> {
}
