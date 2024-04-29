import React from "react";
import styled from "styled-components";
import { Exercise } from "../services/exerciseService";
import { Link } from "react-router-dom";

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

const CustomizeButton = styled.button``;

interface Props {
  item: any;
  exercises: Exercise[];
  numberOfWorkouts: number;
}

const DropdownTable = ({ item, exercises, numberOfWorkouts }: Props) => {
  return (
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
        {item.days.map((day: number, count: number) => (
          <>
            <TableBody>
              <TableRecord>
                {item.days[count] !== item.days[count - 1] ? (
                  <TableColumn>{day}</TableColumn>
                ) : (
                  <TableColumn></TableColumn>
                )}

                {
                  <TableColumn>
                    {
                      exercises.find(
                        (element: Exercise) =>
                          element.exerciseId === item.exercises[count]
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
        <Link to="/customize" state={[item, exercises, numberOfWorkouts]}>
          {" "}
          Customize Workout{" "}
        </Link>
      </CustomizeButton>
    </>
  );
};

export default DropdownTable;
