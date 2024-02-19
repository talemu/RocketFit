import styled from "styled-components";
import Content from "../components/Content";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import workoutExerciseService, {
  Workout,
} from "../services/workoutExerciseService";

interface Props {
  authId: number;
}

const WeekHeader = styled.h1`
  padding: 0em 0em 0em 1em;
`;

const WeekContent = styled.div`
  padding: 0em 0em 0em 1em;
`;

const WeekButtonDiv = styled.div`
  padding: 2em 0em 0em 2em;
`;

const PreviousWeekButton = styled.button`
  margin-right: 1em;
`;

const NextWeekButton = styled.button`
  margin-right: 1em;
`;

const ExitWorkoutButton = styled.button`
  margin: 2em 0em 0em 2em;
`;

const MainPage = ({ authId }: Props) => {
  const Navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState<boolean>(true);
  const [show2, setShow2] = useState<boolean>(false);
  const workout = (location.state != null
    ? location.state
    : JSON.parse(
        localStorage.getItem("savedWorkout") || "{}"
      )) as unknown as Workout;

  const [week, setWeek] = useState<number>(1);

  const [isPreviousButtonDisabled, setIsPreviousButtonDisabled] =
    useState<boolean>(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState<boolean>(
    week >= workout.weeks
  );

  console.log(week);

  useEffect(() => {
    setWeek(
      JSON.parse(localStorage.getItem("savedWeekNumber") || "{}") == "{}"
        ? 1
        : JSON.parse(localStorage.getItem("savedWeekNumber") || "{}")
    );

    setShow2(true);

    if (week >= 2) {
      setIsPreviousButtonDisabled(false);
    } else {
      setIsPreviousButtonDisabled(true);
    }

    if (authId == -1) {
      setShow(false);
    } else {
      if (!show) {
        setWeek(week);
      }
      setShow(true);
    }
    localStorage.setItem("savedWorkout", JSON.stringify(location.state));
  }, [week, workout]);

  useEffect(() => {
    if (week >= workout.weeks) {
      setIsNextButtonDisabled(true);
    } else {
      setIsNextButtonDisabled(false);
    }
  }, [week, isNextButtonDisabled]);

  const PreviousButtonClick = () => {
    localStorage.setItem("savedWeekNumber", JSON.stringify(week - 1));
    setWeek(week - 1);
  };

  const NextButtonClick = () => {
    localStorage.setItem("savedWeekNumber", JSON.stringify(week + 1));
    setWeek(week + 1);
  };

  const ExitWorkoutClick = () => {
    Navigate("/myworkouts");
  };

  // const handleNextButton = (next: boolean) => {
  //   if (next) {
  //     setIsNextButtonDisabled(true);
  //   } else {
  //     setIsNextButtonDisabled(false);
  //   }
  // };

  return (
    <>
      {" "}
      {show2 ? (
        <>
          {" "}
          {show ? (
            <>
              <WeekHeader>Week {week}</WeekHeader>{" "}
              <WeekButtonDiv>
                <PreviousWeekButton
                  onClick={PreviousButtonClick}
                  disabled={isPreviousButtonDisabled}
                >
                  Previous Week{" "}
                </PreviousWeekButton>
                <NextWeekButton
                  onClick={NextButtonClick}
                  disabled={isNextButtonDisabled}
                >
                  Next Week{" "}
                </NextWeekButton>
              </WeekButtonDiv>{" "}
              <ExitWorkoutButton onClick={ExitWorkoutClick}>
                Exit Workout
              </ExitWorkoutButton>
            </>
          ) : (
            <div> Please Login</div>
          )}{" "}
        </>
      ) : (
        <div>One Moment...</div>
      )}
    </>
  );
};

export default MainPage;
