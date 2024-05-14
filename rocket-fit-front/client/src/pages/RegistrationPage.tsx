import styled from "styled-components";
import RegisterInputs from "../components/RegistrationPageComponents/RegisterInputs";
import { Container, Box } from "@chakra-ui/react";

const PageHeader = styled.h1`
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
  outline: 0.5px solid black;
  margin: 1em;
  padding: 1em;
  box-shadow: 5px 5px 5px grey;
  border-radius: 5px;
  font-size: 1em;

  @media only screen and (min-width: 1000px) and (min-height: 1200px) {
    font-size: 2em;
  }
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
