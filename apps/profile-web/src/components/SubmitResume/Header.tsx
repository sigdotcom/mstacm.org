import React from "reactn";
import styled from "styled-components";

const Wrapper: any = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header: React.SFC<{}> = (): JSX.Element => {
  return (
    <Wrapper>
      <h1>Submit Resume</h1>
    </Wrapper>
  );
};

export { Header };
