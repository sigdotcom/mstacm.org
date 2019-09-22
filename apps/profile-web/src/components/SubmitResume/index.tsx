import React, { useState } from "react";
import styled, { AnyStyledComponent } from "styled-components";

import { Header } from "./Header";
import { ResumeForm } from "./ResumeForm";
import { Success } from "./Success";

const PageWrapper: AnyStyledComponent = styled.div`
  margin: 0 auto;
  padding: 15px;
  max-width: 800px;
`;

const SubmitResume: React.FC<{}> = (): JSX.Element => {
  const [resumeUrl, setResumeUrl] = useState<string | undefined>(undefined);

  const refresh: () => void = (): void => {
    setResumeUrl(undefined);
  };

  if (resumeUrl) {
    return (
      <PageWrapper>
        <Success {...{ resumeUrl, refresh }} />
      </PageWrapper>
    );
  } else {
    return (
      <PageWrapper>
        <Header />
        <ResumeForm {...{ setResumeUrl }} />
      </PageWrapper>
    );
  }
};

export { SubmitResume };
