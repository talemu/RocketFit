import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Exercise } from "../services/exerciseService";
import styled from "styled-components";
import NumberAdjuster from "../components/NumberAdjuster";
import workoutExerciseService, {
  Workout,
} from "../services/workoutExerciseService";

const HeaderDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const HeaderOne = styled.input``;

const EditWorkoutButton = styled.button`
  margin-left: 1em;
`;

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

interface Props {
  authId: number;
}

const CustomizeWorkout = ({ authId }: Props) => {
  const Navigate = useNavigate();

  const location = useLocation();
  const workoutData = location.state;
  const [change, setChange] = useState<boolean>(false);
  const [editWorkoutName, setEditWorkoutName] = useState<boolean>(false);
  const [workoutName, setWorkoutName] = useState<string>(
    workoutData[0].workoutName
  );

  useEffect(() => {
    if (authId == -10) {
      Navigate("/authorized");
    }
  }, [change]);

  const handleWorkoutNameEdit = () => {
    if (editWorkoutName) {
      workoutData[0].workoutName = workoutName;
    }
    setEditWorkoutName(!editWorkoutName);
  };

  const UpdateCurrent = (data: number, count: number, array: number[]) => {
    if (count != -1) {
      array[count] = data;
    } else {
      workoutData[0].weeks = data;
    }
    setChange(!change);
  };

  const AddWorkoutToUser = () => {
    const proposedWorkout = {
      days: workoutData[0].days.join(","),
      exercises: workoutData[0].exercises.join(","),
      sets: workoutData[0].sets.join(","),
      reps: workoutData[0].reps.join(","),
      rest: workoutData[0].rest.join(","),
      weeks: workoutData[0].weeks,
      authid: authId,
      workoutName: workoutData[0].workoutName,
      workoutNumber: workoutData[2] + 1,
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

  return (
    <>
      <WorkoutsButton>
        <Link to="/workouts">Back</Link>
      </WorkoutsButton>
      <HeaderDiv>
        {editWorkoutName ? (
          <>
            <HeaderOne
              type="text"
              value={workoutName}
              disabled={false}
              onChange={(event) => setWorkoutName(event.target.value)}
            ></HeaderOne>
            <EditWorkoutButton onClick={handleWorkoutNameEdit}>
              Set
            </EditWorkoutButton>
          </>
        ) : (
          <>
            <HeaderOne
              type="text"
              placeholder={workoutData[0].workoutName}
              disabled={true}
            ></HeaderOne>
            <EditWorkoutButton onClick={handleWorkoutNameEdit}>
              Edit
            </EditWorkoutButton>
          </>
        )}
      </HeaderDiv>
      <NumberAdjuster
        weeksFlag={true}
        sendDataToParent={(current) =>
          UpdateCurrent(current, -1, workoutData[0].weeks)
        }
        current={workoutData[0].weeks}
        increment={1}
      />
      <StyledTable>
        <TableHead>
          <TableRecord>
            <TableHeader>Day</TableHeader>
            <TableHeader>Exercise</TableHeader>
            <TableHeader>Sets</TableHeader>
            <TableHeader>Reps</TableHeader>
            <TableHeader>Rest (seconds) </TableHeader>
          </TableRecord>
        </TableHead>
        {workoutData[0].days.map((day: number, count: number) => (
          <>
            <TableBody>
              <TableRecord>
                {workoutData[0].days[count] !==
                workoutData[0].days[count - 1] ? (
                  <TableColumn>{day}</TableColumn>
                ) : (
                  <TableColumn></TableColumn>
                )}

                {
                  <TableColumn>
                    {
                      workoutData[1].find(
                        (element: Exercise) => element.exerciseId === count + 1
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
                      increment={1}
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
                      increment={1}
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
                    increment={15}
                  />
                }
              </TableRecord>
            </TableBody>
          </>
        ))}
      </StyledTable>
      <StartButton onClick={AddWorkoutToUser}>Start Workout</StartButton>{" "}
    </>
  );
};

export default CustomizeWorkout;
