import React, { useState } from "react";
import styled from "styled-components";
import exerciseService, {
  Exercise,
  ExerciseData,
} from "../../services/exerciseService";

interface Props {
  index: number;
  showModal: boolean;
  sendToCustomize: (data: ExerciseData, show: boolean, index: number) => void;
}

const AddExercisePopUp = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 5px;
  width: 50%;
`;

const NewWorkoutItemDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em 0em;
`;

const NewWorkoutItemInput = styled.input`
  width: 100%;
`;

const DropdownExercisesDiv = styled.div<{ isopen: boolean }>`
  display: ${(props) => (props.isopen ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  background-color: #f9f9f9;
  z-index: 1;
  border: 1px solid #ccc;
  border-top: none;
`;

const ExerciseNameDiv = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  margin: 0.5em 0em;
`;

const ExerciseButton = styled.button`
  padding: 0.5em;
  border: none;
  border-bottom: 1px solid #ccc;
  background-color: #f9f9f9;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const CloseButton = styled.button``;

const CreateExerciseButton = styled.button``;

const AddExerciseModal = ({ index, showModal, sendToCustomize }: Props) => {
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseSets, setExerciseSets] = useState(0);
  const [exerciseReps, setExerciseReps] = useState(0);
  const [exerciseRest, setExerciseRest] = useState(0);
  const [dropdownExercises, setDropdownExercises] = useState<Exercise[]>([]);
  const [isopen, setIsopen] = useState<boolean>(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputVariable: string
  ) => {
    if (inputVariable === "exerciseName") {
      const textValue: string = (event.target as HTMLInputElement).value;
      setExerciseName(textValue);
      if (textValue.length > 2) {
        const { request } = exerciseService.getAll(
          "/query/?name=" +
            //formatting to capitalize first letter of each word
            textValue
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")
        );
        request
          .then((response) => {
            setDropdownExercises(response.data as unknown as Exercise[]);
            setIsopen(true);
          })
          .catch((error) => console.log(error));
      } else {
        setIsopen(false);
      }
    } else if (inputVariable === "exerciseSets") {
      const textValue: number = parseInt(
        (event.target as HTMLInputElement).value
      );
      textValue < 0 ? setExerciseSets(0) : setExerciseSets(textValue);
    } else if (inputVariable === "exerciseReps") {
      const textValue: number = parseInt(
        (event.target as HTMLInputElement).value
      );
      textValue < 0 ? setExerciseReps(0) : setExerciseReps(textValue);
    } else if (inputVariable === "exerciseRest") {
      const textValue: number = parseInt(
        (event.target as HTMLInputElement).value
      );
      textValue < 0 ? setExerciseRest(0) : setExerciseRest(textValue);
    }
  };

  const addExerciseToWorkout = () => {
    const { request } = exerciseService.getAll("/item?name=" + exerciseName);
    request
      .then((response) => {
        console.log("hi");
        const exercise = response.data as unknown as Exercise;
        if (
          exerciseName != "" &&
          exerciseReps > 0 &&
          exerciseSets > 0 &&
          exerciseRest > 0
        ) {
          const exerciseItem = {
            exerciseId: exercise.exerciseId,
            sets: exerciseSets,
            reps: exerciseReps,
            rest: exerciseRest,
          };
          sendToCustomize(exerciseItem, false, index);
        }
      })
      .catch((error) => {
        console.log(error);
        if (
          exerciseName != "" &&
          error.response.data["error log"] ==
            "Exercise Does Not Exist with Name"
        ) {
          addExercise();
        }
      });
  };

  //Creates exercise if it doesn't exist
  const addExercise = () => {
    const { request } = exerciseService.postItem("/", {
      //formatting to capitalize first letter of each word
      exerciseName: exerciseName
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" "),
    });
    request
      .then((response) => {
        console.log(response.data);
        addExerciseToWorkout();
      })
      .catch((error) => console.log(error.response.data));
  };

  const HandleUnsavedClose = () => {
    setExerciseName("");
    setExerciseSets(0);
    setExerciseReps(0);
    setExerciseRest(0);
    sendToCustomize({ exerciseId: 0, sets: 0, reps: 0, rest: 0 }, false, index);
  };

  return (
    <>
      <AddExercisePopUp isOpen={showModal}>
        <ModalContent>
          Add Exercise{" "}
          <NewWorkoutItemDiv>
            <ExerciseNameDiv>
              <NewWorkoutItemInput
                type="text"
                value={exerciseName}
                placeholder="Exercise Name"
                onChange={(e) => handleInputChange(e, "exerciseName")}
              />
              <DropdownExercisesDiv isopen={isopen}>
                {dropdownExercises.map((exercise) => (
                  <ExerciseButton
                    key={exercise.exerciseId}
                    onClick={() => {
                      setExerciseName(exercise.exerciseName);
                      setIsopen(false);
                    }}
                  >
                    {exercise.exerciseName}
                  </ExerciseButton>
                ))}
              </DropdownExercisesDiv>
            </ExerciseNameDiv>
            <NewWorkoutItemInput
              type="number"
              value={exerciseSets == 0 ? "" : exerciseSets}
              placeholder="Sets"
              onChange={(e) => handleInputChange(e, "exerciseSets")}
            />
            <NewWorkoutItemInput
              type="number"
              value={exerciseReps == 0 ? "" : exerciseReps}
              placeholder="Reps"
              onChange={(e) => handleInputChange(e, "exerciseReps")}
            />
            <NewWorkoutItemInput
              type="number"
              value={exerciseRest == 0 ? "" : exerciseRest}
              placeholder="Rest Time (seconds)"
              onChange={(e) => handleInputChange(e, "exerciseRest")}
            />
          </NewWorkoutItemDiv>
          <ButtonsDiv>
            <CreateExerciseButton
              onClick={() => {
                addExerciseToWorkout();
              }}
            >
              Create
            </CreateExerciseButton>
            <CloseButton
              onClick={() => {
                HandleUnsavedClose();
              }}
            >
              Close
            </CloseButton>
          </ButtonsDiv>
        </ModalContent>
      </AddExercisePopUp>
    </>
  );
};

export default AddExerciseModal;
