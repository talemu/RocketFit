import "bootstrap/dist/css/bootstrap.min.css";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MotivationModal from "./NavbarComponents/MotivationModal";

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  padding: 1em 2em 2em 0em;
  background-color: red;
  z-index: 100;

  @media only screen and (max-width: 768px) {
    justify-content: center;
    bottom: 0;
    padding: 0em;
    position: fixed;
    width: 100%;
  }
`;
const NavButton = styled.button<{ active?: boolean }>`
  background-color: red;
  color: white;
  border-radius: 0.5em;
  margin-right: 0.5em;

  @media only screen and (max-width: 768px) {
    flex: 1;
    border-top: 0;
    border-bottom: 0;
    border-right: 1px solid white;
    border-left: 1px solid white;
    border-radius: 0;
    margin: 0;
    padding: 1em;
    cursor: pointer;
    ${(props) =>
      props.active &&
      css`
        color: red;
        background-color: gray;
        border: none;
        border-radius: 0;
      `};
  }
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

// const LogoutButton = styled.button`
//   background-color: red;
//   color: white;
//   border-radius: 0.5em;
// `;

interface Props {
  authId: number;
  sendDataToParent: (data: number) => void;
}

const Navbar = ({ authId, sendDataToParent }: Props) => {
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (
      window.location.href.includes("login") ||
      window.location.href.includes("register")
    ) {
      setShow(false);
    } else {
      setShow(true);
    }
  });

  return (
    <>
      {show ? (
        <Nav>
          {authId !== -10 ? (
            <>
              <NavButton active={location.pathname === "/myworkouts"}>
                <ButtonLink to="/myworkouts" state={authId}>
                  My Workouts
                </ButtonLink>
              </NavButton>
              <NavButton active={location.pathname === "/progress"}>
                <ButtonLink to="/progress" state={authId}>
                  Track Progress
                </ButtonLink>
              </NavButton>{" "}
              <NavButton
                active={location.pathname === ""}
                onClick={() => setModalOpen(!modalOpen)}
              >
                Motivate Me
              </NavButton>
              <MotivationModal
                isOpen={modalOpen}
                sendDataToParent={(modalStatus: boolean) =>
                  setModalOpen(modalStatus)
                }
              />
              <NavButton
                active={false}
                onClick={() => {
                  //logging out
                  sendDataToParent(-10);
                  navigate("/login");
                }}
              >
                Logout
              </NavButton>
            </>
          ) : (
            <div></div>
          )}
        </Nav>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Navbar;
