import React, { useEffect, useState } from "react";
import workoutExerciseService from "../services/workoutExerciseService";
import styled from "styled-components";
import { Link } from "react-router-dom";

const WorkoutButton = styled.button`
  margin: 1em;
`;

const ButtonBreak = styled.br``;

const ChooseWorkoutPage = () => {
  const [workoutNums, setWorkoutsNums] = useState<number[]>([]);

  useEffect(() => {
    const { request } = workoutExerciseService.getAll("/workouts");

    request.then((response) => {
      const workout_numbers = response.data as unknown[] as number[];
      setWorkoutsNums(workout_numbers);
    });
  }, []);

  return (
    <>
      {workoutNums?.map((item: number) => (
        <WorkoutButton>
          <Link to={"/main"} state={item}>
            {" "}
            Workout {item}
          </Link>
        </WorkoutButton>
      ))}
      <ButtonBreak />
      <WorkoutButton>
        <Link to={"/workouts"}>Choose New Workout</Link>
      </WorkoutButton>
    </>
  );
};

export default ChooseWorkoutPage;
