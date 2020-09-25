import React from "react";

import { ProfileHeader } from "./profileHeader";
import { Membership } from "./membership";
import { Participation } from "./participation";
import { QuickAccess } from "../QuickAccess";

import styled, { AnyStyledComponent } from "styled-components";

const ProfileWrapper: AnyStyledComponent = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  font-family: "Nunito Sans";
`;

export const ProfilePage: React.FC<{}> = () => {
  return (
    <ProfileWrapper>
      <ProfileHeader />
      <Membership />
      <Participation />
      <QuickAccess />
    </ProfileWrapper>
  );
};
