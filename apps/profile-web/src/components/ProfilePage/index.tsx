import React from "react";
import styled, { AnyStyledComponent } from "styled-components";

import { ProfileHeader } from "./profileHeader";
import { Membership } from "./membership";
import { Participation } from "./participation";
import { RecentlyAttendedEvents } from "./recentlyAttendedEvents";
import { QuickAccess } from "../Navigation/quickAccess";

const ProfileWrapper: AnyStyledComponent = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-bottom: 2rem;

  @media all and (min-width: 900px) {
    padding-left: 20rem;
  }
`;

const AttendedEventsWrapper: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 2.5rem;

  @media all and (min-width: 600px) {
    padding: 0 4rem;
    margin-bottom: 0;
  }

  @media all and (min-width: 960px) {
    padding: 0;
    width: 86%
    max-width: 80rem;
  }

  @media all and (min-width: 1280px) {
    flex-direction: row;
  }
`;

const QuickAccessMargins: AnyStyledComponent = styled.div`
  width: 100%;
  padding: 0 1.25rem;
  display: flex;
  justify-content: center;

  @media all and (min-width: 600px) {
    display: none;
  }
`;

export const ProfilePage: React.FC<{}> = () => {
  return (
    <ProfileWrapper>
      <ProfileHeader />
      <Membership />
      <AttendedEventsWrapper>
        <Participation />
        <RecentlyAttendedEvents />
      </AttendedEventsWrapper>
      <QuickAccessMargins>
        <QuickAccess />
      </QuickAccessMargins>
    </ProfileWrapper>
  );
};
