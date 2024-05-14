import styled from "styled-components";
import workoutTemplateService, {
  StandardizedWorkoutTemplate,
  WorkoutTemplate,
  standardizeWorkoutTemplates,
} from "../../services/workoutTemplateService";
import DropdownTable from "../DropdownTable";
import { Exercise } from "../../services/exerciseService";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

const AccordionContainer = styled.div``;

const StyledAccordionItem = styled(AccordionItem)`
  margin-bottom: 1em;
`;

const StyledAccordionButton = styled(AccordionButton)`
  font-size: 1.5em;
  background-color: grey;
  border: 1px solid black;
`;

const StyledAccordionPanel = styled(AccordionPanel)`
  padding: 0.5em 0em 0em em;
  background-color: lightgrey;
  overflow-x: auto;
`;

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
  const [templates, setTemplates] = useState<StandardizedWorkoutTemplate[]>([]);

  useEffect(() => {
    const { request } = workoutTemplateService.getAll("");
    request
      .then((response) => {
        const workoutTemplates =
          response.data as unknown[] as WorkoutTemplate[];
        const standardTemplatesAndDropdowns =
          standardizeWorkoutTemplates(workoutTemplates);
        setTemplates(standardTemplatesAndDropdowns[0]);
        sendDataToParent(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Accordion allowMultiple>
        {templates.map((item, index: number) => (
          <AccordionContainer key={index}>
            <StyledAccordionItem>
              <StyledAccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {item.workoutName}
                </Box>
                <AccordionIcon />
              </StyledAccordionButton>{" "}
              <StyledAccordionPanel pb={4}>
                <DropdownTable
                  item={item}
                  exercises={exercises}
                  numberOfWorkouts={numberOfWorkouts}
                />
              </StyledAccordionPanel>
            </StyledAccordionItem>
          </AccordionContainer>
        ))}
      </Accordion>
    </>
  );
};

export default Templates;
