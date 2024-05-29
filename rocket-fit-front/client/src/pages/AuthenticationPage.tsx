import { useState } from "react";
import styled from "styled-components";
import AuthenticationInput from "../components/AuthenticationInput";
import { Container, Box } from "@chakra-ui/react";

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
            <ErrorMessage invalidlogin={invalidLogin.toString()}>
              Invalid Login. Try Again
            </ErrorMessage>
          ) : (
            <ErrorMessage invalidlogin={invalidLogin.toString()}></ErrorMessage>
          )}
          <AuthenticationInput sendDataToPage={handleInputData} />
        </BoxDiv>
      </ContainerDiv>
    </>
  );
};

export default AuthenticationPage;
