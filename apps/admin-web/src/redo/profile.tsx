import React from "react";
import styled, { AnyStyledComponent } from "styled-components";

import { useAuth0 } from "../utils/react-auth0-wrapper";
import { Options } from "./Option";

const DropdownWrapper = styled.div`
  position: relative;
`;

const Name = styled.div`
  border: none;
  font-size: 17px;
  font-weight: bold;
  background: none;
  color: white;
  margin-right: 1em;
  margin-left: 0.5em;
  &:hover {
    cursor: pointer;
  }
`;

const Picture = styled.img`
  min-width: 30px;
  max-width: 30px;
  min-height: 30px;
  max-height: 30px;
  border-radius: 50%;
`;

const ProfileDisplay = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
`;
const Move: AnyStyledComponent = styled.div`
  padding-left: 45px;
  padding-top: 2px;
`;
const ProfileOptions: React.FC<{}> = (): JSX.Element => {
  const { loading, user } = useAuth0();

  return (
    <DropdownWrapper>
      <ProfileDisplay>
        {!loading && <Picture src={user.picture} alt="Profile"></Picture>}
        {!loading && <Name>{user.name}</Name>}
      </ProfileDisplay>
      <Move>
        <Options />
      </Move>
    </DropdownWrapper>
  );
};

export { ProfileOptions };
