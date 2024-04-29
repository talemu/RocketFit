import styled from "styled-components";

interface Props {
  weeksFlag: boolean;
  sendDataToParent: (data: number) => void;
  current: number;
  increment: number;
}

const AdjusterDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const WeeksAdjusterDiv = styled.h2`
  display: flex;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.5em;
`;

const ArrowButton = styled.button``;

const NumberAdjuster = ({
  weeksFlag,
  sendDataToParent,
  current,
  increment,
}: Props) => {
  return (
    <>
      {weeksFlag ? (
        <WeeksAdjusterDiv>
          {current} Weeks
          <ButtonDiv>
            <ArrowButton
              onClick={() => {
                sendDataToParent(Number(current) + Number(increment));
              }}
            >
              ▲
            </ArrowButton>
            <ArrowButton
              onClick={() =>
                current >= 2
                  ? sendDataToParent(Number(current) - Number(increment))
                  : null
              }
            >
              ▼
            </ArrowButton>
          </ButtonDiv>
        </WeeksAdjusterDiv>
      ) : (
        <AdjusterDiv>
          {current}
          <ButtonDiv>
            <ArrowButton
              onClick={() => {
                sendDataToParent(Number(current) + Number(increment));
              }}
            >
              ▲
            </ArrowButton>
            <ArrowButton
              onClick={() =>
                current >= 2
                  ? sendDataToParent(Number(current) - Number(increment))
                  : null
              }
            >
              ▼
            </ArrowButton>
          </ButtonDiv>
        </AdjusterDiv>
      )}
    </>
  );
};

export default NumberAdjuster;
