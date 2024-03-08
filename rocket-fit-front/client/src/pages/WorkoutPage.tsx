import { Link, useLocation, useNavigate } from "react-router-dom";
// import DayTable from "../components/DayTable";
import styled from "styled-components";
import DayTable from "../components/DayTable";
import { WorkoutItem } from "../services/workoutExerciseService";
import { useEffect } from "react";

const BackToHomeButton = styled.button``;

interface Props {
  authId: number;
}

const WorkoutPage = ({ authId }: Props) => {
  const Navigate = useNavigate();
  const location = useLocation();
  const item = location.state;
  const validAuthIdShow = authId != -10;

  console.log(authId);

  useEffect(() => {
    if (authId == -10) {
      Navigate("/main");
    }
  });

  return (
    <>
      {validAuthIdShow ? (
        <>
          <Link to="/main" state={item[0]}>
            <BackToHomeButton>Home</BackToHomeButton>
          </Link>
          {item[1].map((item2: WorkoutItem) => (
            <DayTable item={item2} id={item[2]} workoutNum={item[3]} />
          ))}
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default WorkoutPage;
