import { Link, useLocation } from "react-router-dom";
// import DayTable from "../components/DayTable";
import styled from "styled-components";
import DayTable from "../components/DayTable";
import { Workout } from "../services/workoutExerciseService";

const WorkoutPage = () => {
  const location = useLocation();
  const item = location.state;
  console.log(item);

  const BackToHomeButton = styled.button``;

  return (
    <>
      <Link to="/main">
        <BackToHomeButton>Home</BackToHomeButton>
      </Link>
      {item[0]?.map((item2: Workout) => (
        <DayTable item={item2} workoutNum={item[1]} />
      ))}
    </>
  );
};

export default WorkoutPage;
