import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Nav = styled.nav`
  text-align: right;
  padding: 1em 2em 2em 0em;
  background-color: #2196f3;
`;

const NavButton = styled.button`
  margin-right: 1em;
`;
const LogoutButton = styled.button``;

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
                <Link to="/myworkouts" state={authId}>
                  My Workouts{" "}
                </Link>
              </NavButton>
              <NavButton>
                <Link to="/progress" state={authId}>
                  Track Progress
                </Link>
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
