import { KeyboardEvent, useEffect, useState } from "react";
import authUserService from "../services/authUserService";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const ErrorMessage = styled.div`
  background-color: red;
`;

interface Props {
  sendDataToParent: (data: number) => void;
}

const AuthenticationPage = ({ sendDataToParent }: Props) => {
  const navigate = useNavigate();
  const [authId, setAuthId] = useState(0);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [invalidLogin, setInvalidLogin] = useState<boolean>(false);

  useEffect(() => {
    setSubmitted(false);
    const { request } = authUserService.getAll(
      "/login?loginKey=" + username + "&password=" + password
    );
    request
      .then((response) => {
        const returned_id: number = response.data as unknown as number;
        if (returned_id === -1 && authId === -1) {
          setInvalidLogin(true);
          setAuthId(-1);
        } else if (returned_id === -1 && authId === 0) {
          setAuthId(-1);
        } else {
          setAuthId(returned_id);
          sendDataToParent(returned_id);
          navigate("/myworkouts");
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  const handleUsernameChange = (event: KeyboardEvent) => {
    const textValue: string = (event.target as HTMLInputElement).value;
    setUsername(textValue);
  };

  const handlePasswordChange = (event: KeyboardEvent) => {
    const textValue: string = (event.target as HTMLInputElement).value;
    setPassword(textValue);
  };

  const HandleEnterDown = (event: KeyboardEvent) => {
    //Checking if key works
    if (event.key === "Enter") {
      SubmitLogin();
    }
  };

  const SubmitLogin = () => {
    setSubmitted(true);
  };
  return (
    <>
      <LoginHeader1>Login</LoginHeader1>
      {invalidLogin ? (
        <ErrorMessage>Incorrect Username / Password</ErrorMessage>
      ) : (
        <div></div>
      )}
      <LoginHeader2>Username or Email:</LoginHeader2>
      <LoginInput
        key={1}
        type="text"
        placeholder=""
        value={username}
        onChange={handleUsernameChange}
        onKeyDown={HandleEnterDown}
      />
      <LoginHeader2>Password:</LoginHeader2>
      <LoginInput
        key={2}
        type="password"
        placeholder=""
        value={password}
        onChange={handlePasswordChange}
        onKeyDown={HandleEnterDown}
      />
      <SubmitButton onClick={SubmitLogin} onKeyDown={HandleEnterDown}>
        Submit
      </SubmitButton>
    </>
  );
};

export default AuthenticationPage;
