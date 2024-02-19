import React from "react";
import styled from "styled-components";

interface Props {
  weeksFlag: boolean;
  sendDataToParent: (data: number) => void;
  current: number;
}

const AdjusterDiv = styled.div`
  display: flex;
`;

const WeeksAdjusterDiv = styled.h2`
  display: flex;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.5em;
`;

const NumberAdjuster = ({ weeksFlag, sendDataToParent, current }: Props) => {
  return (
    <>
      {weeksFlag ? (
        <WeeksAdjusterDiv>
          {current} Weeks
          <ButtonDiv>
            <button onClick={() => sendDataToParent(current + 1)}>▲</button>
            <button onClick={() => sendDataToParent(current - 1)}>▼</button>
          </ButtonDiv>
        </WeeksAdjusterDiv>
      ) : (
        <AdjusterDiv>
          {current}
          <ButtonDiv>
            <button onClick={() => sendDataToParent(current + 1)}>▲</button>
            <button onClick={() => sendDataToParent(current - 1)}>▼</button>
          </ButtonDiv>
        </AdjusterDiv>
      )}
    </>
  );
};

export default NumberAdjuster;
