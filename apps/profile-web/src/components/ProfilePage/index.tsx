import React from "react";
import styled, { AnyStyledComponent } from "styled-components";

import { ProfileHeader } from "./profileHeader";
import { Membership } from "./membership";
import { Participation } from "./participation";
import { RecentlyAttendedEvents } from "./recentlyAttendedEvents";

const ProfileWrapper: AnyStyledComponent = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  transition: padding-left .1s ease-out;

  @media all and (min-width: 900px) {
    padding-left: 20rem;
  }
`;

const AttendedEventsWrapper: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1rem;

  @media all and (min-width: 500px) {
    margin-bottom: 2.5rem;
  }

  @media all and (min-width: 760px) {
    padding: 0 4rem;
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

export const ProfilePage: React.FC<{}> = () => {
  return (
    <ProfileWrapper>
      <ProfileHeader />
      <Membership />
      <AttendedEventsWrapper>
        <Participation />
        <RecentlyAttendedEvents />
      </AttendedEventsWrapper>
    </ProfileWrapper>
  );
};
