import React, { useState } from "react";
import styled from "styled-components";

import { Button } from "antd";
import { EventFormModal } from "./EventFormModal";

const Wrapper: any = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header: React.SFC<{}> = (): JSX.Element => {
  const [formVisible, setFormVisible] = useState(false);
  const addEvent: () => void = (): void => {
    setFormVisible(true);
  };

  return (
    <Wrapper>
      <h1>Events</h1>
      <Button onClick={addEvent}>Add Event</Button>
      <EventFormModal
        formVisible={formVisible}
        setFormVisible={setFormVisible}
      />
    </Wrapper>
  );
};

export { Header };
