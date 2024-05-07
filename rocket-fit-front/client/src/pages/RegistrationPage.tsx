import styled from "styled-components";
import RegisterInputs from "../components/RegistrationPageComponents/RegisterInputs";
import { Container, Box } from "@chakra-ui/react";

const PageHeader = styled.h1``;

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

const RegistrationPage = () => {
  return (
    <ContainerDiv>
      <BoxDiv>
        <PageHeader>Create a RocketFit Account</PageHeader>
        <RegisterInputs />
      </BoxDiv>
    </ContainerDiv>
  );
};

export default RegistrationPage;
