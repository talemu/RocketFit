import styled from "styled-components";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

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
  const [value, setValue] = useState<number>(current);
  useEffect(() => {
    setValue(current);
  }, [current]);
  return (
    <>
      <AdjusterDiv>
        <StyledNumberInput
          onChange={(valueString) => sendDataToParent(Number(valueString))}
          value={value}
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
