import React from "react";
import styled from "styled-components";

import debug from "debug";

import { EventList } from "./EventList";
import { Header } from "./Header";

const log: any = debug("warden:events");
log.log = console.log.bind(console);

const PageWrapper: any = styled.div`
  margin: 0 auto;
  padding: 15px;
  max-width: 800px;
`;

const Events: React.FC<{}> = (): any => {
  return (
    <PageWrapper>
      <Header />
      <EventList />
    </PageWrapper>
  );
};

export { Events };
