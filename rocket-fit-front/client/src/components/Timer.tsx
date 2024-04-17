import { useEffect, useState } from "react";
import styled from "styled-components";
import exerciseRecordService, {
  ExerciseRecord,
} from "../services/exerciseRecordService";
import { WorkoutItem } from "../services/workoutExerciseService";
import exerciseService, { Exercise } from "../services/exerciseService";

interface Props {
  exercises: Exercise[];
  authId: number;
  initialTimeInSec: number;
  weight: number;
  sets: number;
  reps: number;
  workout: WorkoutItem;
  workoutNum: number;
  sendDataToParent: (
    weight_entered: number,
    target_weigth: number,
    start: boolean,
    index: number,
    exercise: number
  ) => void;
  index: number;
}

const LiftCompleteDiv = styled.div`
  margin-bottom: 1em;
`;

const TimerDiv = styled.div`
  margin-bottom: 0.5em;
  display: flex;
`;

const TimerItemDiv = styled.div`
  width: 5em;
`;

const TimerText = styled.p`
  font-size: 1em;
`;

const TimerButton = styled.button``;

const Timer = ({
  exercises,
  authId,
  initialTimeInSec,
  weight,
  sets,
  reps,
  workout,
  workoutNum,
  sendDataToParent,
  index,
}: Props) => {
  const [minutes, setMinutes] = useState(Math.floor(initialTimeInSec / 60));
  const [seconds, setSeconds] = useState(initialTimeInSec % 60);
  const [startFlag, setStartFlag] = useState(false);
  const [isStartDisabled, setStartDisabled] = useState(true);
  const [isResetDisabled, setResetDisabled] = useState(false);
  const [isSkipDisabled, setSkipDisabled] = useState(true);
  const [weightArray, setWeightArray] = useState<number[]>([]);
  const [isWorkoutComplete, setWorkoutComplete] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const response2 = await exerciseRecordService.getAll(
        "/item?exercise=" +
          exercises.find(
            (element: Exercise) => element.exerciseId === workout.exercise
          )?.exerciseName +
          "&day=" +
          workout.day +
          "&workoutNum=" +
          workoutNum +
          "&auth=" +
          authId
      ).request;

      const exercise_record_value = response2.data;

      if (!(typeof exercise_record_value == "number")) {
        const exercise_record =
          exercise_record_value[0] as unknown as ExerciseRecord;
        sendDataToParent(
          exercise_record.weight,
          exercise_record.targetWeight,
          false,
          index,
          0
        );
        setWorkoutComplete(true);
      }
    };
    fetchData();
  }, [exercises]);

  //Timer Functionality
  useEffect(() => {
    if (weight <= 0) {
      setStartDisabled(true);
    } else if (isNaN(weight)) {
      setStartDisabled(true);
    } else if (startFlag == true) {
      setStartDisabled(true);
    } else {
      setStartDisabled(false);
    }
    if (startFlag) {
      const interval = setInterval(() => {
        // eslint-disable-next-line no-debugger
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [startFlag, seconds, weight, isStartDisabled, isWorkoutComplete]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    console.log(event.key);
  };

  const startTimer = () => {
    sendDataToParent(weight, 0, true, index, workout.exercise);
    setWeightArray([...weightArray, weight]);
    setStartFlag(true);
    setStartDisabled(true);
    setSkipDisabled(false);
    if (weightArray.length == sets - 1) {
      setResetDisabled(true);
    }
  };

  const skipTimer = () => {
    resetTimer();
    setSkipDisabled(true);
    if (weightArray.length == sets) {
      setResetDisabled(true);
      setSeconds(0);
      setMinutes(0);
    }
  };

  const resetTimer = () => {
    setStartFlag(false);
    setSkipDisabled(true);
    setMinutes(Math.floor(initialTimeInSec / 60));
    setSeconds(initialTimeInSec % 60);
  };

  const completeWorkout = () => {
    const sum = weightArray.reduce((total, num) => total + num, 0);
    const avg = sum / sets;
    const exerciseRecord = {
      exerciseName: exercises.find(
        (element) => element.exerciseId === workout.exercise
      )?.exerciseName,
      sets: sets,
      reps: reps,
      weight: parseFloat(avg.toFixed(1)),
      authId: authId,
      day: workout.day,
      workoutNumber: workoutNum,
    };
    console.log(exerciseRecord);
    setWorkoutComplete(true);
    sendDataToParent(parseFloat(avg.toFixed(1)), 0, false, index, 0);
    const { request } = exerciseRecordService.postItem("/", exerciseRecord);
    request
      .then((response) => {
        console.log(response);
        console.log("POST request successful", response.data);
      })
      .catch((error) => {
        console.error("Error sending POST request", error);
      });
  };

  return (
    <>
      {isWorkoutComplete ? (
        <LiftCompleteDiv>Lift Complete</LiftCompleteDiv>
      ) : (
        <TimerDiv>
          {minutes === 0 && seconds === 0 ? (
            <>
              <TimerItemDiv>
                <TimerText>TIME!!</TimerText>
              </TimerItemDiv>
              <TimerItemDiv>
                <TimerButton onClick={resetTimer} disabled={isResetDisabled}>
                  reset
                </TimerButton>
              </TimerItemDiv>
              {isResetDisabled ? (
                <TimerItemDiv>
                  <TimerButton onClick={completeWorkout}>
                    Complete Exercise
                  </TimerButton>
                </TimerItemDiv>
              ) : (
                <div></div>
              )}
            </>
          ) : (
            <>
              <TimerItemDiv>
                <TimerText>
                  {" "}
                  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </TimerText>
              </TimerItemDiv>
              <TimerItemDiv>
                <TimerButton
                  onClick={startTimer}
                  onKeyDown={handleKeyDown}
                  disabled={isStartDisabled}
                >
                  start
                </TimerButton>
                {!isSkipDisabled ? (
                  <TimerButton onClick={skipTimer} disabled={isSkipDisabled}>
                    skip
                  </TimerButton>
                ) : (
                  <div></div>
                )}
              </TimerItemDiv>
            </>
          )}
        </TimerDiv>
      )}
    </>
  );
};

export default Timer;
