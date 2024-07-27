import styled from "styled-components";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

interface Props {
  sendDataToParent: (data: number) => void;
  current: number;
  increment: number;
}

const AdjusterDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledNumberInput = styled(NumberInput)`
  width: 3em;
`;

const NumberAdjuster = ({ sendDataToParent, current, increment }: Props) => {
  return (
    <>
      <AdjusterDiv>
        <StyledNumberInput
          onChange={(valueString) => sendDataToParent(Number(valueString))}
          defaultValue={current}
          step={increment}
          min={1}
          max={1000}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </StyledNumberInput>
      </AdjusterDiv>
    </>
  );
};

export default NumberAdjuster;
