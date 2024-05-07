import { useState } from "react";
import styled from "styled-components";
import AuthenticationInput from "../components/AuthenticationInput";
import { Container, Box } from "@chakra-ui/react";

const LoginHeader1 = styled.h1``;

const ErrorMessage = styled.div`
  background-color: red;
`;

const EmptyDiv = styled.div``;

const ContainerDiv = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BoxDiv = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  outline: 0.5px solid black;
  padding: 1em;
  box-shadow: 5px 5px 5px grey;
  border-radius: 5px;
`;

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
      <ContainerDiv>
        <BoxDiv>
          <LoginHeader1>RocketFit Login</LoginHeader1>
          {invalidLogin ? (
            <ErrorMessage>Incorrect Username and/or Password</ErrorMessage>
          ) : (
            <EmptyDiv></EmptyDiv>
          )}
          <AuthenticationInput sendDataToPage={handleInputData} />
        </BoxDiv>
      </ContainerDiv>
    </>
  );
};

export default AuthenticationPage;
