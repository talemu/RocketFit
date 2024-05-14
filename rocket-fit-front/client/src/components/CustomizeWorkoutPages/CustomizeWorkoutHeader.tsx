import { useState } from "react";
import styled from "styled-components";
import NumberAdjuster from "../NumberAdjuster";
import { Input } from "@chakra-ui/react";

const HeaderDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0em 1em;
`;

const NameHeader = styled.h3``;

const WorkoutNameInput = styled(Input)`
  width: 100%;
`;

const EditWorkoutButton = styled.button`
  background-color: red;
  color: white;
  border-radius: 0.5em;

  &:disabled {
    background-color: #cccccc;
    color: black;
  }
`;

const WeeksDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
`;

const WeeksHeader = styled.h3`
  margin-left: 0.5em;
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

  const HandleWorkoutNameEdit = () => {
    if (editWorkoutName) {
      setWorkoutName(editedWorkoutName);
      sendDataToParent(editedWorkoutName, weeks);
    }
    console.log(editedWorkoutName);
    setEditWorkoutName(!editWorkoutName);
  };

  const UpdateWeek = (data: number) => {
    console.log(editedWorkoutName);
    sendDataToParent(workoutName, data);
  };

  return (
    <>
      <NameHeader>Workout Name:</NameHeader>
      <HeaderDiv>
        <WorkoutNameInput
          type="text"
          placeholder={workoutName}
          value={editedWorkoutName}
          disabled={editWorkoutName ? false : true}
          onChange={(event) => {
            setWorkoutName(event.target.value);
          }}
        ></WorkoutNameInput>
        <EditWorkoutButton onClick={HandleWorkoutNameEdit}>
          {editWorkoutName ? "Set" : "Edit"}
        </EditWorkoutButton>
      </HeaderDiv>
      <WeeksDiv>
        <NumberAdjuster
          sendDataToParent={(current) => UpdateWeek(current)}
          current={weeks}
          increment={1}
        />
        <WeeksHeader>Weeks</WeeksHeader>
      </WeeksDiv>
    </>
  );
};

export default CustomizeWorkoutHeader;
