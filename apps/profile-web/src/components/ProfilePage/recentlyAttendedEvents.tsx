import gql from "graphql-tag";
import React from "react";

import styled, { AnyStyledComponent } from "styled-components";
import Icon from "react-eva-icons";

import {
  useMeEventsQuery,
  MeEventsQueryHookResult
} from "../../generated/graphql"

export const ME_EVENTS_QUERY: any = gql`
  query MeEvents {
    me {
      eventsAttended {
        dateHosted
        hostSig {
          name
        }
        eventTitle
        description
        location
      }
    }
  }
`;

const RecentlyAttendedEventsWrapper: AnyStyledComponent = styled.div`
  display: none;

  @media all and (min-width: 400px) {
    display: block;
    width: 100%;
  }

  div:last-child {
    margin-bottom: 0;
  }
`;

const Header: AnyStyledComponent = styled.div`
  font-size: 1.25rem;
  line-height: 1.25rem;
  font-weight: 800;
  color: black;
  margin-bottom: .75rem;
  padding-left: 1.25rem;

  @media all and (min-width: 760px) {
    padding-left: 0;
  }

  @media all and (min-width: 900px) {
    padding-left: 1.25rem;
  }

  @media all and (min-width: 960px) {
    line-height: 1.5rem;
    font-size: 1.5rem;
    padding-left: 0;
  }
`;

const EventBox: AnyStyledComponent = styled.div`
  display: flex;
  max-width: 40rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.15);
  padding: 1.875rem 2rem;
  margin-bottom: 2rem;

  @media all and (min-width: 600px) {
    margin-left: 1.25rem;
    margin-right: 1.25rem;
  }

  @media all and (min-width: 760px) {
    margin-left: 0;
    margin-right: 0;
  }

  @media all and (min-width: 900px) {
    margin-left: 1.25rem;
    margin-right: 1.25rem;
  }

  @media all and (min-width: 960px) {
    margin-left: 0;
    margin-right: 0;
  }
`;

const EventPoster: AnyStyledComponent = styled.div`
  height: 10rem;
  width: 7rem;
  background: black;
  border-radius: 4px;
  margin-right: 2rem;
`;

const EventContent: AnyStyledComponent = styled.div`
  height: 10rem;
  width: 100%;
  overflow-x: auto;
`;

const EventHeader: AnyStyledComponent = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: .5rem;
  width: 100%;

  @media all and (min-width: 1400px) {
    flex-direction: row;
    align-items: center;
  }
`;

const EventTitle: AnyStyledComponent = styled.div`
  margin-right: 2.5rem;
  font-weight: 300;
  font-size: 1.5rem;
  line-height: 2rem;
  color: black;
`;

const EventSig: AnyStyledComponent = styled.div`
  padding: .25rem .75rem;
  border-radius: 12px;
  background: #E8BFF6;
  font-size: 12px;
  line-height: 16px;
  font-weight: normal;
  color: black;
`;

const EventInfo: AnyStyledComponent = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  color: black;
  margin-bottom: .5rem;
`;

const EventDescription: AnyStyledComponent = styled.div`
  font-weight: 300;
  font-size: 18px;
  line-height: 25px;
  color: #555555;
`;

const LoadingWrapperWrapper: AnyStyledComponent = styled.div`
  display: none;

  @media all and (min-width: 400px) {
    display: block;
    width: 100%;
    margin-top: 2.5rem;
  }

  @media all and (min-width: 1280px) {
    margin-bottom: 0;
  }
`;

const LoadingWrapper: AnyStyledComponent = styled.div`
  max-width: 40rem;
  display: flex;
  flex-direction: column;

  @media all and (min-width: 1280px) {
    margin-left: auto;
  }
`;

const LoadingContent: AnyStyledComponent = styled.div`
  height: 11rem;
  border-radius: 12px;
  margin: 0 1.25rem;
  background: linear-gradient(
    115deg, #E9EBEE 30%, #F6F7FA 80%
  );

  @media all and (min-width: 760px) {
    margin: 0;
  }

  @media all and (min-width: 900px) {
    margin: 0 1.25rem;
  }

  @media all and (min-width: 960px) {
    height: 14rem;
    margin: 0;
  }
`;

const FindEventsBox: AnyStyledComponent = styled.div`
  width: 100%;
  padding: 0 1.25rem;
  margin-top: 2.5rem;

  div {
    width: 100%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    background: #fff;
    min-width: 17.5rem;
    max-width: 20rem;
    height: 7rem;
    border-radius: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  i {
    display: flex;
  }

  @media all and (min-width: 760px) {
    padding: 0;
  }

  @media all and (min-width: 900px) {
    padding: 0 1.25rem;
  }

  @media all and (min-width: 960px) {
    padding: 0;
  }
`;

const FindEventsLink: AnyStyledComponent = styled.a`
  font-size: 1rem;
  color: #ababab;
  margin-right: .2rem;
`;

export const RecentlyAttendedEvents: React.FC<{}> = () => {
  const { loading, error, data }: MeEventsQueryHookResult = useMeEventsQuery();

  let eventBoxes: JSX.Element[] | JSX.Element = [];

  if (loading) {
    return (
      <LoadingWrapperWrapper>
        <LoadingWrapper>
          <Header>Recently Attended Events</Header>
          <LoadingContent />
        </LoadingWrapper>
      </LoadingWrapperWrapper>
    );
  } else if (error) {
    return (
      <FindEventsBox>
        <div>
          <FindEventsLink href="#">
            Find our events here
          </FindEventsLink>
          <Icon
            name="external-link"
            size="medium"
            fill="#ababab"
          />
        </div>
      </FindEventsBox>
    );
  } else if (data && data.me && data.me.eventsAttended) {
    eventBoxes = data.me.eventsAttended.map((event: any, index: number): JSX.Element =>
      <EventBox key={index}>
        <EventPoster></EventPoster>
        <EventContent>
          {(event.eventTitle || event.hostSig.name) && <EventHeader>
            {event.eventTitle && <EventTitle>{event.eventTitle}</EventTitle>}
            {event.hostSig.name && <EventSig>ACM {event.hostSig.name}</EventSig>}
          </EventHeader>}
          {(event.dateHosted || event.location) && <EventInfo>
            {event.dateHosted}{event.dateHosted && event.location && " @ "}{event.location}
          </EventInfo>}
          {event.description && <EventDescription>{event.description.slice(0, 130)}...</EventDescription>}
        </EventContent>
      </EventBox>
    );
  }

  return (
    <RecentlyAttendedEventsWrapper>
      <Header>Recently Attended Events</Header>
      {eventBoxes}
    </RecentlyAttendedEventsWrapper>
  );
};
