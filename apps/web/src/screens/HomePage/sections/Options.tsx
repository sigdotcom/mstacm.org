import React from "react";
import styled from "styled-components";

import { useAuth0 } from "../../../utils/react-auth0-wrapper";

const Dropdown = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  left: 0;
  right: 0;
  box-shadow: 0 0 5px gray;
  background-color: white;
  border-radius: 8px;
  font-size: 17px;
  color: black;
  margin-top: .5em;
  z-index: 1000;
`;

const Profile = styled.a`
  border-radius: 8px 8px 0 0;
  padding: .3em 0;
  color: black;
  font-weight: bold;
  background-color: white;
`

const SignOut = styled.button`
  border-radius: 0 0 8px 8px;
  font-weight: bold;
  padding: .3em 0;
  border: none;
  background-color: white;

  &:hover {
    cursor: pointer;
`

const Options: React.FC<{}> = (): JSX.Element => {
  const { logout } = useAuth0();

  return (
    <Dropdown>
      <Profile href={`https://profile.mstacm.org/`}>Profile</Profile>
      <SignOut onClick={() => logout({ returnTo: window.location.origin })}>Log Out</SignOut>
    </ Dropdown>
  );
};

export { Options };
