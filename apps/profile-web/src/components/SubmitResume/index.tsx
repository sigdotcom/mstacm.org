import React from "react";
import styled, { AnyStyledComponent } from "styled-components";

import { ResumeForm } from "./ResumeForm";
import { Header } from "./Header";

const PageWrapper: AnyStyledComponent = styled.div`
  margin: 0 auto;
  padding: 15px;
  max-width: 800px;
`;

const SubmitResume: React.SFC<{}> = (): JSX.Element => {
  return (
    <PageWrapper>
      <Header />
      <ResumeForm />
    </PageWrapper>
  );
};

export { SubmitResume };
