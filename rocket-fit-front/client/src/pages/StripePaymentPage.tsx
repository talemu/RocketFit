import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container, Box, Button } from "@chakra-ui/react";
import stripePaymentService from "../services/stripePaymentService";
import { useEffect } from "react";

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

const PageHeader2 = styled.h2`
  text-align: center;
  padding-bottom: 1em;
`

const PageContent = styled.h4`
  text-align: center;
`

const PriceLabel = styled.h3`
  text-align: center;
  margin-top: 1em;
`

const ButtonContainer = styled.div`
  padding-top: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StripeRedirectButton = styled(Button)`
  background-color: red;
  color: white;
  border-radius: 0.5em;
`;

const StripePaymentPage = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const userCreds = location.state;
  //navigate back to login if did not complete first step of registration
  useEffect(() => {
    if (userCreds === null || userCreds.length !== 3) {
      console.log("Triggered")
      Navigate("/login");
    }
  }, []);
    
  const handleRedirect = () => {
    const data = {
      email : userCreds[0],
      username : userCreds[1],
      password : userCreds[2],
      membership: "Basic Membership",
      amount: 0
    }
    const { request } = stripePaymentService.postItem("/", data)
    request.then((response) => {window.location.href = response.data.message.url}).catch((error) => {console.log(error)})
  }
  return (
    <ContainerDiv>
      <BoxDiv>
      <FormContent>
        <PageHeader>Pay Once, Use Forever</PageHeader>
        <PageHeader2> Take your workouts to the next level </PageHeader2>
        <PageContent> ✓ Workout Templates </PageContent>
        <PageContent> ✓ Progress Tracking </PageContent>
        <PageContent> ✓ Gradual Overload </PageContent>
        <PageContent> ✓ All with No Subscriptions </PageContent>
        <PriceLabel> One-Time Price of $9.99 </PriceLabel>
        <ButtonContainer>
        <StripeRedirectButton onClick={handleRedirect}> Join RocketFit </StripeRedirectButton>
        </ButtonContainer>
    </FormContent>
      </BoxDiv>
    </ContainerDiv>
    
  )
}

export default StripePaymentPage
