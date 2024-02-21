import { Workout, WorkoutItem } from "../services/workoutExerciseService";
import styled from "styled-components";
import Timer from "./Timer";
import { ChangeEvent, useEffect, useState } from "react";
import exerciseRecordService from "../services/exerciseRecordService";
import exerciseService, { Exercise } from "../services/exerciseService";

interface Props {
  item: WorkoutItem;
  id: number;
  workoutNum: number;
}

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

const TableInput = styled.input`
  text-align: center;
`;

const TableWeightArray = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableWeightArrayItems = styled.div`
  display: flex;
`;

const TableWeightArrayItem = styled.div``;

const DayTable = ({ item, id, workoutNum }: Props) => {
  const [weight, setWeight] = useState<number>(-1);
  const [initial, setInitial] = useState<number>(-1);
  const [weightArray, setWeightArray] = useState<number[]>([]);
  const [isInputDisabled, setInputDisabled] = useState<boolean>(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {}, [isInputDisabled]);

  useEffect(() => {
    const { request } = exerciseService.getAll("/all");

    request.then((response) => {
      setExercises(response.data);
    });
  }, []);

  useEffect(() => {
    const { request } = exerciseRecordService.getAll(
      "/averageweight?exercise=" +
        exercises.find((element) => element.exerciseID === item.exercise)
          ?.exerciseName +
        "&auth_id=" +
        id
    );
    request
      .then((response) => {
        const returned_weight = response.data as unknown as number;
        if (returned_weight === "NaN") {
          setInitial(0);
        } else {
          setInitial(returned_weight * (1 - 0.02 * item.reps));
        }
      })
      .catch((err) => console.log(err));
  }, [exercises]);

  useEffect(() => {}, [weightArray]);

  const UpdateWeightArray = (data: number, start: boolean) => {
    if (start == false) {
      setWeight(data);
      setInputDisabled(true);
    } else {
      setWeightArray([...weightArray, data]);
    }
  };

  return (
    <>
      <StyledTable>
        <TableHead>
          <TableRecord>
            <TableHeader>Exercise</TableHeader>
            <TableHeader>Sets</TableHeader>
            <TableHeader>Reps</TableHeader>
            <TableHeader>Target Weight</TableHeader>
            <TableHeader>Weight(lbs)</TableHeader>
            <TableHeader>Rest</TableHeader>
          </TableRecord>
        </TableHead>
        <TableBody>
          <TableRecord>
            {
              <TableColumn>
                {
                  exercises.find(
                    (element) => element.exerciseID === item.exercise
                  )?.exerciseName
                }
              </TableColumn>
            }
            {<TableColumn>{item.sets}</TableColumn>}
            {<TableColumn>{item.reps}</TableColumn>}
            {<TableColumn>{initial.toFixed(1)}</TableColumn>}
            <TableWeightArray>
              <TableInput
                type="number"
                placeholder={weight == -1 || isNaN(weight) ? "Enter" : weight}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setWeight(parseInt(e.target.value));
                }}
                disabled={isInputDisabled}
              ></TableInput>
              {weightArray.length != 0 ? (
                <>
                  <TableWeightArrayItems>
                    [
                    {weightArray.map((item, count) => (
                      <TableWeightArrayItem>
                        {" "}
                        {count != 0 ? <>,{item}</> : <>{item}</>}
                      </TableWeightArrayItem>
                    ))}
                    ]
                  </TableWeightArrayItems>
                </>
              ) : (
                <div></div>
              )}
            </TableWeightArray>
            <TableColumn>
              <Timer
                id={id}
                initialTimeInSec={2}
                weight={weight}
                sets={item.sets}
                reps={item.reps}
                workout={item}
                workoutNum={workoutNum}
                sendDataToParent={UpdateWeightArray}
              />
            </TableColumn>
          </TableRecord>
        </TableBody>
      </StyledTable>
    </>
  );
};

export default DayTable;
