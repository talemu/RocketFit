import styled from "styled-components";
import { Exercise } from "../../services/exerciseService";
import { Link } from "react-router-dom";

const CreateNewWorkoutDiv = styled.div`
  padding: 3em 0em;
`;

const CreateNewWorkoutButton = styled.button`
  background-color: #2196f3;
  color: white;
  border-radius: 0.5em;
  margin: 0.5em;

  &:disabled {
    background-color: #cccccc;
    color: black;
  }
`;

const ButtonLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

interface Props {
  exercises: Exercise[];
  numberOfWorkouts: number;
}

const CreateFromScratch = ({ exercises, numberOfWorkouts }: Props) => {
  const emptyWorkout = {
    workoutName: "New Workout " + (numberOfWorkouts + 1),
    weeks: 4,
    days: [1],
    exercises: [1],
    sets: [3],
    reps: [12],
    rest: [120],
  };
  return (
    <CreateNewWorkoutDiv>
      <CreateNewWorkoutButton>
        <ButtonLink
          to="/customize"
          state={[emptyWorkout, exercises, numberOfWorkouts]}
        >
          Create From Scratch
        </ButtonLink>
      </CreateNewWorkoutButton>
    </CreateNewWorkoutDiv>
  );
};

export default CreateFromScratch;
