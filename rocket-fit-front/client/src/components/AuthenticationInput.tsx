import React, { KeyboardEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import authUserService from "../services/authUserService";

const LoginHeader2 = styled.h2`
  margin: 1em 0em 0em 0em;
`;

const LoginInput = styled.input`
  margin: 0em 0em 1em 0em;
`;

const SubmitButton = styled.button`
  margin: 1em 0em 0em 0em;
  display: flex;
  flex-direction: column;
`;

const RegisterButton = styled.button`
  margin: 1em 0em;
  text-decoration: none;
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const SpinnerDiv = styled.div`
  margin: 1em 0em 0em 0em;
  display: flex;
  flex-direction: column;
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
      <LoginHeader2>Username:</LoginHeader2>
      <LoginInput
        key={1}
        type="text"
        placeholder=""
        value={username}
        onChange={(e) => handleInputChange(e, "username")}
        onKeyDown={handleEnterDown}
      />
      <LoginHeader2>Password:</LoginHeader2>
      <LoginInput
        key={2}
        type="password"
        placeholder=""
        value={password}
        onChange={(e) => handleInputChange(e, "password")}
        onKeyDown={handleEnterDown}
      />
      {loading ? (
        <SpinnerDiv className="spinner-border text-dark" role="status">
          <SpinnerSpan className="sr-only"></SpinnerSpan>
        </SpinnerDiv>
      ) : (
        <>
          <SubmitButton onClick={SubmitLogin} onKeyDown={handleEnterDown}>
            Submit
          </SubmitButton>
          <RegisterButton>
            <ButtonLink to={"/register"}>New User? Register Here</ButtonLink>
          </RegisterButton>
        </>
      )}
    </>
  );
};

export default AuthenticationInput;
