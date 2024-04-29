import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NumberAdjuster from "../NumberAdjuster";
import { StandardizedWorkoutExercise } from "../../services/workoutExerciseService";

const HeaderDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const HeaderOne = styled.input``;

const EditWorkoutButton = styled.button`
  margin-left: 1em;
`;

interface Props {
  workoutName: string;
  weeks: number;
  sendDataToParent: (workoutName: string, weeks: number) => void;
}

const CustomizeWorkoutHeader = ({
  workoutName,
  weeks,
  sendDataToParent,
}: Props) => {
  const [editWorkoutName, setEditWorkoutName] = useState<boolean>(false);
  const [editedWorkoutName, setWorkoutName] = useState<string>(workoutName);
  const [editedWeeks, setWeeks] = useState<number>(weeks);

  const HandleWorkoutNameEdit = () => {
    if (editWorkoutName) {
      sendDataToParent(editedWorkoutName, weeks);
    }
    setEditWorkoutName(!editWorkoutName);
  };

  const UpdateWeek = (data: number) => {
    setWeeks(data);
    sendDataToParent(workoutName, data);
  };

  return (
    <div>
      <HeaderDiv>
        {editWorkoutName ? (
          <>
            <HeaderOne
              type="input"
              placeholder={workoutName}
              disabled={false}
              onChange={(event) => {
                setWorkoutName(event.target.value);
              }}
            ></HeaderOne>
            <EditWorkoutButton onClick={HandleWorkoutNameEdit}>
              Set
            </EditWorkoutButton>
          </>
        ) : (
          <>
            <HeaderOne
              type="text"
              placeholder={workoutName}
              disabled={true}
            ></HeaderOne>
            <EditWorkoutButton onClick={HandleWorkoutNameEdit}>
              Edit
            </EditWorkoutButton>
          </>
        )}
      </HeaderDiv>
      <NumberAdjuster
        weeksFlag={true}
        sendDataToParent={(current) => UpdateWeek(current)}
        current={weeks}
        increment={1}
      />
    </div>
  );
};

export default CustomizeWorkoutHeader;
