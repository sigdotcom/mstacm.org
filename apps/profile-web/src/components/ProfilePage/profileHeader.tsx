import React from "react";

import { Events } from "./events";

import styled, { AnyStyledComponent } from "styled-components";

import { useAuth0 } from "../../utils/react-auth0-wrapper";

const HeaderWrapper: AnyStyledComponent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
  width: 100%;
`;

const ProfileInfo: AnyStyledComponent = styled.div`
  background: #F4F5F8;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0 3rem;
  width: 100%;
`;

const ProfilePicture: AnyStyledComponent = styled.img`
  min-width: 120px;
  max-width: 120px;
  min-height: 120px;
  max-height: 120px;
  border-radius: 50%;
`;

const Username: AnyStyledComponent = styled.div`
  color: #376B83;
  font-weight: 900;
  font-size: 1.4rem;
  margin-top: .4rem;
`;

export const ProfileHeader: React.FC<{}> = () => {
  const { loading, user } = useAuth0();

  return (
    <HeaderWrapper>
      <ProfileInfo>
        {loading && <div>Loading</div>}
        <ProfilePicture src={user.picture} alt="ProfilePicture" />
        <Username>{user.name}</Username>
      </ProfileInfo>
      <Events />
    </HeaderWrapper>
  );
};
