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
  text-wrap: nowrap;
`;

const TableRecord = styled.tr<{ isDifferentDay: boolean }>`
  border-top: ${(props) => (props.isDifferentDay ? "1px solid black" : "none")};
`;

const TableHead = styled.thead``;

const CustomizeButton = styled.button`
  background-color: #2196f3;
  color: white;
  border-radius: 0.5em;
  margin: 0.5em;

  &:disabled {
    background-color: #cccccc;
    color: black;
  }
`;

const ButtonLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

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
          <TableRecord isDifferentDay={false}>
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
              <TableRecord
                isDifferentDay={
                  item.days[count] !== item.days[count - 1] ? true : false
                }
              >
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
        <ButtonLink to="/customize" state={[item, exercises, numberOfWorkouts]}>
          {" "}
          Customize Workout{" "}
        </ButtonLink>
      </CustomizeButton>
    </>
  );
};

export default DropdownTable;
