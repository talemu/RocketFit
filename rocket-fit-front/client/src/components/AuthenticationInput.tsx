import React, { KeyboardEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import authUserService from "../services/authUserService";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const LoginDiv = styled.div`
  width: 100%;
  margin: 0em 0em 1em 0em;
`;

const LoginHeader2 = styled.h6`
  margin: 1em 0em 0em 0em;
  font-size: 1em;
`;

const PasswordInputGroup = styled(InputGroup)``;

const LoginInput = styled(Input)`
  width: 100%;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const InputRight = styled(InputRightElement)`
  display: block !important;
`;

const StyledEyeButton = styled(IconButton)`
  background: transparent;
  border: none;
  margin-right: 0.5em;
`;

const SubmitButton = styled(Button)`
  background-color: #2196f3;
  color: white;
  border-radius: 0.5em;
`;

const RegistrationButton = styled(Button)`
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
  color: blue;
  text-decoration: underline;
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
  color: blue;
`;

const SpinnerDiv = styled.div`
  margin: 1em 0em 0em 0em;
`;

const SpinnerSpan = styled.span``;

interface Props {
  sendDataToPage: (authId: number) => void;
}

const AuthenticationInput = ({ sendDataToPage }: Props) => {
  const Navigate = useNavigate();
  const [authId, setAuthId] = useState(-10);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputVariable: string
  ) => {
    if (inputVariable === "username") {
      const textValue: string = (event.target as HTMLInputElement).value;
      setUsername(textValue);
    } else if (inputVariable === "password") {
      const textValue: string = (event.target as HTMLInputElement).value;
      setPassword(textValue);
    }
  };

  // Allows user to press enter to submit login
  const handleEnterDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      SubmitLogin();
    }
  };

  const SubmitLogin = () => {
    setLoading(true);
    const { request } = authUserService.getAll(
      "/login?loginKey=" + username + "&password=" + password
    );
    request
      .then((response) => {
        const returned_id: number = response.data as unknown as number;
        if (returned_id === -10 && authId === -10) {
          setLoading(false);
          sendDataToPage(returned_id);
        } else {
          setAuthId(returned_id);
          sendDataToPage(returned_id);
          //sendDataToParent(returned_id);
          Navigate("/myworkouts");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <LoginDiv>
        <LoginHeader2>Username/Email:</LoginHeader2>
        <LoginInput
          key={1}
          type="text"
          placeholder=""
          value={username}
          onChange={(e) => handleInputChange(e, "username")}
          onKeyDown={handleEnterDown}
        />
      </LoginDiv>
      <LoginDiv>
        <LoginHeader2>Password:</LoginHeader2>
        <PasswordInputGroup>
          <InputRight>
            <StyledEyeButton
              variant="text"
              aria-label={isOpen ? "Mask password" : "Reveal password"}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={() => setIsOpen(!isOpen)}
            />
          </InputRight>
          <LoginInput
            key={2}
            type={isOpen ? "text" : "password"}
            placeholder=""
            value={password}
            onChange={(e) => handleInputChange(e, "password")}
            onKeyDown={handleEnterDown}
          />
        </PasswordInputGroup>
      </LoginDiv>
      {loading ? (
        <SpinnerDiv className="spinner-border text-dark" role="status">
          <SpinnerSpan className="sr-only"></SpinnerSpan>
        </SpinnerDiv>
      ) : (
        <ButtonDiv>
          <SubmitButton onClick={SubmitLogin} onKeyDown={handleEnterDown}>
            Submit
          </SubmitButton>
          <RegistrationButton>
            <ButtonLink to={"/register"}>Register Here</ButtonLink>
          </RegistrationButton>
        </ButtonDiv>
      )}
    </>
  );
};

export default AuthenticationInput;
