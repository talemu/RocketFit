import { Box, Button, Container } from '@chakra-ui/react';
import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import authUserService from '../services/authUserService';

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

const FormContent = styled.div`
  width: 100%;
  align-items: center;
`;

const PageHeader = styled.h1`
  text-align: center;
`;

const LoginRedirectButton = styled(Button)`
  background-color: red;
  color: white;
  border-radius: 0.5em;
`;

const ButtonContainer = styled.div`
  padding-top: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SuccessPaymentPage = () => {
    const Navigate = useNavigate();
    const location = useLocation();
    const userCreds = location.state;
    const hasSubmitted = useRef(false);

    useEffect(() => {
        //navigate to login page if userCreds is not set
        if (userCreds === null || Object.keys(userCreds).length !== 3) {
          Navigate("/login");
        }
        else {
            TriggerSubmission();
        }
      }, []);

    const TriggerSubmission = () => {
        if (!hasSubmitted.current) {
            SubmitRegistration(userCreds.email, userCreds.username, userCreds.password);
            hasSubmitted.current = true;
        }
    };

    const SubmitRegistration = (email : string, username : string, password : string) => {
        const newUser = {
          emailAddress: email,
          username: username,
          password: password,
        };
        const { request } = authUserService.postItem("/", newUser);
        request
          .then((response) => {
            response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      };

  return (
    <ContainerDiv>
        <BoxDiv>
            <PageHeader>Payment Successful!</PageHeader>
            <FormContent>
                <PageHeader>Thank you for your purchase!</PageHeader>
                <ButtonContainer>
                <LoginRedirectButton onClick={() => Navigate("/login")}>Login To RocketFit</LoginRedirectButton>
                </ButtonContainer>
            </FormContent>
        </BoxDiv>
    </ContainerDiv>
  )
}

export default SuccessPaymentPage
