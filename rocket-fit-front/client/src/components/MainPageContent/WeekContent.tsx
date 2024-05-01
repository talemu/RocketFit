import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  StandardizeWorkouts,
  WorkoutItem,
} from "../../services/workoutExerciseService";
import Spinner from "../Spinner";

const WeekHeader = styled.h1`
  padding: 0em 0em 0em 1em;
`;

const Content = styled.div`
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

interface Props {
  authId: number;
  week: number;
  workout: any;
  sendDataToParent: (previous: boolean, next: boolean) => void;
}

const WeekContent = ({ authId, week, workout, sendDataToParent }: Props) => {
  //data incoming from WorkoutPage returning back to main page
  const [workoutArray, setWorkoutArray] = useState<WorkoutItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    sendDataToParent(week <= 1, week >= workout.weeks);
    setWorkoutArray(StandardizeWorkouts(workout, week));
    setLoading(false);
  }, [week]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <WeekHeader>Week {week}</WeekHeader>{" "}
          <Content>
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
          </Content>
        </>
      )}
    </>
  );
};

export default WeekContent;
