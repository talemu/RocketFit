import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Input, Textarea } from "@chakra-ui/react";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";
import authUserService from "../../services/authUserService";
import { RfAuthUser } from "../../services/authUserService";

const FormContent = styled.div`
  width: 100%;
`;

const InputHeader = styled.h6`
  margin: 1em 0em 0.5em 0em;
  font-size: 1em;
`;

const UserInput = styled(Input)`
  width: 100%;
`;

const UserTextArea = styled(Textarea)`
  width: 100%;
`;

const SubmitButton = styled(Button)`
  margin: 1em 0em 0em 0em;
  background-color: red;
  color: white;
  border-radius: 0.5em;
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

interface Props {
  authId: number;
}

const ContactInputs = ({ authId }: Props) => {
  const Navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    if (authId === -10) {
      setEmailDisabled(false);
    } else {
      const { request } = authUserService.getAll("/" + authId);
      request
        .then((response) => {
          const returned_user = response.data as unknown as RfAuthUser;
          setEmail(returned_user.emailAddress);
          setEmailDisabled(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [authId]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputVariable: string
  ) => {
    if (inputVariable === "email") {
      const textValue: string = (event.target as HTMLInputElement).value;
      setEmail(textValue);
    } else if (inputVariable === "subject") {
      const textValue: string = (event.target as HTMLInputElement).value;
      setSubject(textValue);
    } else if (inputVariable === "description") {
      const textValue: string = (event.target as HTMLInputElement).value;
      setDescription(textValue);
    }
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    inputVariable: string
  ) => {
    if (inputVariable === "description") {
      const textValue: string = (event.target as HTMLTextAreaElement).value;
      setDescription(textValue);
    }
  };

  const handleEnterDownInput = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed");
    }
  };

  const handleEnterDownTextArea = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed");
    }
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
        onKeyDown={handleEnterDownInput}
        disabled={emailDisabled}
      />
      <InputHeader>Subject:</InputHeader>
      <UserInput
        type="text"
        value={subject}
        onChange={(e) => handleInputChange(e, "subject")}
        onKeyDown={handleEnterDownInput}
      />
      <InputHeader>Description of Issue:</InputHeader>
      <UserTextArea
        type="text"
        value={description}
        onChange={(e) => handleTextAreaChange(e, "description")}
        onKeyDown={handleEnterDownTextArea}
      />
      {spinner ? (
        <Spinner />
      ) : (
        <ButtonDiv>
          <SubmitButton onClick={() => console.log("submitted")}>
            Submit
          </SubmitButton>
        </ButtonDiv>
      )}
    </FormContent>
  );
};

export default ContactInputs;
