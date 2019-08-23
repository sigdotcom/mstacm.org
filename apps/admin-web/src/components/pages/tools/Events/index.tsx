import React, { useState } from "react";
import styled from "styled-components";

import debug from "debug";

import { EventFormModal } from "./EventFormModal";
import { EventList } from "./EventList";
import { Header } from "./Header";

const log: any = debug("warden:events");
log.log = console.log.bind(console);

const PageWrapper: any = styled.div`
  margin: 0 auto;
  padding: 15px;
  max-width: 800px;
`;

const Events: React.FC<{}> = (): any => {
  const [visible, setVisible]: any = useState(false);
  const [activeEvent, setActiveEvent]: any = useState(null);

  return (
    <PageWrapper>
      <Header setVisible={setVisible} setActiveEvent={setActiveEvent} />
      <EventList setVisible={setVisible} setActiveEvent={setActiveEvent} />
      <EventFormModal
        visible={visible}
        setVisible={setVisible}
        event={activeEvent}
      />
    </PageWrapper>
  );
};

export { Events };
