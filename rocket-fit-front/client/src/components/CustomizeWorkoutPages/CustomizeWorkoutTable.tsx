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

const StyledTable = styled.table``;

const TableBody = styled.tbody``;

const TableHeader = styled.th`
  padding: 1em 2em;
`;

const TableColumn = styled.td`
  text-align: center;
  align-items: center;
`;

const TableRecord = styled.tr``;

const TableHead = styled.thead``;

const AddAndStartDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StartButton = styled.button`
  margin: 0.5em;
`;

const AddExerciseButton = styled.button`
  margin: 1em 0em 0em 0.5em;
`;

const AddDayButton = styled.button`
  margin: 1em 0em 0em 2em;
`;

const DeleteExerciseButton = styled.button``;

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

  const UpdateCurrent = (data: number, count: number, array: number[]) => {
    if (count != -1) {
      array[count] = data;
    } else {
      workoutData.weeks = data;
    }
    setChange(!change);
  };

  useEffect(() => {
    //must rerender the page when new exercise is added and need to pull exercises
    const { request } = exerciseService.getAll("/");
    request.then((response) => {
      setExercises(response.data as Exercise[]);
    });
  }, [change]);

  const AddWorkoutToUser = () => {
    const proposedWorkout = {
      days: workoutData.days.join(","),
      exercises: workoutData.exercises.join(","),
      sets: workoutData.sets.join(","),
      reps: workoutData.reps.join(","),
      rest: workoutData.rest.join(","),
      weeks: workoutData.weeks,
      authid: authId,
      workoutName: workoutData.workoutName,
      workoutNumber: workoutNum,
    };
    const { request } = workoutExerciseService.postItem("/", proposedWorkout);
    request
      .then((response) => {
        console.log("POST request successful", response.data);
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
    workoutData.days.splice(index + 1, 0, workoutData.days[index]);
    workoutData.exercises.splice(index + 1, 0, exercise.exerciseId);
    workoutData.sets.splice(index + 1, 0, exercise.sets);
    workoutData.reps.splice(index + 1, 0, exercise.reps);
    workoutData.rest.splice(index + 1, 0, exercise.rest);
    setAddExercisePopUpClicked(show);
    setChange(!change);
  };

  const ShowModal = (tf: boolean, index: number) => {
    setAddExercisePopUpClicked(tf);
    setItemClickedIndex(index);
  };

  const AddDay = () => {
    if (workoutData.days.length === 0) {
      workoutData.days.push(1);
    } else {
      const day = workoutData.days[workoutData.days.length - 1] + 1;
      workoutData.days.push(day);
    }
    workoutData.exercises.push(2);
    workoutData.sets.push(3);
    workoutData.reps.push(12);
    workoutData.rest.push(120);
    setChange(!change);
  };

  const DeleteExercise = (count: number) => {
    //removing record from workoutData
    workoutData.exercises.splice(count, 1);
    console.log(workoutData.days.length, count);
    //checks if the day is the last day, if it is, this if statement will be skipped
    if (workoutData.days.length >= count + 1) {
      //checks if the day matches exercise before and after
      if (
        count != 0 &&
        workoutData.days[count] !== workoutData.days[count + 1] &&
        workoutData.days[count] !== workoutData.days[count - 1]
      ) {
        {
          let firstSlice = workoutData.days.slice(0, count + 1);
          let secondSlice = workoutData.days.slice(count + 1);
          secondSlice = secondSlice.map((day: number) => day - 1);
          workoutData.days = firstSlice.concat(secondSlice);
        }
        //checks if the day matches the exercise after, when the first element is removed
      } else if (
        count == 0 &&
        workoutData.days[count] !== workoutData.days[count + 1]
      ) {
        workoutData.days = workoutData.days.map((day: number) => day - 1);
      }
    }
    workoutData.days.splice(count, 1);
    workoutData.sets.splice(count, 1);
    workoutData.reps.splice(count, 1);
    workoutData.rest.splice(count, 1);
    setChange(!change);
  };

  return (
    <>
      <StyledTable>
        <TableHead>
          <TableRecord>
            <TableHeader>Day</TableHeader>
            <TableHeader>Exercise</TableHeader>
            <TableHeader>Sets</TableHeader>
            <TableHeader>Reps</TableHeader>
            <TableHeader>Rest (seconds) </TableHeader>
            <TableHeader></TableHeader>
          </TableRecord>
        </TableHead>
        {workoutData.days.map((day: number, count: number) => (
          <>
            <TableBody>
              <TableRecord>
                {workoutData.days[count] !== workoutData.days[count - 1] ? (
                  <TableColumn>{day}</TableColumn>
                ) : (
                  <TableColumn></TableColumn>
                )}
                {
                  <TableColumn>
                    {
                      exercises.find(
                        (element: Exercise) =>
                          element.exerciseId === workoutData.exercises[count]
                      )?.exerciseName
                    }
                  </TableColumn>
                }
                {
                  <TableColumn>
                    <NumberAdjuster
                      weeksFlag={false}
                      sendDataToParent={(current) =>
                        UpdateCurrent(current, count, workoutData.sets)
                      }
                      current={workoutData.sets[count]}
                      increment={1}
                    />{" "}
                  </TableColumn>
                }
                {
                  <TableColumn>
                    <NumberAdjuster
                      weeksFlag={false}
                      sendDataToParent={(current) =>
                        UpdateCurrent(current, count, workoutData.reps)
                      }
                      current={workoutData.reps[count]}
                      increment={1}
                    />
                  </TableColumn>
                }
                <TableColumn>
                  {
                    <NumberAdjuster
                      weeksFlag={false}
                      sendDataToParent={(current) =>
                        UpdateCurrent(current, count, workoutData.rest)
                      }
                      current={workoutData.rest[count]}
                      increment={15}
                    />
                  }
                </TableColumn>
                <TableColumn>
                  <DeleteExerciseButton onClick={() => DeleteExercise(count)}>
                    X
                  </DeleteExerciseButton>
                </TableColumn>
              </TableRecord>
              {workoutData.days[count] !== workoutData.days[count + 1] ? (
                <AddAndStartDiv>
                  <AddExerciseButton onClick={() => ShowModal(true, count)}>
                    Add Exercise
                  </AddExerciseButton>
                  <AddExerciseModal
                    index={itemClickedIndex}
                    showModal={addExercisePopUpClicked}
                    sendToCustomize={(exercise, show, index) =>
                      HandleModalData(exercise, show, index)
                    }
                  />
                </AddAndStartDiv>
              ) : null}
            </TableBody>
          </>
        ))}
      </StyledTable>
      {workoutData.days[workoutData.days.length - 1] !== 7 ? (
        <AddDayButton onClick={AddDay}>Add Day</AddDayButton>
      ) : (
        <AddDayButton onClick={AddDay} disabled={true}>
          Add Day
        </AddDayButton>
      )}
      <StartButton onClick={AddWorkoutToUser}>Start Workout</StartButton>{" "}
    </>
  );
};

export default CustomizeWorkoutTable;
