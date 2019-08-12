import React from "react";

import { useQuery } from "@apollo/react-hooks";
import debug from "debug";

import styled from "styled-components";

import { Event } from "./Event";
import { GET_EVENTS } from "./helpers";
import { IEvent } from "./interfaces";

const log: any = debug("warden:events");
log.log = console.log.bind(console);

const PageWrapper: any = styled.div`
  margin: 0 auto;
  padding: 15px;
  max-width: 800px;
`;
const List: any = styled.ul`
  padding: 0;
  margin: 0;
`;

const EventList: React.FC<{}> = (): any => {
  const { loading, error, data }: any = useQuery(GET_EVENTS);
  log("Refreshed page");

  if (loading) {
    return (
      <PageWrapper>
        <h3>Loading...</h3>;
      </PageWrapper>
    );
  } else if (error) {
    return (
      <PageWrapper>
        <h3>{error.toString()}</h3>;
      </PageWrapper>
    );
  } else {
    const events: IEvent[] = data.events;
    return (
      <PageWrapper>
        <List>
          {events.map((event: IEvent) => (
            <Event event={event} key={event.id} />
          ))}
        </List>
      </PageWrapper>
    );
  }
};

export { EventList };
