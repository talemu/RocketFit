import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  padding: 1em 2em 2em 0em;
  background-color: #2196f3;

  @media only screen and (max-width: 768px) {
    justify-content: center;
    padding: 1em 0em;
  }
`;

const NavButton = styled.button`
  background-color: #2196f3;
  color: white;
  border-radius: 0.5em;
  margin-right: 0.5em;
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const LogoutButton = styled.button`
  background-color: #2196f3;
  color: white;
  border-radius: 0.5em;
`;

interface Props {
  authId: number;
  sendDataToParent: (data: number) => void;
}

const Navbar = ({ authId, sendDataToParent }: Props) => {
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(true);

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
              <NavButton>
                {" "}
                <ButtonLink to="/myworkouts" state={authId}>
                  My Workouts{" "}
                </ButtonLink>
              </NavButton>
              <NavButton>
                <ButtonLink to="/progress" state={authId}>
                  Track Progress
                </ButtonLink>
              </NavButton>{" "}
            </>
          ) : (
            <></>
          )}

          <LogoutButton
            onClick={() => {
              //logging out
              sendDataToParent(-10);
              navigate("/login");
            }}
          >
            Logout
          </LogoutButton>
        </Nav>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Navbar;
