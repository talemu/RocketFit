import styled from "styled-components";
import ContactInputs from "../components/ContactSupportComponents/ContactInputs";

const PageHeader = styled.h1`
  text-align: center;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em;
`;

interface Props {
  authId: number;
}

const ContactSupport = ({ authId }: Props) => {
  return (
    <ContentDiv>
      <PageHeader>Contact Support</PageHeader>
      <ContactInputs authId={authId} />
    </ContentDiv>
  );
};

export default ContactSupport;
