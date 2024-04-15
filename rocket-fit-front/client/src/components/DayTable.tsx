import { WorkoutItem } from "../services/workoutExerciseService";
import styled from "styled-components";
import Timer from "./Timer";
import { ChangeEvent, useEffect, useState } from "react";
import exerciseRecordService from "../services/exerciseRecordService";
import exerciseService, { Exercise } from "../services/exerciseService";
import Spinner from "./Spinner";

interface Props {
  exerciseItems: WorkoutItem[];
  authId: number;
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

const DayTable = ({ exerciseItems, authId, workoutNum }: Props) => {
  const [weight, setWeight] = useState<number>(-1);
  const [initial, setInitial] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [weightArray, setWeightArray] = useState<number[]>([]);
  const [isInputDisabled, setInputDisabled] = useState<boolean>(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const { request } = exerciseService.getAll("");

    request.then((response) => {
      const exercises = response.data as unknown[] as Exercise[];
      setExercises(exercises);
      getAverageWeights(exercises);
    });
  }, []);

  const getAverageWeights = async (exercises: Exercise[]) => {
    const promises = exerciseItems.map((exerciseItem, index) => {
      return fetchAverageWeight(index, exercises);
    });
    const averageweights = (await Promise.all(promises)) as number[];
    console.log(averageweights);
    //work around to bug where the first average weight returned is the correct averages
    setLoading(false);
    setInitial(averageweights);
  };

  const fetchAverageWeight = async (i: number, exercises: Exercise[]) => {
    return new Promise((resolve, reject) => {
      const { request } = exerciseRecordService.getAll(
        "/averageweight?exercise=" +
          exercises.find(
            (element) => element.exerciseId === exerciseItems[i].exercise
          )?.exerciseName +
          "&auth=" +
          authId
      );
      request
        .then((response) => {
          const returned_weight = Number(response.data) as unknown as number;
          if (isNaN(returned_weight)) {
            resolve(0);
          } else {
            resolve(returned_weight / (1 + 0.02 * exerciseItems[i].reps));
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

  //???
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
        {loading ? (
          <Spinner />
        ) : (
          <>
            <TableBody>
              {exerciseItems.map((exerciseItem, index) => (
                <TableRecord>
                  {
                    <TableColumn>
                      {
                        exercises.find(
                          (element) =>
                            element.exerciseId === exerciseItem.exercise
                        )?.exerciseName
                      }
                    </TableColumn>
                  }
                  {<TableColumn>{exerciseItem.sets}</TableColumn>}
                  {<TableColumn>{exerciseItem.reps}</TableColumn>}
                  {<TableColumn>{initial[index].toFixed(1)}</TableColumn>}
                  <TableWeightArray>
                    <TableInput
                      type="number"
                      placeholder={
                        weight == -1 || isNaN(weight) ? "Enter" : String(weight)
                      }
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
                      authId={authId}
                      initialTimeInSec={2}
                      weight={weight}
                      sets={exerciseItem.sets}
                      reps={exerciseItem.reps}
                      workout={exerciseItem}
                      workoutNum={workoutNum}
                      sendDataToParent={UpdateWeightArray}
                    />
                  </TableColumn>
                </TableRecord>
              ))}
            </TableBody>
          </>
        )}
      </StyledTable>
    </>
  );
};

export default DayTable;
