import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LoginDiv = styled.div`
  margin: 2em 0em 0em 2em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LoginButton = styled.button``;

const UnauthorizedPage = () => {
  const Navigate = useNavigate();

  const LoginClick = () => {
    Navigate("/login");
  };
  return (
    <>
      <LoginDiv>
        Please Login
        <LoginButton onClick={LoginClick}>Login</LoginButton>
      </LoginDiv>
    </>
  );
};

export default UnauthorizedPage;
