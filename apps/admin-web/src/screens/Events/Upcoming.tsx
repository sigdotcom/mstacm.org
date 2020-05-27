import React from "react";
import { EventData } from "./EventData";
import styled, { AnyStyledComponent } from "styled-components";
import { Collapse } from "./Collapse";
import { NextWeekList } from "./EventList";
import { ThisWeekList } from "./EventList";
import { Future } from "./EventList";
import { UpcomingHeader } from "./Header";
const Grid: AnyStyledComponent = styled.div`
  height: 100%;
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
  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
  }
`;
const Content: AnyStyledComponent = styled.div`
  grid-area: c;
  @media (max-width: 1500px) {
    grid-row: 1;
  }
`;

const Upcoming: React.SFC<{}> = (): JSX.Element => {
  return (
    <Grid>
      <Content>
        <PageWrapper>
          <Center>
            <UpcomingHeader />
          </Center>

          <Collapse week="This week" list={<ThisWeekList />} />
          <Collapse week="Next week" list={<NextWeekList />} />
          <Collapse week="Future" list={<Future />} />
        </PageWrapper>
      </Content>
      <EventDataLayout>
        <EventData />
      </EventDataLayout>
    </Grid>
  );
};

export { Upcoming };
