import React from "react";

import styled, { AnyStyledComponent } from "styled-components";

const MembershipWrapper: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding: 0 1.25rem;
  margin-bottom: 2.5rem;
  width: 100%;

  @media all and (min-width: 960px) {
    padding: 0;
    width: 86%
    max-width: 80rem;
  }

  @media all and (min-width: 1280px) {
    margin-bottom: 4rem;
  }
`;

const MembershipTitle: AnyStyledComponent = styled.div`
  font-size: 1.25rem;
  font-weight: 800;
  color: black;

  @media all and (min-width: 960px) {
    display: none;
  }
`;

const MembershipMain: AnyStyledComponent = styled.div`
  background: #FF858C;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

const JoinedInfo: AnyStyledComponent = styled.div`
  display: none;

  @media all and (min-width: 600px) {
    background: #2567E7;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-radius: 12px;
  }
`;

const JoinedInfoText: AnyStyledComponent = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: .75rem auto;
  font-weight: 800;

  @media all and (min-width: 960px) {
    font-size: 1.125rem;
  }

  @media all and (min-width: 1280px) {
    font-size: 1.5rem;
    margin: 1rem auto;
  }
`;

const NoBold: AnyStyledComponent = styled.span`
  font-weight: normal;
`;

const EventsInfo: AnyStyledComponent = styled.div`
  background: #2A3660;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 66.66%;
  border-radius: 12px;
  height: 100%;

  @media all and (min-width: 1280px) {
    width: 70%;
  }
`;

const EventsInfoText: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  margin: auto;
  font-weight: 800;

  @media all and (min-width: 960px) {
    font-size: 1.125rem;
  }

  @media all and (min-width: 1280px) {
    font-size: 1.5rem;
  }
`;

const YearsPass: AnyStyledComponent = styled.div`
  color: #D2DCEE;
`;

const EventsLater: AnyStyledComponent = styled.div`
  font-size: 1rem;

  @media all and (min-width: 960px) {
    font-size: 1.125rem;
  }

  @media all and (min-width: 1280px) {
    font-size: 2rem;
    line-height: 40px;
  }
`;

const LeavingInfo: AnyStyledComponent = styled.div`
  background: #7A1E60;
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;

  @media all and (min-width: 1280px) {
    width: 45%;
  }
`;

const LeavingInfoText: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  font-weight: 800;

  @media all and (min-width: 960px) {
    font-size: 1.125rem;
  }

  @media all and (min-width: 1280px) {
    font-size: 1.5rem;
  }
`;

const MembershipStatus: AnyStyledComponent = styled.div`
  background: #FF858C;
  border-radius: 12px;
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
  margin: .5rem 0;

  @media all and (min-width: 340px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media all and (min-width: 600px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const MembershipExpirationMonth: AnyStyledComponent = styled.div`
  color: white;
  font-size: 1.125rem;
  width: 9rem;

  @media all and (min-width: 340px) {
    display: flex;
    width: 16rem;
  }

  @media all and (min-width: 600px) {
    margin-right: 2rem;
  }

  @media all and (min-width: 1280px) {
    font-size: 1.375rem
    width: 19rem;

    div {
      white-space: nowrap;
    }
  }
`;

const ExpirationMonth: AnyStyledComponent = styled.div`
  color: white;
  font-weight: 900;

  @media all and (min-width: 340px) {
    margin-left: .5rem;
  }
`;

const RenewLink: AnyStyledComponent = styled.a`
  color: #295FC9;
  font-weight: 900;
  font-size: 1.25rem;
  width: 4.25rem;

  @media all and (min-width: 340px) {
    width: 8rem;
  }

  @media all and (min-width: 1280px) {
    font-size: 1.375rem
    white-space: nowrap;
    width: 9rem;
  }
`;

interface MembershipStatusProps {
  dateJoined: string;
  numEventsAttended: number;
  graduationDate: string;
  membershipExpiration: string;
}

export const Membership: React.FC<MembershipStatusProps> = (
  props: MembershipStatusProps
) => {
  return (
    <MembershipWrapper>
      <MembershipTitle>Membership</MembershipTitle>
      <MembershipMain>
        <JoinedInfo>
          <JoinedInfoText>
            <div>Joined S&T ACM</div>
            <div><NoBold>in</NoBold> {props.dateJoined}</div>
          </JoinedInfoText>
          <EventsInfo>
            <EventsInfoText>
              <YearsPass>2 YEARS PASS</YearsPass>
              <EventsLater>{props.numEventsAttended} EVENTS LATER</EventsLater>
            </EventsInfoText>
            <LeavingInfo>
              <LeavingInfoText>
                <div>Leaving S&T ACM</div>
                <div><NoBold>in</NoBold> {props.graduationDate}</div>
              </LeavingInfoText>
            </LeavingInfo>
          </EventsInfo>
        </JoinedInfo>
        <MembershipStatus>
          <MembershipExpirationMonth>
            <div>ACM Member</div>
            <ExpirationMonth>Until {props.membershipExpiration}</ExpirationMonth>
          </MembershipExpirationMonth>
          <RenewLink href="#">Renew Now?</RenewLink>
        </MembershipStatus>
      </MembershipMain>
    </MembershipWrapper >
  );
};
