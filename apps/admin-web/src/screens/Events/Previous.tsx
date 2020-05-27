import React from "react";
import styled, { AnyStyledComponent } from "styled-components";

import { PrevioustList } from "./EventList";

import { PreviousHeader } from "./Header";

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

const Previous: React.SFC<{}> = (): JSX.Element => {
  return (
    <PageWrapper>
      <Center>
        <PreviousHeader />
      </Center>
      <PrevioustList />
    </PageWrapper>
  );
};

export { Previous };
