import * as React from "reactn";
import styled, { AnyStyledComponent } from "styled-components";

const Wrapper: AnyStyledComponent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header: React.SFC = (): JSX.Element => {
  return (
    <Wrapper>
      <h1>Submit Resume</h1>
    </Wrapper>
  );
};

export { Header };
