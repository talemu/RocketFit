import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WeekButtons from "../components/MainPageContent/WeekButtons";
import WeekContent from "../components/MainPageContent/WeekContent";

interface Props {
  authId: number;
}

const MainPage = ({ authId }: Props) => {
  const Navigate = useNavigate();
  const location = useLocation();
  //data incoming from WorkoutPage returning back to main page
  const workout = location.state[1];
  const [week, setWeek] = useState<number>(
    location.state[0] == 0 ? 1 : location.state[0]
  );
  const [isPreviousButtonDisabled, setPreviousButtonDisabled] =
    useState<boolean>(week <= 1);
  const [isNextButtonDisabled, setNextButtonDisabled] =
    useState<boolean>(false);

  if (authId == -10) {
    Navigate("/unauthorized");
  }

  const handleWeekData = (data: number) => {
    setWeek(data);
  };

  const handleContentData = (previous: boolean, next: boolean) => {
    setPreviousButtonDisabled(previous);
    setNextButtonDisabled(next);
  };

  return (
    <>
      <WeekContent
        authId={authId}
        week={week}
        workout={workout}
        sendDataToParent={handleContentData}
      />
      <WeekButtons
        isPreviousButtonDisabled={isPreviousButtonDisabled}
        isNextButtonDisabled={isNextButtonDisabled}
        week={week}
        sendWeekToParent={handleWeekData}
      />
    </>
  );
};
export default MainPage;
