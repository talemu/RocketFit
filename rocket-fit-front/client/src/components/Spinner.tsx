import styled from "styled-components";

const SpinnerDiv = styled.div`
  margin: 1em 0em 0em 0em;
  display: flex;
  flex-direction: column;
`;

const SpinnerSpan = styled.span``;

const Spinner = () => {
  return (
    <SpinnerDiv className="spinner-border text-dark" role="status">
      <SpinnerSpan className="sr-only"></SpinnerSpan>
    </SpinnerDiv>
  );
};

export default Spinner;
