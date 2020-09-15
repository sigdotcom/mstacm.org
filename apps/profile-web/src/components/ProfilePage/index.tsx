import React from "react";

import { Events } from "./events";
import { Membership } from "./membership";
import { Participation } from "./participation";
import { QuickAccess } from "../QuickAccess";

import styled, { AnyStyledComponent } from "styled-components";

import { useAuth0 } from "../../utils/react-auth0-wrapper";

const ProfileWrapper: AnyStyledComponent = styled.div`
  background: white;
`;

const ProfileHeader: AnyStyledComponent = styled.div`
  background: #F4F5F8;
`;

export const ProfilePage: React.FC<{}> = () => {
  const { user } = useAuth0();

  return (
    <ProfileWrapper>
      <ProfileHeader>
        <h1>Hello {user.name}!</h1>
      </ProfileHeader>
      <Events />
      <Membership />
      <Participation />
      <QuickAccess />
    </ProfileWrapper>
  );
};
