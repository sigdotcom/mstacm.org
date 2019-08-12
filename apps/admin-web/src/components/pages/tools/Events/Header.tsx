import React, { useState } from "react";
import styled from "styled-components";

import { Button } from "antd";
import { EventFormModal } from "./EventFormModal";

const Wrapper: any = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header: React.FC<{}> = (): any => {
  const [visible, setVisible]: any = useState(false);

  const addEvent: any = (): any => {
    setVisible(true);
  };

  return (
    <Wrapper>
      <h1>Events</h1>
      <Button onClick={addEvent}>Add Event</Button>
      <EventFormModal visible={visible} setVisible={setVisible} />
    </Wrapper>
  );
};

export { Header };
