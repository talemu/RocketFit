import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Exercise } from "../services/exerciseService";
import styled from "styled-components";
import NumberAdjuster from "../components/NumberAdjuster";
import { StandardizedWorkoutTemplate } from "../services/workoutTemplateService";

const HeaderOne = styled.h1``;

const HeaderTwo = styled.h2``;

const StyledTable = styled.table``;

const TableBody = styled.tbody``;

const TableHeader = styled.th`
  padding: 1em 2em;
`;

const TableColumn = styled.td`
  text-align: center;
`;

const TableRecord = styled.tr``;

const TableHead = styled.thead``;

const WorkoutsButton = styled.button``;

const StartButton = styled.button``;

const CustomizeWorkout = () => {
  const location = useLocation();
  const workoutData = location.state;
  const [change, setChange] = useState<boolean>(false);

  useEffect(() => {}, [change]);

  const UpdateCurrent = (data: number, count: number, array: number[]) => {
    if (count != -1) {
      array[count] = data;
    } else {
      workoutData[0].weeks = data;
    }
    setChange(!change);
  };

  const AddWorkoutToUser = () => {
    console.log(workoutData[0]);
  };

  return (
    <>
      <WorkoutsButton>
        <Link to="/workouts">Back</Link>
      </WorkoutsButton>
      <HeaderOne>{workoutData[0].workoutName}</HeaderOne>
      <NumberAdjuster
        weeksFlag={true}
        sendDataToParent={(current) =>
          UpdateCurrent(current, -1, workoutData[0].weeks)
        }
        current={workoutData[0].weeks}
      />
      <StyledTable>
        <TableHead>
          <TableRecord>
            <TableHeader>Day</TableHeader>
            <TableHeader>Exercise</TableHeader>
            <TableHeader>Sets</TableHeader>
            <TableHeader>Reps</TableHeader>
            <TableHeader>Rest</TableHeader>
          </TableRecord>
        </TableHead>
        {workoutData[0].day.map((day: number, count: number) => (
          <>
            <TableBody>
              <TableRecord>
                {workoutData[0].day[count] !== workoutData[0].day[count - 1] ? (
                  <TableColumn>{day}</TableColumn>
                ) : (
                  <TableColumn></TableColumn>
                )}

                {
                  <TableColumn>
                    {
                      workoutData[1].find(
                        (element: Exercise) => element.exerciseID === count + 1
                      )?.exerciseName
                    }
                  </TableColumn>
                }
                {
                  <TableColumn>
                    <NumberAdjuster
                      weeksFlag={false}
                      sendDataToParent={(current) =>
                        UpdateCurrent(current, count, workoutData[0].sets)
                      }
                      current={workoutData[0].sets[count]}
                    />{" "}
                  </TableColumn>
                }
                {
                  <TableColumn>
                    <NumberAdjuster
                      weeksFlag={false}
                      sendDataToParent={(current) =>
                        UpdateCurrent(current, count, workoutData[0].reps)
                      }
                      current={workoutData[0].reps[count]}
                    />
                  </TableColumn>
                }
                {
                  <NumberAdjuster
                    weeksFlag={false}
                    sendDataToParent={(current) =>
                      UpdateCurrent(current, count, workoutData[0].rest)
                    }
                    current={workoutData[0].rest[count]}
                  />
                }
              </TableRecord>
            </TableBody>
          </>
        ))}
      </StyledTable>
      <StartButton onClick={AddWorkoutToUser}>Start Workout</StartButton>
    </>
  );
};

export default CustomizeWorkout;
