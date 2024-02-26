import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Nav = styled.nav`
  text-align: right;
  padding-right: 2em;
`;

const LogoutButton = styled.button``;

interface Props {
  sendDataToParent: (data: number) => void;
}

const Navbar = ({ sendDataToParent }: Props) => {
  const navigate = useNavigate();

  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    if (window.location.href.includes("login")) {
      setShow(false);
    } else {
      setShow(true);
    }
  });

  const Logout = () => {
    sendDataToParent(-10);
    navigate("/login");
  };
  return (
    <>
      {show ? (
        <Nav>
          <LogoutButton onClick={Logout}>Logout</LogoutButton>
        </Nav>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Navbar;
