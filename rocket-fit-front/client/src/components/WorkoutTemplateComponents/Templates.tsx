import styled from "styled-components";
import workoutTemplateService, {
  StandardizedWorkoutTemplate,
  WorkoutTemplate,
  standardizeWorkoutTemplates,
} from "../../services/workoutTemplateService";
import DropdownTable from "../DropdownTable";
import { Exercise } from "../../services/exerciseService";
import { useEffect, useState } from "react";

const HeaderOne = styled.h1``;

const StyledTable = styled.table``;

const FlipButton = styled.button``;

interface Props {
  exercises: Exercise[];
  numberOfWorkouts: number;
  sendDataToParent: (loading: boolean) => void;
}

const Templates = ({
  exercises,
  numberOfWorkouts,
  sendDataToParent,
}: Props) => {
  //sendToParent: (loading: boolean) => void;

  const [dropdowns, setDropdowns] = useState<boolean[]>([]);
  const [templates, setTemplates] = useState<StandardizedWorkoutTemplate[]>([]);

  const flipDrop = (count: number) => {
    const newItems = [...dropdowns];
    newItems[count] = !newItems[count];
    setDropdowns(newItems);
  };

  useEffect(() => {
    const { request } = workoutTemplateService.getAll("");
    request
      .then((response) => {
        const workoutTemplates =
          response.data as unknown[] as WorkoutTemplate[];
        const standardTemplatesAndDropdowns =
          standardizeWorkoutTemplates(workoutTemplates);
        setTemplates(standardTemplatesAndDropdowns[0]);
        setDropdowns(standardTemplatesAndDropdowns[1]);
        sendDataToParent(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {}, [dropdowns]);

  return (
    <>
      {templates.map((item, count) => (
        <>
          <HeaderOne>{item.workoutName}</HeaderOne>
          <FlipButton onClick={() => flipDrop(count)}>flip</FlipButton>
          {dropdowns[count] ? (
            <DropdownTable
              item={item}
              exercises={exercises}
              numberOfWorkouts={numberOfWorkouts}
            />
          ) : (
            <StyledTable></StyledTable>
          )}
        </>
      ))}
    </>
  );
};

export default Templates;
