import styled from "styled-components";

const AccountInfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const AccountInfoHeader = styled.h2``;

const AccountInfoDetail = styled.p``;

interface Props {
  authData: any;
}

const AccountInfo = ({ authData }: Props) => {
  return (
    <>
      <AccountInfoItem>
        <AccountInfoHeader>Username:</AccountInfoHeader>
        <AccountInfoDetail>{authData?.username}</AccountInfoDetail>
      </AccountInfoItem>
      <AccountInfoItem>
        <AccountInfoHeader>Email:</AccountInfoHeader>
        <AccountInfoDetail>{authData?.emailAddress}</AccountInfoDetail>
      </AccountInfoItem>
    </>
  );
};

export default AccountInfo;
