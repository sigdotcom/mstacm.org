import React from "react";
import styled from "styled-components";

import { Button } from "antd";

const Wrapper: any = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header: React.FC<any> = (props: any): any => {
  const addEvent: any = (): any => {
    props.setActiveEvent(null);
    props.setVisible(true);
  };

  return (
    <Wrapper>
      <h1>Events</h1>
      <Button onClick={addEvent}>Add Event</Button>
    </Wrapper>
  );
};

export { Header };
