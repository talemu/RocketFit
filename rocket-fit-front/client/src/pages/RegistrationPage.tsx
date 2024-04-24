import React, { KeyboardEvent, useState } from "react";
import styled from "styled-components";
import authUserService from "../services/authUserService";
import { Form, useNavigate } from "react-router-dom";
import { response } from "express";

const PageHeader = styled.h1``;

const FormContent = styled.div`
  margin-left: 5%;
`;

const InputHeader = styled.h2`
  margin: 1em 0em 0.5em 0em;
`;

const UserInput = styled.input``;

const ShowPasswordDiv = styled.div`
  padding-top: 1em;
`;

const SubmitButton = styled.button`
  margin: 1em 0em 0em 0em;
`;

const SubmitDiv = styled.div`
  margin: 1em 0em;
`;

const ErrorDiv = styled.div`
  background-color: red;
`;

const RegistrationPage = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordTwo, setPasswordTwo] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const textValue: string = (event.target as HTMLInputElement).value;
    setEmail(textValue);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const textValue: string = (event.target as HTMLInputElement).value;
    setUsername(textValue);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const textValue: string = (event.target as HTMLInputElement).value;
    setPassword(textValue);
  };

  const handlePasswordTwoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const textValue: string = (event.target as HTMLInputElement).value;
    setPasswordTwo(textValue);
  };

  const handleEnterDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      ValidateRegistration();
    }
  };

  const ValidateRegistration = () => {
    //email validation
    if (
      email.length < 8 ||
      !email.includes("@") ||
      (!email.includes(".com") &&
        !email.includes(".edu") &&
        !email.includes(".org"))
    ) {
      setErrorMessage("Invalid Email Address");
      return;
    }
    //username validation
    if (username.length < 3) {
      setErrorMessage("Username must be at least 3 characters long");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }
    if (password !== passwordTwo) {
      setErrorMessage("Passwords Do Not Match");
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
      setErrorMessage(validity);
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
        console.log("Submitted");
        Navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <PageHeader>Create a RocketFit Account</PageHeader>
      <FormContent>
        <InputHeader>Email:</InputHeader>
        <UserInput
          type="email"
          value={email}
          onChange={handleEmailChange}
          onKeyDown={handleEnterDown}
        />
        <InputHeader>Username:</InputHeader>
        <UserInput
          type="text"
          value={username}
          onChange={handleUsernameChange}
          onKeyDown={handleEnterDown}
        />
        <InputHeader>Password:</InputHeader>
        <UserInput
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          onKeyDown={handleEnterDown}
        />
        <InputHeader>Re-Enter Password:</InputHeader>
        <UserInput
          type={showPassword ? "text" : "password"}
          value={passwordTwo}
          onChange={handlePasswordTwoChange}
          onKeyDown={handleEnterDown}
        />
        <ShowPasswordDiv>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Show Password
        </ShowPasswordDiv>
        {errorMessage.length != 0 ? <ErrorDiv>{errorMessage}</ErrorDiv> : null}
        <SubmitDiv>
          <SubmitButton onClick={ValidateRegistration}>Register</SubmitButton>
        </SubmitDiv>
      </FormContent>
    </>
  );
};

export default RegistrationPage;
