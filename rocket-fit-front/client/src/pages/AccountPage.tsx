import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import authUserService, { RfAuthUser } from "../services/authUserService";
import Spinner from "../components/Spinner";
import AccountInfo from "../components/AccountPageComponents/AccountInfo";

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em;
  justify-content: center;
`;

const AccountButton = styled.button`
  background-color: red;
  color: white;
  border-radius: 0.5em;
  margin-right: 0.5em;
  margin-top: 1em;
`;

interface Props {
  authId: number;
  sendDataToParent: (data: number) => void;
}

const AccountPage = ({ authId, sendDataToParent }: Props) => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState<RfAuthUser>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authId === -10) {
      navigate("/unauthorized");
    } else {
      const { request } = authUserService.getAll("/" + authId);
      request.then((response) => {
        const authUser = response.data as unknown as RfAuthUser;
        setAuthData(authUser);
        setLoading(false);
      });
    }
  }, []);

  return (
    <>
      <ContentDiv>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <AccountInfo authData={authData} />
            <AccountButton
              onClick={() => {
                //logging out
                sendDataToParent(-10);
                navigate("/login");
              }}
            >
              Logout
            </AccountButton>
            <AccountButton
              onClick={() => {
                navigate("/support");
              }}
            >
              Contact Support
            </AccountButton>
          </>
        )}
      </ContentDiv>
    </>
  );
};

export default AccountPage;
