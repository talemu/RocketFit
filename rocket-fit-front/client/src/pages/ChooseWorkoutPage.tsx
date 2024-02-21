import React, { useEffect, useState } from "react";
import workoutExerciseService, {
  Workout,
} from "../services/workoutExerciseService";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface Props {
  authId: number;
}

const WorkoutButton = styled.button`
  margin: 1em;
`;

const ButtonBreak = styled.br``;

const ChooseWorkoutPage = ({ authId }: Props) => {
  const [workoutNums, setWorkoutsNums] = useState<number[]>([]);
  const [workoutArray, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const { request } = workoutExerciseService.getAll("/id/" + authId);
    request.then((response) => {
      const workouts = response.data as unknown[] as Workout[];
      setWorkouts(workouts);
      setWorkoutsNums(workouts.map((item: Workout) => item.workoutNumber));
    });
  }, []);

  return (
    <>
      {workoutNums?.map((item: number) => (
        <WorkoutButton>
          <Link
            to={"/main"}
            state={workoutArray.find(
              (element) => (element.workoutNumber = item)
            )}
          >
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
