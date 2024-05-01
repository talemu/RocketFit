import styled from "styled-components";
import LoginInputs from "../components/RegistrationPageComponents/LoginInputs";

const PageHeader = styled.h1``;

const RegistrationPage = () => {
  return (
    <>
      <PageHeader>Create a RocketFit Account</PageHeader>
      <LoginInputs />
    </>
  );
};

export default RegistrationPage;
