import React, { setGlobal } from "reactn";
import styled from "styled-components";

import { Button } from "antd";

const Wrapper: any = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header: React.SFC<{}> = (): JSX.Element => {
  const addEvent: () => void = (): void => {
    setGlobal({
      activeEvent: undefined,
      eventFormVisible: true
    });
  };

  return (
    <Wrapper>
      <h1>Events</h1>
      <Button onClick={addEvent}>Add Event</Button>
    </Wrapper>
  );
};

export { Header };
