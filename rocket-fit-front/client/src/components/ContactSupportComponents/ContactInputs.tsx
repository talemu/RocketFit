import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Input, Textarea } from "@chakra-ui/react";
import Spinner from "../Spinner";
import authUserService from "../../services/authUserService";
import { RfAuthUser } from "../../services/authUserService";
import supportRequest from "../../services/supportRequest";

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
  height: 10em;
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

const PageMessageDiv = styled.div<{ bgcolor?: string }>`
  background-color: ${(props) => props.bgcolor || "white"};
  width: 100%;
  text-align: center;
`;

const NonErrorDiv = styled.div`
  background-color: white;
`;

interface Props {
  authId: number;
}

const ContactInputs = ({ authId }: Props) => {
  const [pageMessage, setPageMessage] = useState("");
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
      validateInputs();
    }
  };

  const handleEnterDownTextArea = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      validateInputs();
    }
  };

  const validateInputs = () => {
    if (
      email.length < 8 ||
      !email.includes("@") ||
      email.split("@")[0].length == 0 ||
      email.split("@")[1].split(".")[0].length == 0 ||
      (!email.includes(".com") &&
        !email.includes(".edu") &&
        !email.includes(".org"))
    ) {
      setPageMessage("Invalid Email Address");
    } else if (subject.length < 1) {
      setPageMessage("The Subject cannot be empty");
    } else if (description.length < 1) {
      setPageMessage("The Description cannot be empty");
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setSpinner(true);
    const emailData = {
      email: "alemutabor@gmail.com",
      subject: subject,
      description: "User Email: " + email + "\n" + description,
    };
    const { request } = supportRequest.postItem("/sendemail/", emailData);
    request
      .then((response) => {
        response.data;
        setSpinner(false);
        setPageMessage(
          "Successfully sent email to support. We will reach out ASAP"
        );
        //Navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        setSpinner(false);
      });
  };

  return (
    <FormContent>
      {pageMessage.length != 0 ? (
        <PageMessageDiv bgcolor={pageMessage[0] == "S" ? "green" : "red"}>
          {pageMessage}
        </PageMessageDiv>
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
          <SubmitButton onClick={validateInputs}>Submit</SubmitButton>
        </ButtonDiv>
      )}
    </FormContent>
  );
};

export default ContactInputs;
