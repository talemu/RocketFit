import styled from "styled-components";
import Content from "../components/Content";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [workoutNum] = useState(
    location.state != null
      ? location.state
      : JSON.parse(localStorage.getItem("savedWorkoutNum") || "{}")
  );

  const [day, setDay] = useState<number>(1);

  const [isPreviousButtonDisabled, setIsPreviousButtonDisabled] =
    useState<boolean>(false);
  const [isNextButtonDisabled, setIsNextButtonDisabled] =
    useState<boolean>(false);

  useEffect(() => {
    setDay(
      JSON.parse(localStorage.getItem("savedDayNumber") || "{}") == "{}"
        ? 1
        : JSON.parse(localStorage.getItem("savedDayNumber") || "{}")
    );

    setShow2(true);

    if (day >= 7) {
      setIsPreviousButtonDisabled(false);
    } else {
      setIsPreviousButtonDisabled(true);
    }

    if (authId == -1) {
      setShow(false);
    } else {
      if (!show) {
        setDay(day);
      }
      setShow(true);
    }
    localStorage.setItem("savedWorkoutNum", JSON.stringify(workoutNum));
  }, [day, workoutNum]);

  const PreviousButtonClick = () => {
    localStorage.setItem("savedDayNumber", JSON.stringify(day - 7));
    setDay(day - 7);
  };

  const NextButtonClick = () => {
    localStorage.setItem("savedDayNumber", JSON.stringify(day + 7));
    setDay(day + 7);
  };

  const ExitWorkoutClick = () => {
    Navigate("/myworkouts");
  };

  const handleNextButton = (next: boolean) => {
    if (next) {
      setIsNextButtonDisabled(true);
    } else {
      setIsNextButtonDisabled(false);
    }
  };

  return (
    <>
      {" "}
      {show2 ? (
        <>
          {" "}
          {show ? (
            <>
              {" "}
              <WeekHeader>Week {Math.ceil(day / 7)}</WeekHeader>
              <WeekContent>
                <Content
                  authId={authId}
                  workoutNumber={workoutNum}
                  startOfTheWeek={day}
                  nextWeekData={handleNextButton}
                />
              </WeekContent>
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
