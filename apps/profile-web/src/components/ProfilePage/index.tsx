import React from "react";
import styled, { AnyStyledComponent } from "styled-components";

import { ProfileHeader } from "./profileHeader";
import { Membership } from "./membership";
import { Participation } from "./participation";
import { RecentlyAttendedEvents } from "./recentlyAttendedEvents";
import { QuickAccess } from "../QuickAccess";

const ProfileWrapper: AnyStyledComponent = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  font-family: "Nunito Sans";
`;

const AttendedEventsWrapper: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 2.5rem;

  @media all and (min-width: 600px) {
    padding: 0 1.25rem;
  }

  @media all and (min-width: 960px) {
    padding: 0;
    width: 86%
    max-width: 80rem;
    margin-bottom: 0;
  }

  @media all and (min-width: 1280px) {
    flex-direction: row;
  }
`;

const QuickAccessMargins: AnyStyledComponent = styled.div`
  width: 100%;
  padding: 0 1.25rem;

  @media all and (min-width: 600px) {
    display: none;
  }
`;

export const ProfilePage: React.FC<{}> = () => {
  return (
    <ProfileWrapper>
      <ProfileHeader/>
      <Membership/>
      <AttendedEventsWrapper>
        <Participation/>
        <RecentlyAttendedEvents/>
      </AttendedEventsWrapper>
      <QuickAccessMargins>
        <QuickAccess />
      </QuickAccessMargins>
    </ProfileWrapper>
  );
};
