import { useEffect, useState } from "react";
import styled from "styled-components";
import NumberAdjuster from "../NumberAdjuster";
import AddExerciseModal from "./AddExerciseModal";
import exerciseService, {
  Exercise,
  ExerciseData,
} from "../../services/exerciseService";
import workoutExerciseService, {
  Workout,
} from "../../services/workoutExerciseService";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import React from "react";

//allows for table overflow
const TableWrapper = styled.div`
  overflow-x: scroll;
  width: 100%;
`;

const StyledTable = styled.table``;

const TableBody = styled.tbody``;

const TableHeader = styled.th`
  padding: 0em 0em;
`;

const TableColumn = styled.td`
  text-wrap: nowrap;
  padding-top: 0.5em;
  width: 5em;
`;

const TableRecord = styled.tr`
  margin: 0em;
`;

const DayHeader = styled.thead`
  font-size: 1.5em;
  padding-top: 0.5em;
`;

const DayHeaderH = styled.th``;

const AddAndStart = styled.tr`
  display: flex;
  flex-direction: column;
`;

const TableItem = styled.td``;

const StartButton = styled.button`
  margin: 0.5em;
  background-color: red;
  color: white;
  border-radius: 0.5em;

  &:disabled {
    background-color: #cccccc;
    color: black;
  }
`;

const AddExerciseButton = styled.button`
  background-color: red;
  color: white;
  border-radius: 0.5em;

  &:disabled {
    background-color: #cccccc;
    color: black;
  }
  margin: 1em 0em 0em 0.5em;
`;

const AddDayButton = styled.button`
  background-color: red;
  color: white;
  border-radius: 0.5em;

  &:disabled {
    background-color: #cccccc;
    color: black;
  }
  margin: 1em 0em 0em 2em;
`;

const DeleteExerciseButton = styled.button`
  background-color: red;
  color: white;
  border-radius: 0.5em;

  &:disabled {
    background-color: #cccccc;
    color: black;
  }
`;

interface Props {
  workoutData: any;
  authId: number;
  workoutNum: number;
}

