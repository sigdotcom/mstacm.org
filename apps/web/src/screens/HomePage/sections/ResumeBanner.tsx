import React from "react";
import Icon from "react-eva-icons";
import styled, { AnyStyledComponent } from "styled-components";

const Fill: AnyStyledComponent = styled.div`
  width: 100%;
  background: wheat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 20px;
  font-size: 16px;
`;

const Linky: AnyStyledComponent = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 14px;
`;

const Padded: AnyStyledComponent = styled.span`
  margin-left: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  i {
    display: inline-flex;
  }
`;

const Details: AnyStyledComponent = styled.p`
  margin: 0;
`;

const ResumeBanner: React.SFC<{}> = (): JSX.Element => {
  return (
    <Fill>
      <Details>
        Submit your <strong>resume</strong> today to be a part of our{" "}
        <strong>exclusive resume database</strong>
      </Details>
      <Linky href="https://profile.mstacm.org">
        Submit Resume
        <Padded>
          <Icon name="link-2-outline" fill="#1890ff" />
        </Padded>
      </Linky>
    </Fill>
  );
};

export { ResumeBanner };
