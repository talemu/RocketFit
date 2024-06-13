import { useState } from "react";
import styled from "styled-components";
import exerciseRecordService, {
  ExerciseRecord,
} from "../../services/exerciseRecordService";
import Spinner from "../Spinner";

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RangeDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderOne = styled.h1``;

const ExerciseNameDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0.5em 0em;
`;

const UserInput = styled.input``;

const ViewProgressButton = styled.button`
  background-color: red;
  color: white;
  border-radius: 0.5em;
  margin: 1em;
`;

const DropdownButton = styled.button`
  border-radius: 0.5em;
  color: black;
  background-color: white;
  border-color: white;
`;

const DropdownExercisesDiv = styled.div<{ isopen: string }>`
  display: ${(props) => (props.isopen == "true" ? "flex" : "none")};
  text-wrap: nowrap;
  flex-direction: column;
  position: absolute;
  margin-top: 1.8em;
  background-color: #f9f9f9;
  z-index: 1;
  border: 1px solid #ccc;
  border-top: none;
  width: 100%;
`;

const ErrorDiv = styled.div`
  background-color: red;
`;

interface Props {
  authId: number;
  sendDataToParent: (records: ExerciseRecord[]) => void;
}

const TrackProgressInputs = ({ authId, sendDataToParent }: Props) => {
  const [exercise, setExercise] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [dropdownExercises, setDropdownExercises] = useState<string[]>([]);
  const [isopen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [spinner, setSpinner] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (field == "exercise") {
      const textValue: string = e.target.value;
      setExercise(e.target.value);
      if (textValue.length > 2) {
        const { request } = exerciseRecordService.getAll(
          "/uniqueERN/?subName=" +
            //formatting to capitalize first letter of each word
            textValue
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ") +
            "&authId=" +
            authId
        );
        request
          .then((response) => {
            setIsOpen(true);
            setDropdownExercises(response.data as string[]);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setDropdownExercises([]);
        setIsOpen(false);
      }
    } else if (field == "start") setStartDate(e.target.value);
    else if (field == "end") setEndDate(e.target.value);
  };

  const handleViewProgress = () => {
    setSpinner(true);
    if (exercise != "" && startDate != "" && endDate != "" && authId != -10) {
      setError("");
      const { request } = exerciseRecordService.getAll(
        "/record/?exerciseName=" +
          exercise +
          "&startDate=" +
          startDate +
          "&endDate=" +
          endDate +
          "&authId=" +
          authId
      );
      request
        .then((response) => {
          if (response.data.length == 0) setError("No Records Found");
          sendDataToParent(response.data as ExerciseRecord[]);
          setSpinner(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setError("Please fill out all fields");
      setSpinner(false);
    }
  };

  const handleDropdownClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setExercise(e.currentTarget.textContent as string);
    setIsOpen(false);
  };

  return (
    <>
      <ContentDiv>
        <HeaderOne>Track Progress</HeaderOne>
        {error.length > 0 ? <ErrorDiv>{error}</ErrorDiv> : null}
        <ExerciseNameDiv>
          <UserInput
            type="text"
            value={exercise}
            placeholder="Enter Exercise"
            onChange={(e) => handleInputChange(e, "exercise")}
          />
          <DropdownExercisesDiv isopen={isopen.toString()}>
            {dropdownExercises.map((item, count: number) => (
              <DropdownButton key={count} onClick={handleDropdownClick}>
                {item}
              </DropdownButton>
            ))}
          </DropdownExercisesDiv>
        </ExerciseNameDiv>
        <RangeDiv>
          <UserInput
            type="date"
            value={startDate}
            placeholder="Enter Start Date"
            onChange={(e) => handleInputChange(e, "start")}
          />
          <UserInput
            type="date"
            value={endDate}
            placeholder="Enter End Date"
            onChange={(e) => handleInputChange(e, "end")}
          />
        </RangeDiv>
        {spinner ? (
          <Spinner />
        ) : (
          <ViewProgressButton onClick={handleViewProgress}>
            View Progress
          </ViewProgressButton>
        )}
      </ContentDiv>
    </>
  );
};

export default TrackProgressInputs;
