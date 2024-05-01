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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { range } from "../../services/workoutTemplateService";

const StyledTable = styled.table``;

const TableBody = styled.tbody``;

const TableHead = styled.thead``;

const TableHeader = styled.th`
  padding: 1em 2em;
`;

const TableRecord = styled.tr``;

const TableColumn = styled.td`
  text-align: center;
  align-items: center;
`;

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
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [addExercisePopUpClicked, setAddExercisePopUpClicked] =
    useState<boolean>(false);
  const [itemClickedIndex, setItemClickedIndex] = useState<number>(-1);
  const [show, setShow] = useState<boolean>(false);
  const [indices, setIndices] = useState<number[]>(
    range(0, workoutData.days.length - 1)
  );

  workoutData.index = indices;
  console.log(workoutData);

  useEffect(() => {
    const { request } = exerciseService.getAll("");
    request
      .then((response) => {
        const exercises = response.data as unknown[] as Exercise[];
        setExercises(exercises);
        setShow(true);
      })
      .catch((err) => console.log(err));
  }, [change]);

  const UpdateCurrent = (data: number, count: number, array: number[]) => {
    if (count != -1) {
      array[count] = data;
    } else {
      workoutData.weeks = data;
    }
    setChange(!change);
  };

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
    console.log(newWorkout);
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
    workoutData.days.splice(count, 1);
    workoutData.sets.splice(count, 1);
    workoutData.reps.splice(count, 1);
    workoutData.rest.splice(count, 1);
    setChange(!change);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const workoutIndices = Array.from(indices);
    const [reorderedWorkoutItems] = workoutIndices.splice(
      result.source.index,
      1
    );
    workoutIndices.splice(result.destination.index, 0, reorderedWorkoutItems);

    setIndices(workoutIndices);
  };

  return (
    <>
      {show ? (
        <>
          <DragDropContext onDragEnd={handleDragEnd}>
            <StyledTable className="draggable-table">
              <TableHead>
                <TableRecord>
                  <TableHeader>Day</TableHeader>
                  <TableHeader>Exercise</TableHeader>
                  <TableHeader>Sets</TableHeader>
                  <TableHeader>Reps</TableHeader>
                  <TableHeader>Rest (seconds)</TableHeader>
                  <TableHeader></TableHeader>
                </TableRecord>
              </TableHead>
              <TableBody>
                <Droppable droppableId={"table-rows"}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {indices.map((index: number) => (
                        <>
                          <Draggable
                            key={index}
                            draggableId={`row-${index}`}
                            index={index}
                          >
                            {(provided) => (
                              <TableRecord
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {workoutData.days[index] !==
                                workoutData.days[index - 1] ? (
                                  <TableColumn>
                                    {workoutData.days[index]}
                                  </TableColumn>
                                ) : (
                                  <TableColumn></TableColumn>
                                )}
                                {
                                  <TableColumn>
                                    {
                                      exercises.find(
                                        (element: Exercise) =>
                                          element.exerciseId ===
                                          workoutData.exercises[index]
                                      )?.exerciseName
                                    }
                                  </TableColumn>
                                }
                                {
                                  <TableColumn>
                                    <NumberAdjuster
                                      weeksFlag={false}
                                      sendDataToParent={(current) =>
                                        UpdateCurrent(
                                          current,
                                          index,
                                          workoutData.sets
                                        )
                                      }
                                      current={workoutData.sets[index]}
                                      increment={1}
                                    />{" "}
                                  </TableColumn>
                                }
                                {
                                  <TableColumn>
                                    <NumberAdjuster
                                      weeksFlag={false}
                                      sendDataToParent={(current) =>
                                        UpdateCurrent(
                                          current,
                                          index,
                                          workoutData.reps
                                        )
                                      }
                                      current={workoutData.reps[index]}
                                      increment={1}
                                    />
                                  </TableColumn>
                                }
                                <TableColumn>
                                  {
                                    <NumberAdjuster
                                      weeksFlag={false}
                                      sendDataToParent={(current) =>
                                        UpdateCurrent(
                                          current,
                                          index,
                                          workoutData.rest
                                        )
                                      }
                                      current={workoutData.rest[index]}
                                      increment={15}
                                    />
                                  }
                                </TableColumn>
                                <TableColumn>
                                  <DeleteExerciseButton
                                    onClick={() => DeleteExercise(index)}
                                  >
                                    X
                                  </DeleteExerciseButton>
                                </TableColumn>
                              </TableRecord>
                            )}
                          </Draggable>
                          {workoutData.days[index] !==
                          workoutData.days[index + 1] ? (
                            <AddAndStartDiv>
                              <AddExerciseButton
                                onClick={() => ShowModal(true, index)}
                              >
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
                        </>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </TableBody>
              {workoutData.days.length === 0 ? (
                <AddAndStartDiv>
                  <AddExerciseButton onClick={() => ShowModal(true, 0)}>
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
            </StyledTable>
          </DragDropContext>
          <AddDayButton onClick={AddDay}>Add Day</AddDayButton>
          <StartButton onClick={AddWorkoutToUser}>
            Start Workout
          </StartButton>{" "}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CustomizeWorkoutTable;
