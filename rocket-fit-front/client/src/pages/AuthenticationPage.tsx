import { KeyboardEvent, useState } from "react";
import authUserService from "../services/authUserService";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const LoginHeader1 = styled.h1``;

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

const ErrorMessage = styled.div`
  background-color: red;
`;

const EmptyDiv = styled.div``;

interface Props {
  sendDataToParent: (data: number) => void;
}

const AuthenticationPage = ({ sendDataToParent }: Props) => {
  const navigate = useNavigate();
  const [authId, setAuthId] = useState(-10);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [invalidLogin, setInvalidLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const textValue: string = (event.target as HTMLInputElement).value;
    setUsername(textValue);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const textValue: string = (event.target as HTMLInputElement).value;
    setPassword(textValue);
  };

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
        console.log(returned_id, authId);
        if (returned_id === -10 && authId === -10) {
          setInvalidLogin(true);
          setLoading(false);
        } else {
          setAuthId(returned_id);
          sendDataToParent(returned_id);
          navigate("/myworkouts");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <LoginHeader1>Login</LoginHeader1>
      {invalidLogin ? (
        <ErrorMessage>Incorrect Username and/or Password</ErrorMessage>
      ) : (
        <EmptyDiv></EmptyDiv>
      )}
      <LoginHeader2>Username:</LoginHeader2>
      <LoginInput
        key={1}
        type="text"
        placeholder=""
        value={username}
        onChange={handleUsernameChange}
        onKeyDown={handleEnterDown}
      />
      <LoginHeader2>Password:</LoginHeader2>
      <LoginInput
        key={2}
        type="password"
        placeholder=""
        value={password}
        onChange={handlePasswordChange}
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

export default AuthenticationPage;
