import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  StandardizeWorkouts,
  WorkoutItem,
} from "../services/workoutExerciseService";
import WeekButtons from "../components/WeekButtons";
import Spinner from "../components/Spinner";

interface Props {
  authId: number;
}

const WeekHeader = styled.h1`
  padding: 0em 0em 0em 1em;
`;

const WeekContent = styled.div`
  padding: 0em 0em 0em 1em;
`;

const DayButton = styled.button`
  display: flex;
  flex-direction: column;
  margin: 1em;

  a {
    text-decoration: none;
    color: black;
  }
`;

const MainPage = ({ authId }: Props) => {
  const Navigate = useNavigate();
  const location = useLocation();
  //data incoming from WorkoutPage returning back to main page
  const workout = location.state[1];
  const [week, setWeek] = useState<number>(
    location.state[0] == 0 ? 1 : location.state[0]
  );
  const [workoutArray, setWorkoutArray] = useState<WorkoutItem[]>([]);
  const [isPreviousButtonDisabled, setPreviousButtonDisabled] =
    useState<boolean>(week <= 1);
  const [isNextButtonDisabled, setNextButtonDisabled] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  if (authId == -10) {
    Navigate("/unauthorized");
  }

  useEffect(() => {
    setLoading(true);
    if (authId != -10) {
      setNextButtonDisabled(week >= workout.weeks);
      setWorkoutArray(StandardizeWorkouts(workout, week));
    }
    setPreviousButtonDisabled(week <= 1);
    setLoading(false);
  }, [week]);

  const handleWeekData = (data: number) => {
    setWeek(data);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <WeekHeader>Week {week}</WeekHeader>{" "}
          <WeekContent>
            {[...new Set(workoutArray.map((item) => item.day))].map((item) => (
              <DayButton>
                <Link
                  to="/workout"
                  state={[
                    workout,
                    workoutArray.filter((item2) => item2.day === item),
                    authId,
                    workout.workoutNumber,
                    week,
                  ]}
                >
                  Day {item - (week - 1) * 7}
                </Link>
              </DayButton>
            ))}
          </WeekContent>
        </>
      )}
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
