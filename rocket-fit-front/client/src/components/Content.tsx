/* eslint-disable no-debugger */
import { useEffect, useState } from "react";
import workoutService from "../services/workoutExerciseService";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface Props {
  authId: number;
  workoutNumber: number;
  startOfTheWeek: number;
  nextWeekData: (nextWeek: boolean) => void;
}

const Content = ({
  authId,
  workoutNumber,
  startOfTheWeek,
  nextWeekData,
}: Props) => {
  //styling
  const TableDiv = styled.div`
    padding: 1em;
  `;

  const [data, setData] = useState<unknown[]>();

  useEffect(() => {
    const { request } = workoutService.getAll(
      "/" + authId + "?day=" + startOfTheWeek + "&workoutNum=" + workoutNumber
    );
    request
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        const b = [];
        for (let i = 0; i < response.data.length; i++) {
          b.push(false);
        }
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startOfTheWeek]);

  useEffect(() => {
    const nextWeekDay = startOfTheWeek + 7;

    const { request } = workoutService.getAll(
      "/" + authId + "?day=" + nextWeekDay + "&workoutNum=" + workoutNumber
    );
    request
      .then((response) => {
        if (response.data.length == 0) {
          nextWeekData(true);
        } else {
          nextWeekData(false);
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startOfTheWeek]);

  return (
    <>
      {data?.map((item, count) => (
        <TableDiv>
          <Link to="/workout" state={[item, workoutNumber]}>
            Day {count + 1}
          </Link>
        </TableDiv>
      ))}
    </>
  );
};

export default Content;
