import gql from "graphql-tag";
import React from "react";

import styled, { AnyStyledComponent } from "styled-components";

import {
  useMeMembershipQuery,
  MeMembershipQueryHookResult
} from "../../generated/graphql"

export const ME_MEMBERSHIP_QUERY: any = gql`
  query MeMembership {
    me {
      graduationDate
      dateJoined
      membershipExpiration
      eventsAttended {
        eventTitle
      }
    }
  }
`;

const MembershipWrapper: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  padding: 0 1.25rem;
  margin-bottom: 2.5rem;

  @media all and (min-width: 760px) {
    padding: 0 4rem;
  }

  @media all and (min-width: 900px) {
    padding: 0;
  }

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
  line-height: 1.25rem;
  font-weight: 800;
  color: black;
  margin-bottom: .75rem;

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
  margin: .75rem 1.5rem;
  font-size: 1.25rem;
  color: white;
  display: flex;
  align-items: center;

  @media all and (min-width: 380px) {
    flex-direction: column;
    justify-content: center;
  }

  @media all and (min-width: 530px) {
    flex-direction: row;
  }

  @media all and (min-width: 1280px) {
    font-size: 1.375rem
  }
`;

const ExpirationContent: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
  width: 70%;

  @media all and (min-width: 380px) {
    flex-direction: row;
    width: auto;
    margin-right: 0;
  }

  @media all and (min-width: 530px) {
    margin-right: 2.5rem;
  }
`;

const ExpirationMonth: AnyStyledComponent = styled.div`
  font-weight: 900;

  @media all and (min-width: 380px) {
    margin-left: .3rem;
  }
`;

const RenewLink: AnyStyledComponent = styled.a`
  color: #295FC9;
  font-weight: 900;
  width: 30%;

  @media all and (min-width: 380px) {
    width: auto;
  }
`;

const LoadingComponent: AnyStyledComponent = styled.div`
  width: 100%;
  padding: 0 1.25rem;

  .content {
    height: 3rem;
    width: 100%;
    margin: 0 auto 2.5rem;
    border-radius: 20px;
    background: linear-gradient(
      115deg, #E9EBEE 30%, #F6F7FA 80%
    );
    transition: all 100ms ease-in-out;
  }

  @media all and (min-width: 600px) {
    .content {
      height: 6rem;
    }
  }

  @media all and (min-width: 760px) {
    padding: 0 4rem;
  }

  @media all and (min-width: 900px) {
    padding: 0 1.25rem;
  }

  @media all and (min-width: 960px) {
    padding: 0;

    .content {
      height: 9.375rem;
      width: 86%
      max-width: 80rem;
    }
  }

  @media all and (min-width: 1280px) {
    div {
      margin-bottom: 4rem;
    }
  }
`;

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

export const Membership: React.FC<{}> = (): JSX.Element => {
  const { loading, error, data }: MeMembershipQueryHookResult = useMeMembershipQuery();

  console.log(error, data, monthNames);

  if (loading) {
    return (
      <LoadingComponent>
        <MembershipTitle>Membership</MembershipTitle>
        <div className="content" />
      </LoadingComponent>
    );
  }
  if (error) {
    return (
      <LoadingComponent>
        <MembershipTitle>Membership</MembershipTitle>
        <div className="content" />
      </LoadingComponent>
    );
  }

  let eventsAttended = 0, yearsSinceJoin = 0;
  let dateJoined = "", graduationDate = "", membershipExpirationDate = "";

  if (data && data.me && data.me.eventsAttended) {
    eventsAttended = data.me.eventsAttended.length;
    const me = data.me;
    let tempDate = new Date(me.dateJoined);
    yearsSinceJoin = new Date().getFullYear() - tempDate.getFullYear();
    dateJoined = monthNames[tempDate.getMonth()] + " " + tempDate.getFullYear();
    tempDate = new Date(me.graduationDate);
    graduationDate = monthNames[tempDate.getMonth()] + " " + tempDate.getFullYear();
    tempDate = new Date(me.membershipExpiration);
    membershipExpirationDate = monthNames[tempDate.getMonth()];
  }

  return (
    <MembershipWrapper>
      <MembershipTitle>Membership</MembershipTitle>
      <MembershipMain>
        <JoinedInfo>
          <JoinedInfoText>
            <div>Joined S&T ACM</div>
            <div><NoBold>in</NoBold> {dateJoined}</div>
          </JoinedInfoText>
          <EventsInfo>
            <EventsInfoText>
              <YearsPass>{yearsSinceJoin} YEARS PASS</YearsPass>
              <EventsLater>{eventsAttended} EVENTS LATER</EventsLater>
            </EventsInfoText>
            <LeavingInfo>
              <LeavingInfoText>
                <div>Leaving S&T ACM</div>
                <div><NoBold>in</NoBold> {graduationDate}</div>
              </LeavingInfoText>
            </LeavingInfo>
          </EventsInfo>
        </JoinedInfo>
        <MembershipStatus>
          <ExpirationContent>
            <div>ACM Member</div>
            <ExpirationMonth>
              Until {membershipExpirationDate}
            </ExpirationMonth>
          </ExpirationContent>
          <RenewLink href="#">Renew Now?</RenewLink>
        </MembershipStatus>
      </MembershipMain>
    </MembershipWrapper >
  );
};
