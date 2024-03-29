import React, { useEffect, useState } from "react";
import styled from "styled-components";
import exerciseRecordService from "../services/exerciseRecordService";
import { Workout } from "../services/workoutExerciseService";

interface Props {
  initialTimeInSec: number;
  weight: number;
  sets: number;
  reps: number;
  workout: Workout;
  sendDataToParent: (data: number, start: boolean) => void;
  workoutNum: number;
}

const TimerDiv = styled.div`
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
  initialTimeInSec,
  weight,
  sets,
  reps,
  workout,
  sendDataToParent,
  workoutNum,
}: Props) => {
  const [minutes, setMinutes] = useState(Math.floor(initialTimeInSec / 60));
  const [seconds, setSeconds] = useState(initialTimeInSec % 60);
  const [startFlag, setStartFlag] = useState(false);
  const [isStartDisabled, setStartDisabled] = useState(true);
  const [isResetDisabled, setResetDisabled] = useState(false);
  const [weightArray, setWeightArray] = useState<number[]>([]);
  const [isWorkoutComplete, setWorkoutComplete] = useState<boolean>(false);

  useEffect(() => {
    const { request } = exerciseRecordService.getAll(
      "?exercise=" +
        workout.exercise +
        "&day=" +
        workout.day +
        "&workoutNum=" +
        workoutNum +
        "&auth=" +
        workout.authID
    );

    request
      .then((response) => {
        if (response.data != -1) {
          sendDataToParent(response.data, false);
          setWorkoutComplete(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

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

  const startTimer = () => {
    sendDataToParent(weight, true);
    setWeightArray([...weightArray, weight]);
    setStartFlag(true);
    setStartDisabled(true);
    if (weightArray.length == sets - 1) {
      setResetDisabled(true);
    }
  };

  const resetTimer = () => {
    setStartFlag(false);
    setMinutes(Math.floor(initialTimeInSec / 60));
    setSeconds(initialTimeInSec % 60);
  };

  const completeWorkout = () => {
    const sum = weightArray.reduce((total, num) => total + num, 0);
    const avg = sum / sets;
    const exerciseRecord = {
      exercise_name: workout.exercise,
      sets: sets,
      reps: reps,
      weight: parseFloat(avg.toFixed(1)),
      auth_id: workout.authID,
      day: workout.day,
      workoutNum: workoutNum,
    };
    setWorkoutComplete(true);
    sendDataToParent(parseFloat(avg.toFixed(1)), false);
    const { request } = exerciseRecordService.postItem("/save", exerciseRecord);
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
        <div>Lift Complete</div>
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
              </TimerItemDiv>
            </>
          )}
        </TimerDiv>
      )}
    </>
  );
};

export default Timer;
