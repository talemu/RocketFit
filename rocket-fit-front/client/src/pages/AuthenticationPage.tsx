import { KeyboardEvent, useState } from "react";
import authUserService from "../services/authUserService";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationInput from "../components/AuthenticationInput";

const LoginHeader1 = styled.h1``;

const ErrorMessage = styled.div`
  background-color: red;
`;

const EmptyDiv = styled.div``;

interface Props {
  sendDataToParent: (data: number) => void;
}

const AuthenticationPage = ({ sendDataToParent }: Props) => {
  const [invalidLogin, setInvalidLogin] = useState<boolean>(false);

  const handleInputData = async (returned_id: number) => {
    if (returned_id === -10) {
      setInvalidLogin(true);
      sendDataToParent(-10);
    } else {
      setInvalidLogin(false);
      sendDataToParent(returned_id);
    }
  };

  return (
    <>
      <LoginHeader1>Login</LoginHeader1>
      {invalidLogin ? (
        <ErrorMessage>Incorrect Username and/or Password</ErrorMessage>
      ) : (
        <EmptyDiv></EmptyDiv>
      )}
      <AuthenticationInput sendDataToPage={handleInputData} />
    </>
  );
};

export default AuthenticationPage;
