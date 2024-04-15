import { Link, useLocation, useNavigate } from "react-router-dom";
// import DayTable from "../components/DayTable";
import styled from "styled-components";
import DayTable from "../components/DayTable";
import { WorkoutItem } from "../services/workoutExerciseService";
import { useEffect } from "react";

const BackToHomeButton = styled.button`
  a {
    text-decoration: none;
    color: black;
  }
`;

interface Props {
  authId: number;
}

const WorkoutPage = ({ authId }: Props) => {
  const Navigate = useNavigate();
  const location = useLocation();
  const selectedWorkoutInformation = location.state;

  useEffect(() => {
    if (authId == -10) {
      Navigate("/unauthorized");
    }
  });

  return (
    <>
      <BackToHomeButton>
        <Link to="/main" state={selectedWorkoutInformation[0]}>
          Home
        </Link>
      </BackToHomeButton>
      <DayTable
        exerciseItems={selectedWorkoutInformation[1]}
        authId={selectedWorkoutInformation[2]}
        workoutNum={selectedWorkoutInformation[3]}
      />
    </>
  );
};

export default WorkoutPage;
