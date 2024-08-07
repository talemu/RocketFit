import { useState } from "react";
import styled from "styled-components";
import AuthenticationInput from "../components/AuthenticationInput";
import { Container, Box } from "@chakra-ui/react";

const VersionTag = styled.div`
  padding-top: 1em;
`;

const LoginHeader1 = styled.h1`
  @media only screen and (min-width: 768px) {
    font-size: 2em;
  }
`;

const ErrorMessage = styled.div<{ invalidlogin: string }>`
  background: ${(props) =>
    props.invalidlogin == "true" ? "red" : "transparent"};
  height: 2em;
  width: 100%;
  text-align: center;
`;

const ContainerDiv = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const BoxDiv = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  outline: 0.5px solid black;
  padding: 2em;
  box-shadow: 5px 5px 5px grey;
  border-radius: 5px;

  @media only screen and (min-width: 1000px) and (min-height: 1200px) {
    font-size: 2em;
  }
`;

interface Props {
  sendDataToParent: (data: number) => void;
}

const AuthenticationPage = ({ sendDataToParent }: Props) => {
  const [invalidLogin, setInvalidLogin] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputData = async (returned_id: number) => {
    if (returned_id === -10) {
      setInvalidLogin(true);
      sendDataToParent(-10);
      setErrorMessage("Invalid Login, Try Again.");
    } else {
      setInvalidLogin(false);
      sendDataToParent(returned_id);
    }
  };

  const handleInputMessage = async (errorMessage: string) => {
    if (errorMessage !== "") {
      setInvalidLogin(true);
      sendDataToParent(-10);
      setErrorMessage(errorMessage);
    } else {
      setInvalidLogin(false);
    }
  };

  return (
    <>
      <ContainerDiv>
        <BoxDiv>
          <LoginHeader1>RocketFit Login</LoginHeader1>
          {invalidLogin ? (
            <ErrorMessage invalidlogin={invalidLogin.toString()}>
              {errorMessage}
            </ErrorMessage>
          ) : (
            <ErrorMessage invalidlogin={invalidLogin.toString()}></ErrorMessage>
          )}
          <AuthenticationInput
            sendDataToPage={handleInputData}
            sendMessageToPage={handleInputMessage}
          />
        </BoxDiv>
        <VersionTag>Beta V2.4.1</VersionTag>
      </ContainerDiv>
    </>
  );
};

export default AuthenticationPage;
