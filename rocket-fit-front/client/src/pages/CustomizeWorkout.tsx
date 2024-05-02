import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomizeWorkoutHeader from "../components/CustomizeWorkoutPages/CustomizeWorkoutHeader";
import CustomizeWorkoutTable from "../components/CustomizeWorkoutPages/CustomizeWorkoutTable";

const WorkoutsButton = styled.button``;

interface Props {
  authId: number;
}

const CustomizeWorkout = ({ authId }: Props) => {
  const Navigate = useNavigate();

  const location = useLocation();
  const workoutData = location.state;
  const [change, setChange] = useState<boolean>(false);

  useEffect(() => {
    if (authId == -10) {
      Navigate("/authorized");
    }
  }, [change]);

  const HandleHeaderChange = (workoutName: string, weeks: number) => {
    console.log(workoutName, weeks);
    workoutData[0].workoutName = workoutName;
    workoutData[0].weeks = weeks;
    setChange(!change);
  };

  return (
    <>
      <WorkoutsButton>
        <Link to="/workouts" state={workoutData[2]}>
          Back
        </Link>
      </WorkoutsButton>
      <CustomizeWorkoutHeader
        workoutName={workoutData[0].workoutName}
        weeks={workoutData[0].weeks}
        sendDataToParent={(workoutName, weeks) => {
          HandleHeaderChange(workoutName, weeks);
        }}
      />
      <CustomizeWorkoutTable
        workoutData={workoutData[0]}
        exercises={workoutData[1]}
        authId={authId}
        workoutNum={workoutData[2] + 1}
      />
    </>
  );
};

export default CustomizeWorkout;
