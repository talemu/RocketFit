import { useEffect, useState } from "react";
import styled from "styled-components";
import exerciseRecordService, {
  ExerciseRecord,
} from "../services/exerciseRecordService";
import { WorkoutItem } from "../services/workoutExerciseService";
import { Exercise } from "../services/exerciseService";
import { CheckIcon } from "@chakra-ui/icons";

interface Props {
  exercises: Exercise[];
  authId: number;
  initialTimeInSec: number;
  weight: number;
  workout: WorkoutItem;
  workoutNum: number;
  sendDataToParent: (
    weight_entered: number,
    target_weight: number,
    start: boolean,
    index: number,
    exercise: number
  ) => void;
  index: number;
}

const LiftCompleteDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1em;
  margin-bottom: 1em;
`;

const TimerDiv = styled.div`
  display: flex;
`;

const TimerItemDiv = styled.div`
  width: 5em;
`;

const TimerText = styled.p`
  font-size: 1em;
`;

const TimerButton = styled.button`
  border-radius: 0.5em;
  background-color: red;
  color: white;

  &:disabled {
    background-color: #cccccc;
    color: black;
  }
`;

const Timer = ({
  exercises,
  authId,
  initialTimeInSec,
  weight,
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
  const [targetWeight, setTargetWeight] = useState<number>(0);
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
        setTargetWeight(exercise_record.targetWeight);
        sendDataToParent(
          exercise_record.weight,
          exercise_record.targetWeight,
          false,
          index,
          0
        );
        setWorkoutComplete(true);
      } else {
        setTargetWeight(0);
      }
    };
    fetchData();
  }, [exercises]);

  //Timer Functionality
  useEffect(() => {
    //enabling start button if weight is entered
    if (weight > 0 && startFlag == false) {
      setStartDisabled(false);
    } else {
      setStartDisabled(true);
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
  }, [startFlag, seconds, weight, isWorkoutComplete]);

  const startTimer = () => {
    sendDataToParent(weight, 0, true, index, workout.exercise);
    setWeightArray([...weightArray, weight]);
    setStartFlag(true);
    setStartDisabled(true);
    setSkipDisabled(false);
    if (weightArray.length == workout.sets - 1) {
      setResetDisabled(true);
    }
  };

  const skipTimer = () => {
    resetTimer();
    setSkipDisabled(true);
    if (weightArray.length == workout.sets) {
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
    const avg =
      weightArray.reduce((total, num) => total + num, 0) / workout.sets;
    const exerciseRecord = {
      exerciseName: exercises.find(
        (element) => element.exerciseId === workout.exercise
      )?.exerciseName,
      sets: workout.sets,
      reps: workout.reps,
      weight: parseFloat(avg.toFixed(1)),
      authId: authId,
      day: workout.day,
      workoutNumber: workoutNum,
      targetWeight: targetWeight,
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
        <LiftCompleteDiv>
          <CheckIcon /> Complete
        </LiftCompleteDiv>
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
                <TimerButton onClick={startTimer} disabled={isStartDisabled}>
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
