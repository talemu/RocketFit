import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface Props {
  isPreviousButtonDisabled: boolean;
  isNextButtonDisabled: boolean;
  week: number;
  sendWeekToParent: (data: number) => void;
}

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

const WeekButtons = ({
  isPreviousButtonDisabled,
  isNextButtonDisabled,
  week,
  sendWeekToParent,
}: Props) => {
  console.log(week);
  const Navigate = useNavigate();

  const PreviousButtonClick = () => {
    localStorage.setItem("savedWeekNumber", JSON.stringify(week - 1));
    sendWeekToParent(week - 1);
  };

  const NextButtonClick = () => {
    localStorage.setItem("savedWeekNumber", JSON.stringify(week + 1));
    sendWeekToParent(week + 1);
  };

  const ExitWorkoutClick = () => {
    Navigate("/myworkouts");
  };

  return (
    <>
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
  );
};

export default WeekButtons;
