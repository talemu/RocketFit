import { useEffect, useState } from "react";
import styled from "styled-components";
import motivationalQuoteService, {
  MotivationalQuote,
} from "../../services/motivationalQuoteService";
import Modal from "react-modal";

Modal.setAppElement("#root");

interface Props {
  isOpen: boolean;
  sendDataToParent: (modalOpen: boolean) => void;
}

const StyledModal = styled(Modal)`
  z-index: 1000;
`;

const ContentDiv = styled.div`
  padding: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  color: white;
`;

const BoxDiv = styled.div`
  padding: 1em;
  background-color: red;
  border-radius: 0.5em;
`;

const StyledQuote = styled.h2`
  text-align: center;
`;

const StyledAuthor = styled.h3`
  text-align: end;
  padding-right: 1em;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const CloseButton = styled.button`
  margin: 0.5em;
  background-color: red;
  border-radius: 0.5em;
  color: white;
`;

const MotivationModal = ({ isOpen, sendDataToParent }: Props) => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      const { request } = motivationalQuoteService.getAll("/item/");
      request.then((response) => {
        const mqItem = response.data as unknown as MotivationalQuote;
        setQuote(mqItem.quote);
        setAuthor(mqItem.author);
        setShowModal(true);
        sendDataToParent(true);
      });
    }
  }, [isOpen]);

  return (
    <>
      {showModal ? (
        <StyledModal isOpen={showModal}>
          <ContentDiv>
            <BoxDiv>
              <StyledQuote>"{quote}"</StyledQuote>
              <StyledAuthor>-{author}</StyledAuthor>
              <ButtonDiv>
                <CloseButton
                  onClick={() => {
                    setShowModal(!showModal);
                    sendDataToParent(false);
                  }}
                >
                  Close
                </CloseButton>
              </ButtonDiv>
            </BoxDiv>
          </ContentDiv>
        </StyledModal>
      ) : null}
    </>
  );
};

export default MotivationModal;
