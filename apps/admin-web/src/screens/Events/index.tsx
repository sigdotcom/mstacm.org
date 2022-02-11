import React from "react";
import styled, { AnyStyledComponent } from "styled-components";

import { EventList } from "./EventList";
import { Header } from "./Header";

const PageWrapper: AnyStyledComponent = styled.div`
  margin: 0 auto;
  padding: 15px;
  max-width: 800px;
`;

const Events: React.SFC<{}> = (): JSX.Element => {
  return (
    <PageWrapper>
      <Header />
      <EventList />
    </PageWrapper>
  );
};

export { Events };
