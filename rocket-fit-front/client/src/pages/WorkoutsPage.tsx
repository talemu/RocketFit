import React, { useEffect, useState } from "react";
import workoutTemplateService, {
  StandardizedWorkoutTemplate,
  WorkoutTemplate,
} from "../services/workoutTemplateService";
import styled from "styled-components";
import exerciseService, { Exercise } from "../services/exerciseService";

const TableBody = styled.tbody``;

const TableHeader = styled.th`
  padding: 1em 2em;
`;

const TableColumn = styled.td`
  text-align: center;
`;

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

const WorkoutsPage = () => {
  const [templates, setTemplates] = useState<StandardizedWorkoutTemplate[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const { request } = workoutTemplateService.getAll("");
    request
      .then((response) => {
        standardizeWorkoutTemplates(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const { request } = exerciseService.getAll("/all");
    request
      .then((response) => {
        setExercises(response.data);
      })
      .catch((err) => console.log(err));
  });

  const standardizeWorkoutTemplates = (item: WorkoutTemplate[]) => {
    setTemplates([]);
    item.forEach((element) => {
      const standardWT = {
        workoutTemplateID: element.workoutTemplateID,
        workoutName: element.workoutName,
        day: [-1],
        exercises: [-1],
        sets: [-1],
        reps: [-1],
        rest: [-1],
      };
      standardWT.day = element.day.split(",").map((item) => parseInt(item, 10));
      standardWT.exercises = element.exercises
        .split(",")
        .map((item) => parseInt(item, 10));
      standardWT.sets = element.sets
        .split(",")
        .map((item) => parseInt(item, 10));
      standardWT.reps = element.reps
        .split(",")
        .map((item) => parseInt(item, 10));
      standardWT.rest = element.rest
        .split(",")
        .map((item) => parseInt(item, 10));
      setTemplates((templates) => [...templates, standardWT]);
    });
  };

  // return <>{data[0].day}</>;
  return (
    <>
      {templates.map((item) => (
        <>
          <h1>{item.workoutName}</h1>
          <table>
            <thead>
              <tr>
                <TableHeader>Day</TableHeader>
                <TableHeader>Exercise</TableHeader>
                <TableHeader>Sets</TableHeader>
                <TableHeader>Reps</TableHeader>
                <TableHeader>Rest</TableHeader>
              </tr>
            </thead>
            {item.day.map((day, count) => (
              <>
                <TableBody>
                  <tr>
                    {item.day[count] !== item.day[count - 1] ? (
                      <TableColumn>{day}</TableColumn>
                    ) : (
                      <TableColumn></TableColumn>
                    )}

                    {
                      <TableColumn>
                        {
                          exercises.find(
                            (element: Exercise) =>
                              element.exerciseID === item.exercises[count]
                          )?.exerciseName
                        }
                      </TableColumn>
                    }
                    {<TableColumn>{item.sets[count]}</TableColumn>}
                    {<TableColumn>{item.reps[count]}</TableColumn>}
                    {<TableColumn>{item.rest[count]}</TableColumn>}
                  </tr>
                </TableBody>
              </>
            ))}
          </table>
        </>
      ))}
    </>
  );
};

export default WorkoutsPage;
