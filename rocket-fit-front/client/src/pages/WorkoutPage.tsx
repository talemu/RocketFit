import { Link, useLocation, useNavigate } from "react-router-dom";
// import DayTable from "../components/DayTable";
import styled from "styled-components";
import DayTable from "../components/DayTable";
import { useEffect } from "react";

const BackToHomeButton = styled.button`
  background-color: red;
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
  authId: number;
}

const WorkoutPage = ({ authId }: Props) => {
  const Navigate = useNavigate();
  useEffect(() => {
    if (authId == -10) {
      Navigate("/unauthorized");
    }
  });

  const location = useLocation();
  if (location.state !== null) {
    const selectedWorkoutInformation = location.state;
    return (
      <>
        <BackToHomeButton>
          <ButtonLink
            to="/main"
            state={[
              selectedWorkoutInformation[4],
              selectedWorkoutInformation[0],
            ]}
          >
            Home
          </ButtonLink>
        </BackToHomeButton>
        <DayTable
          exerciseItems={selectedWorkoutInformation[1]}
          authId={selectedWorkoutInformation[2]}
          workoutNum={selectedWorkoutInformation[3]}
          week={selectedWorkoutInformation[4]}
        />
      </>
    );
  }
  return <div></div>;
};

export default WorkoutPage;
