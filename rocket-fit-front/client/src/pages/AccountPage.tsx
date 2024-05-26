import React from "react";

interface Props {
  authId: number;
}

const AccountPage = ({ authId }: Props) => {
  console.log(authId);
  return <div></div>;
};

export default AccountPage;
