import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomizeWorkoutHeader from "../components/CustomizeWorkoutPages/CustomizeWorkoutHeader";
import CustomizeWorkoutTable from "../components/CustomizeWorkoutPages/CustomizeWorkoutTable";

const ContentDiv = styled.div`
  margin: 0.5em;
`;

const BackButton = styled.button`
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

const CustomizeWorkout = ({ authId }: Props) => {
  const Navigate = useNavigate();
  const [change, setChange] = useState<boolean>(false);
  useEffect(() => {
    if (authId == -10) {
      Navigate("/unauthorized");
    }
  }, [change]);

  const location = useLocation();
  if (location.state !== null) {
    const workoutData = location.state;

    const HandleHeaderChange = (workoutName: string, weeks: number) => {
      workoutData[0].workoutName = workoutName;
      workoutData[0].weeks = weeks;
      setChange(!change);
    };

    return (
      <ContentDiv>
        <BackButton>
          <ButtonLink to="/workouts" state={workoutData[2]}>
            Back
          </ButtonLink>
        </BackButton>
        <CustomizeWorkoutHeader
          workoutName={workoutData[0].workoutName}
          weeks={workoutData[0].weeks}
          sendDataToParent={(workoutName, weeks) => {
            HandleHeaderChange(workoutName, weeks);
          }}
        />
        <CustomizeWorkoutTable
          workoutData={workoutData[0]}
          authId={authId}
          workoutNum={workoutData[2] + 1}
        />
      </ContentDiv>
    );
  }
  return <></>;
};

export default CustomizeWorkout;
