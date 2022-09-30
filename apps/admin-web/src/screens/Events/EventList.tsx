import React from "react";

import styled, { AnyStyledComponent } from "styled-components";

import { Event } from "./Event";

import { useEventsQuery } from "../../generated/graphql";

import { IEvent } from "./interfaces";

const PageWrapper: AnyStyledComponent = styled.div`
  margin: 0 auto;
  padding: 15px;
  max-width: 800px;
`;
const List: AnyStyledComponent = styled.ul`
  padding: 0;
  margin: 0;
`;

const EventList: React.SFC<{}> = (): JSX.Element => {
  const { loading, error, data }: any = useEventsQuery();

  if (loading) {
    return (
      <PageWrapper>
        <h3>Loading...</h3>
      </PageWrapper>
    );
  } else if (error) {
    return (
      <PageWrapper>
        <h3>{error.toString()}</h3>
      </PageWrapper>
    );
  } else {
    const events: IEvent[] = data.events;
    const listElements: JSX.Element[] = events.map(
      (event: IEvent, index: number) => (
        <Event event={event} index={index} key={event.id} />
      )
    );

    return (
      <PageWrapper>
        <List>{listElements}</List>
      </PageWrapper>
    );
  }
};

export { EventList };
