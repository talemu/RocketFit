import { Button } from "@chakra-ui/react";
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

const NewPageButton = styled(Button)`
  background-color: #2196f3;
  color: white;
  border-radius: 0.5em;
  margin-right: 1em;

  &:disabled {
    background-color: #cccccc;
    color: black;
  }
`;

const ExitWorkoutButton = styled.button`
  background-color: #2196f3;
  color: white;
  border-radius: 0.5em;
  margin: 2em 0em 0em 2em;
`;

const WeekButtons = ({
  isPreviousButtonDisabled,
  isNextButtonDisabled,
  week,
  sendWeekToParent,
}: Props) => {
  const Navigate = useNavigate();
  console.log(isPreviousButtonDisabled, isNextButtonDisabled);

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
        <NewPageButton
          onClick={PreviousButtonClick}
          isDisabled={isPreviousButtonDisabled}
        >
          {"<<< "}Previous Week
        </NewPageButton>
        <NewPageButton
          onClick={NextButtonClick}
          isDisabled={isNextButtonDisabled}
        >
          Next Week{" >>>"}
        </NewPageButton>
      </WeekButtonDiv>{" "}
      <ExitWorkoutButton onClick={ExitWorkoutClick}>
        Exit Workout
      </ExitWorkoutButton>
    </>
  );
};

export default WeekButtons;
