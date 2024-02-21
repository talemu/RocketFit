import React, { useEffect, useState } from "react";
import workoutTemplateService, {
  StandardizedWorkoutTemplate,
  WorkoutTemplate,
} from "../services/workoutTemplateService";
import styled from "styled-components";
import exerciseService, { Exercise } from "../services/exerciseService";
import { Link } from "react-router-dom";

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

const FlipButton = styled.button``;

const CustomizeButton = styled.button``;

const WorkoutsPage = () => {
  const [templates, setTemplates] = useState<StandardizedWorkoutTemplate[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [dropdowns, setDropdowns] = useState<boolean[]>([]);
  const [trigger, setTrigger] = useState<boolean>(false);

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
  }, []);

  const standardizeWorkoutTemplates = (item: WorkoutTemplate[]) => {
    setTemplates([]);
    setDropdowns([]);
    item.forEach((element) => {
      const standardWT = {
        workoutTemplateID: element.workoutTemplateID,
        workoutName: element.workoutName,
        day: [-1],
        exercises: [-1],
        sets: [-1],
        reps: [-1],
        rest: [-1],
        weeks: element.weeks,
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
      setDropdowns([...dropdowns, false]);
    });
  };

  const FlipDrop = (count: number) => {
    setTrigger(!trigger);
    dropdowns[count] = !dropdowns[count];
  };

  const BackButton = styled.button``;

  // return <>{data[0].day}</>;
  return (
    <>
      <BackButton>
        <Link to="/myworkouts">Back</Link>
      </BackButton>
      {templates.map((item, count) => (
        <>
          <HeaderOne>{item.workoutName}</HeaderOne>
          <FlipButton onClick={() => FlipDrop(count)}>flip</FlipButton>
          {dropdowns[count] ? (
            <>
              <HeaderTwo>{item.weeks} Weeks</HeaderTwo>
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
                {item.day.map((day, count) => (
                  <>
                    <TableBody>
                      <TableRecord>
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
                      </TableRecord>
                    </TableBody>
                  </>
                ))}
              </StyledTable>
              <CustomizeButton>
                <Link to="/customize" state={[item, exercises]}>
                  {" "}
                  Customize Workout{" "}
                </Link>
              </CustomizeButton>
            </>
          ) : (
            <div></div>
          )}
        </>
      ))}
    </>
  );
};

export default WorkoutsPage;
