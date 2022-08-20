import React from "react";
import gql from "graphql-tag";

import { EventData } from "./EventData";
import styled, { AnyStyledComponent } from "styled-components";
import { Collapse } from "./common/Collapse";
import { NextWeekList } from "./EventList";
import { ThisWeekList } from "./EventList";
import { Future } from "./EventList";
import { UpcomingHeader } from "./Header";

import {
  Event as IEvent,
  GetCurrentEventsQueryHookResult,
  useGetCurrentEventsQuery,
} from "../../generated/graphql";
export const GET_CURRENT_EVENTS_QUERY: any = gql`
  query getCurrentEvents {
    currentEvents {
      id
      dateCreated
      dateHosted
      dateExpire
      hostSig {
        name
      }
      eventTitle
      description
      location
      flierLink
      eventLink
    }
  }
`;

const Grid: AnyStyledComponent = styled.div`
  height: 100vh;
  display: grid;
  width: 100%;
  margin: auto;
  position: relative;
  grid-template-columns: repeat(16, 1fr);
  grid-template-areas: "c c c c c c c c c c c c t t t t";
  @media (max-width:  1300px) {
    grid-template-columns: 1fr
    grid-template-areas:     
            "c"
            "t";
  }
`;

const EventDataLayout: AnyStyledComponent = styled.div`
  background-color: white;
  grid-area: t;
  height: 100%;
  width: 100%;
  @media (max-width: 1300px) {
    display: none;
  }
`;
const PageWrapper: AnyStyledComponent = styled.div`
  padding-left: 70px;
  padding-top: 50px;
  @media (max-width: 900px) {
    padding-top: 50px;
    padding-left: 0;
  }
`;
const Center: AnyStyledComponent = styled.div`
  padding: 10px;
  @media (max-width: 900px) {
    display: flex;
  }
`;
const Content: AnyStyledComponent = styled.div`
  grid-area: c;
  @media (max-width: 1500px) {
    grid-row: 1;
  }
`;

const Upcoming: React.FC<{}> = (): JSX.Element => {
  const result: GetCurrentEventsQueryHookResult = useGetCurrentEventsQuery();
  let data: IEvent[] = [];
  if (result.data && result.data.currentEvents) {
    data = result.data.currentEvents as IEvent[];
  }
  const loading = result.loading;
  const error = result.error;

  return (
    <Grid>
      <Content>
        <PageWrapper>
          <Center>
            <UpcomingHeader />
          </Center>

          <Collapse
            week="This week"
            list={<ThisWeekList loading={loading} error={error} data={data} />}
          />
          <Collapse
            week="Next week"
            list={<NextWeekList loading={loading} error={error} data={data} />}
          />
          <Collapse
            week="Future"
            list={<Future loading={loading} error={error} data={data} />}
          />
        </PageWrapper>
      </Content>
      <EventDataLayout>
        <EventData />
      </EventDataLayout>
    </Grid>
  );
};

export { Upcoming };
