import styled from "styled-components";
import Content from "../components/Content";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  StandardizedWorkoutExercise,
  Workout,
  WorkoutItem,
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
  const [workoutArray, setWorkoutArray] = useState<WorkoutItem[]>([]);
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

  useEffect(() => {
    setWeek(
      JSON.parse(localStorage.getItem("savedWeekNumber") || "{}") == "{}"
        ? 1
        : JSON.parse(localStorage.getItem("savedWeekNumber") || "{}")
    );

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
    StandardizeWorkouts(workout);
  }, [week, workout]);

  useEffect(() => {
    setShow2(true);
  }, [workoutArray]);

  useEffect(() => {
    if (week >= workout.weeks) {
      setIsNextButtonDisabled(true);
    } else {
      setIsNextButtonDisabled(false);
    }
  }, [week, isNextButtonDisabled]);

  const StandardizeWorkouts = (item: Workout) => {
    const standardWE = {
      workoutTemplateID: item.workoutExerciseID,
      workoutName: item.workoutName,
      day: [-1],
      exercises: [-1],
      sets: [-1],
      reps: [-1],
      rest: [-1],
      weeks: item.weeks,
    };
    standardWE.day = item.days
      .split(",")
      .map((element) => parseInt(element, 10));
    standardWE.exercises = item.exercises
      .split(",")
      .map((item) => parseInt(item, 10));
    standardWE.sets = item.sets
      .split(",")
      .map((element) => parseInt(element, 10));
    standardWE.reps = item.reps
      .split(",")
      .map((element) => parseInt(element, 10));
    standardWE.rest = item.rest
      .split(",")
      .map((element) => parseInt(element, 10));
    setWorkoutArray(MapStandardWEToWorkoutItems(standardWE));
  };

  const MapStandardWEToWorkoutItems = (
    StandardWE: StandardizedWorkoutExercise
  ) => {
    const newWorkoutItems = StandardWE.day.map(
      (item: number, index: number) => ({
        day: StandardWE.day[index],
        exercise: StandardWE.exercises[index],
        sets: StandardWE.sets[index],
        reps: StandardWE.reps[index],
        rest: StandardWE.rest[index],
      })
    );

    return newWorkoutItems;
  };

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

  return (
    <>
      {" "}
      {show2 ? (
        <>
          {" "}
          {show ? (
            <>
              <WeekHeader>Week {week}</WeekHeader>{" "}
              {[...new Set(workoutArray.map((item) => item.day))].map(
                (item) => (
                  <Link
                    to="/workout"
                    state={[
                      workout,
                      workoutArray.filter((item2) => item2.day === item),
                      authId,
                      workout.workoutNumber,
                    ]}
                  >
                    <WeekContent> Day {item} </WeekContent>
                  </Link>
                )
              )}
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
