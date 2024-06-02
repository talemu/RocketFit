import React, { KeyboardEvent, useState } from "react";
import styled from "styled-components";
import authUserService from "../../services/authUserService";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import { Button, Input } from "@chakra-ui/react";

const FormContent = styled.div`
  width: 100%;
`;

const InputHeader = styled.h6`
  margin: 1em 0em 0.5em 0em;
  font-size: 1em;
`;

const CheckInput = styled(Input)`
  width: 1em;
`;

const UserInput = styled(Input)`
  width: 100%;
`;

const ShowPasswordDiv = styled.div`
  padding-top: 1em;
`;

const SubmitButton = styled(Button)`
  margin: 1em 0em 0em 0em;
  background-color: red;
  color: white;
  border-radius: 0.5em;
`;

const LoginButton = styled(Button)`
  background: none;
  border: none;
  margin: 1em 0em 0em 0em;
  font: inherit;
  cursor: pointer;
  color: red;
  text-decoration: underline;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const ErrorDiv = styled.div`
  background-color: red;
  height: 2em;
`;

const NonErrorDiv = styled.div`
  background-color: transparent;
  height: 2em;
`;

const RegisterInputs = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordTwo, setPasswordTwo] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [spinner, setSpinner] = useState<boolean>(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputVariable: string
  ) => {
    if (inputVariable === "email") {
      const textValue: string = (event.target as HTMLInputElement).value;
      setEmail(textValue);
    } else if (inputVariable === "username") {
      const textValue: string = (event.target as HTMLInputElement).value;
      setUsername(textValue);
    } else if (inputVariable === "password") {
      const textValue: string = (event.target as HTMLInputElement).value;
      setPassword(textValue);
    } else if (inputVariable === "passwordTwo") {
      const textValue: string = (event.target as HTMLInputElement).value;
      setPasswordTwo(textValue);
    }
  };

  // Allows user to press enter to submit registration
  const handleEnterDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      ValidateRegistration();
    }
  };

  const ValidateRegistration = () => {
    //email validation
    setSpinner(true);
    if (
      email.length < 8 ||
      !email.includes("@") ||
      email.split("@")[0].length == 0 ||
      email.split("@")[1].split(".")[0].length == 0 ||
      (!email.includes(".com") &&
        !email.includes(".edu") &&
        !email.includes(".org"))
    ) {
      handleError("Invalid Email Address");
      return;
    }
    //username validation
    if (username.length < 3) {
      handleError("Username must be at least 3 characters long");
      return;
    }
    //password validation
    if (password.length < 8) {
      handleError("Password must be at least 8 characters long");
      return;
    }
    //password match validation
    if (password !== passwordTwo) {
      handleError("Passwords Do Not Match");
      return;
    }
    // checking if email or username exists in database
    const { request } = authUserService.getAll(
      "/checkEmailUsername/?email=" + email + "&username=" + username
    );
    request.then((response) => {
      const validity = response.data as unknown as string;
      if (validity == "Valid") {
        SubmitRegistration();
      }
      handleError(validity);
    });
  };

  const SubmitRegistration = () => {
    const newUser = {
      emailAddress: email,
      username: username,
      password: password,
    };
    const { request } = authUserService.postItem("/", newUser);
    request
      .then((response) => {
        response.data;
        Navigate("/login");
        setSpinner(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleError = (message: string) => {
    setErrorMessage(message);
    setSpinner(false);
  };

  const NavigateToLogin = () => {
    Navigate("/login");
  };

  return (
    <FormContent>
      {errorMessage.length != 0 ? (
        <ErrorDiv>{errorMessage}</ErrorDiv>
      ) : (
        <NonErrorDiv></NonErrorDiv>
      )}
      <InputHeader>Email:</InputHeader>
      <UserInput
        type="email"
        value={email}
        onChange={(e) => handleInputChange(e, "email")}
        onKeyDown={handleEnterDown}
      />
      <InputHeader>Username:</InputHeader>
      <UserInput
        type="text"
        value={username}
        onChange={(e) => handleInputChange(e, "username")}
        onKeyDown={handleEnterDown}
      />
      <InputHeader>Password:</InputHeader>
      <UserInput
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => handleInputChange(e, "password")}
        onKeyDown={handleEnterDown}
      />
      <InputHeader>Re-Enter Password:</InputHeader>
      <UserInput
        type={showPassword ? "text" : "password"}
        value={passwordTwo}
        onChange={(e) => handleInputChange(e, "passwordTwo")}
        onKeyDown={handleEnterDown}
      />
      <ShowPasswordDiv>
        <CheckInput
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />{" "}
        Show Passwords
      </ShowPasswordDiv>
      {spinner ? (
        <Spinner />
      ) : (
        <ButtonDiv>
          <SubmitButton onClick={ValidateRegistration}>Register</SubmitButton>
          <LoginButton onClick={NavigateToLogin}>
            Already Have an Account? Login.
          </LoginButton>
        </ButtonDiv>
      )}
    </FormContent>
  );
};

export default RegisterInputs;
