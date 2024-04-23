import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LoginDiv = styled.div``;

const LoginButton = styled.button`
  margin: 2em 0em 0em 2em;
`;

const UnauthorizedPage = () => {
  const Navigate = useNavigate();

  const LoginClick = () => {
    Navigate("/login");
  };
  return (
    <>
      <LoginDiv>Please Login</LoginDiv>
      <LoginButton onClick={LoginClick}>Login</LoginButton>
    </>
  );
};

export default UnauthorizedPage;
