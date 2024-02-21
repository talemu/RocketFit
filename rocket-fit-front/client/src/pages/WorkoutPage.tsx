import { Link, useLocation } from "react-router-dom";
// import DayTable from "../components/DayTable";
import styled from "styled-components";
import DayTable from "../components/DayTable";
import { WorkoutItem } from "../services/workoutExerciseService";

const WorkoutPage = () => {
  const location = useLocation();
  const item = location.state;

  const BackToHomeButton = styled.button``;

  return (
    <>
      <Link to="/main" state={item[0]}>
        <BackToHomeButton>Home</BackToHomeButton>
      </Link>
      {item[1].map((item2: WorkoutItem) => (
        <DayTable item={item2} id={item[2]} workoutNum={item[3]} />
      ))}
    </>
  );
};

export default WorkoutPage;