const CustomizeWorkoutTable = ({ workoutData, authId, workoutNum }: Props) => {
  const Navigate = useNavigate();
  const [change, setChange] = useState<boolean>(false);
  const [addExercisePopUpClicked, setAddExercisePopUpClicked] =
    useState<boolean>(false);
  const [itemClickedIndex, setItemClickedIndex] = useState<number>(-1);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [workoutItems, setWorkoutItems] = useState<any>(workoutData);

  const UpdateCurrent = (data: number, count: number, array: number[]) => {
    if (count != -1) {
      array[count] = data;
    } else {
      var workoutDataTemp = workoutItems;
      workoutDataTemp.weeks = data;
      setWorkoutItems(workoutDataTemp);
    }
    setChange(!change);
  };

  useEffect(() => {
    //must rerender the page when new exercise is added and need to pull exercises
    const { request } = exerciseService.getAll("/");
    request
      .then((response) => {
        setExercises(response.data as Exercise[]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [change]);

  const AddWorkoutToUser = () => {
    const proposedWorkout = {
      days: workoutItems.days.join(","),
      exercises: workoutItems.exercises.join(","),
      sets: workoutItems.sets.join(","),
      reps: workoutItems.reps.join(","),
      rest: workoutItems.rest.join(","),
      weeks: workoutItems.weeks,
      authid: authId,
      workoutName: workoutItems.workoutName,
      workoutNumber: workoutNum,
    };
    const { request } = workoutExerciseService.postItem("/", proposedWorkout);
    request
      .then((response) => {
        SendToMainPage(response.data);
      })
      .catch((error) => {
        console.error("Error sending POST request", error);
      });
  };

  const SendToMainPage = (newWorkout: Workout) => {
    const { request } = workoutExerciseService.getAll(
      "/item/?authId=" + authId + "&workoutNum=" + newWorkout.workoutNumber
    );
    request.then((response) => {
      const workout_exercise = response.data as unknown as Workout;
      Navigate("/main", { state: [0, workout_exercise] });
    });
  };

  const HandleModalData = (
    exercise: ExerciseData,
    show: boolean,
    index: number
  ) => {
    if (exercise.exerciseId == 0) {
      setAddExercisePopUpClicked(show);
      return;
    }
    var workoutDataTemp = workoutItems;
    workoutDataTemp.days.splice(index + 1, 0, workoutDataTemp.days[index]);
    workoutDataTemp.exercises.splice(index + 1, 0, exercise.exerciseId);
    workoutDataTemp.sets.splice(index + 1, 0, exercise.sets);
    workoutDataTemp.reps.splice(index + 1, 0, exercise.reps);
    workoutDataTemp.rest.splice(index + 1, 0, exercise.rest);
    setWorkoutItems(workoutDataTemp);
    setAddExercisePopUpClicked(show);
    setChange(!change);
  };

  const ShowModal = (tf: boolean, index: number) => {
    setAddExercisePopUpClicked(tf);
    setItemClickedIndex(index);
  };

  const AddDay = () => {
    var workoutDataTemp = workoutItems;
    if (workoutItems.days.length === 0) {
      workoutDataTemp.days.push(1);
    } else {
      const day = workoutDataTemp.days[workoutDataTemp.days.length - 1] + 1;
      workoutDataTemp.days.push(day);
    }
    workoutDataTemp.exercises.push(2);
    workoutDataTemp.sets.push(3);
    workoutDataTemp.reps.push(12);
    workoutDataTemp.rest.push(120);
    setWorkoutItems(workoutDataTemp);
    setChange(!change);
  };

  const DeleteExercise = (count: number) => {
    var workoutDataTemp = workoutItems;
    //removing record from workoutData
    workoutDataTemp.exercises.splice(count, 1);
    //checks if the day is the last day, if it is, this if statement will be skipped
    if (workoutDataTemp.days.length >= count + 1) {
      //checks if the day matches exercise before and after
      if (
        count != 0 &&
        workoutDataTemp.days[count] !== workoutDataTemp.days[count + 1] &&
        workoutDataTemp.days[count] !== workoutDataTemp.days[count - 1]
      ) {
        {
          let firstSlice = workoutDataTemp.days.slice(0, count + 1);
          let secondSlice = workoutDataTemp.days.slice(count + 1);
          secondSlice = secondSlice.map((day: number) => day - 1);
          workoutDataTemp.days = firstSlice.concat(secondSlice);
        }
        //checks if the day matches the exercise after, when the first element is removed
      } else if (
        count == 0 &&
        workoutDataTemp.days[count] !== workoutDataTemp.days[count + 1]
      ) {
        workoutDataTemp.days = workoutDataTemp.days.map(
          (day: number) => day - 1
        );
      }
    }
    workoutDataTemp.days.splice(count, 1);
    workoutDataTemp.sets.splice(count, 1);
    workoutDataTemp.reps.splice(count, 1);
    workoutDataTemp.rest.splice(count, 1);
    setWorkoutItems(workoutDataTemp);
    setChange(!change);
  };

  return (
    <TableWrapper>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <StyledTable>
            {workoutItems.days.map((day: number, count: number) => (
              <React.Fragment key={count}>
                {workoutItems.days[count] !== workoutItems.days[count - 1] ? (
                  <>
                    <DayHeader>
                      <TableRecord>
                        <DayHeaderH>Day {day}</DayHeaderH>
                      </TableRecord>
                    </DayHeader>
                    <TableBody>
                      <TableRecord className="sticky-header">
                        <TableHeader>Exercise</TableHeader>
                        <TableHeader>Sets</TableHeader>
                        <TableHeader>Reps</TableHeader>
                        <TableHeader>Rest (seconds) </TableHeader>
                        <TableHeader></TableHeader>
                      </TableRecord>
                    </TableBody>
                  </>
                ) : null}
                <TableBody key={count}>
                  <TableRecord>
                    {
                      <TableColumn>
                        {
                          exercises.find(
                            (element: Exercise) =>
                              element.exerciseId ===
                              workoutItems.exercises[count]
                          )?.exerciseName
                        }
                      </TableColumn>
                    }
                    {
                      <TableColumn>
                        <NumberAdjuster
                          sendDataToParent={(current) => {
                            UpdateCurrent(current, count, workoutItems.sets);
                          }}
                          current={workoutItems.sets[count]}
                          increment={1}
                        />{" "}
                      </TableColumn>
                    }
                    {
                      <TableColumn>
                        <NumberAdjuster
                          sendDataToParent={(current) =>
                            UpdateCurrent(current, count, workoutItems.reps)
                          }
                          current={workoutItems.reps[count]}
                          increment={1}
                        />
                      </TableColumn>
                    }
                    <TableColumn>
                      {
                        <NumberAdjuster
                          sendDataToParent={(current) =>
                            UpdateCurrent(current, count, workoutItems.rest)
                          }
                          current={workoutItems.rest[count]}
                          increment={15}
                        />
                      }
                    </TableColumn>
                    <TableColumn>
                      <DeleteExerciseButton
                        onClick={() => DeleteExercise(count)}
                      >
                        X
                      </DeleteExerciseButton>
                    </TableColumn>
                  </TableRecord>
                  {workoutItems.days[count] !== workoutItems.days[count + 1] ? (
                    <AddAndStart>
                      <TableItem>
                        <AddExerciseButton
                          onClick={() => ShowModal(true, count)}
                        >
                          Add Exercise
                        </AddExerciseButton>
                      </TableItem>
                      <TableItem>
                        <AddExerciseModal
                          index={itemClickedIndex}
                          showModal={addExercisePopUpClicked}
                          sendToCustomize={(exercise, show, index) =>
                            HandleModalData(exercise, show, index)
                          }
                        />
                      </TableItem>
                    </AddAndStart>
                  ) : null}
                </TableBody>
              </React.Fragment>
            ))}
          </StyledTable>
          {workoutItems.days[workoutItems.days.length - 1] !== 7 ? (
            <AddDayButton onClick={AddDay}>Add Day</AddDayButton>
          ) : (
            <AddDayButton onClick={AddDay} disabled={true}>
              Add Day
            </AddDayButton>
          )}
          <StartButton onClick={AddWorkoutToUser}>Start Workout</StartButton>{" "}
        </>
      )}
    </TableWrapper>
  );
};

export default CustomizeWorkoutTable;
