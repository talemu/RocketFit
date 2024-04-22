import { WorkoutItem } from "../services/workoutExerciseService";
import styled from "styled-components";
import Timer from "./Timer";
import { ChangeEvent, useEffect, useState } from "react";
import exerciseRecordService, {
  ExerciseRecord,
} from "../services/exerciseRecordService";
import exerciseService, { Exercise } from "../services/exerciseService";
import Spinner from "./Spinner";
import { Dict } from "styled-components/dist/types";

interface Props {
  exerciseItems: WorkoutItem[];
  authId: number;
  workoutNum: number;
  week: number;
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

const DayTable = ({ exerciseItems, authId, workoutNum, week }: Props) => {
  const [initial, setInitial] = useState<number[]>([]);
  const [weight, setWeight] = useState<number[]>(
    new Array(exerciseItems.length).fill(-1)
  );
  const [isInputDisabled, setInputDisabled] = useState<boolean[]>(
    new Array(exerciseItems.length).fill(false)
  );
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //setting keys for the Weight Dictionary
  const keys = exerciseItems.map((exerciseItem) => exerciseItem.exercise);
  const [weightDictionary, setWeightDictionary] = useState<Dict>(
    keys.reduce((acc, key) => ({ ...acc, [key]: [] }), {})
  );

  useEffect(() => {
    const { request } = exerciseService.getAll("");

    //setting the exercises array to the exercises returned from the database
    request.then((response) => {
      const response_exercises = response.data as unknown[] as Exercise[];
      setExercises(response_exercises);
      getAverageWeightsAndSetInitials(response_exercises);
    });
  }, []);

  //fetches the average weight for each exercise for the Target Weight field
  const getAverageWeightsAndSetInitials = async (exercises: Exercise[]) => {
    console.log(exerciseItems);
    const promises = exerciseItems.map((exerciseItem, index) => {
      return new Promise((resolve, reject) => {
        const { request } = exerciseRecordService.getAll(
          "/averageweight?exercise=" +
            exercises.find(
              (element) => element.exerciseId === exerciseItem.exercise
            )?.exerciseName +
            "&auth=" +
            authId
        );
        request
          .then((response) => {
            const returned_weight = Number(response.data) as unknown as number;
            isNaN(returned_weight)
              ? resolve(0)
              : resolve(
                  returned_weight / (1 + 0.02 * exerciseItems[index].reps)
                );
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    });
    const averageweights = (await Promise.all(promises)) as number[];
    setInitial(averageweights);
    //work around to bug where the first average weight returned is the correct averages
    setLoading(false);
  };

  const UpdateWeightArray = (
    weight_entered: number,
    target_weight: number,
    start: boolean,
    index: number,
    exercise: number
  ) => {
    if (!start) {
      //set weight to weight recorded during the workout
      setWeight((prevState) => {
        return prevState.map((value, i) => {
          return i === index ? weight_entered : value;
        });
      });
      //set inital weight to weight recorded the day of the workout
      setInitial((prevState) => {
        return prevState.map((value, i) => {
          return i === index ? target_weight : value;
        });
      });
      //iterates over the input disabled array and disables the input for the index specified
      setInputDisabled((prevState) => {
        return prevState.map((value, i) => {
          return i === index ? true : value;
        });
      });
    } else {
      //set weight array visually showing user progress throughout workout
      setWeightDictionary((prevDictionary) => ({
        ...prevDictionary,
        [exercise]: [...prevDictionary[exercise], weight_entered],
      }));
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
                        weight[index] == -1 || isNaN(weight[index])
                          ? "Enter"
                          : String(weight[index])
                      }
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        //editing weight edited in app
                        const newWeights = [...weight];
                        newWeights[index] = parseInt(e.target.value);
                        setWeight(newWeights);
                      }}
                      disabled={isInputDisabled[index]}
                    ></TableInput>

                    <TableWeightArrayItems>
                      {weightDictionary[exerciseItem.exercise].length != 0 ? (
                        <TableWeightArrayItem>
                          {"[" + weightDictionary[exerciseItem.exercise] + "]"}
                        </TableWeightArrayItem>
                      ) : (
                        <TableWeightArrayItem />
                      )}
                    </TableWeightArrayItems>
                  </TableWeightArray>
                  <TableColumn>
                    <Timer
                      exercises={exercises}
                      authId={authId}
                      //Development time set at 2 sec, will be exerciseItem.rest
                      //initialTimeInSec={exerciseItem.rest}
                      initialTimeInSec={2}
                      weight={weight[index]}
                      workout={exerciseItem}
                      workoutNum={workoutNum}
                      sendDataToParent={UpdateWeightArray}
                      index={index}
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
