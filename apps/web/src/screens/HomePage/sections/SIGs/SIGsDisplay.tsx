import React, { useState } from "react";
import styled from "styled-components";
import { SIGDetailPane } from "./SIGDetailPane";
import { SIGList } from "./SIGList";

const DisplayWrapper: any = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (min-width: 810px) {
    flex-direction: row;
  }
`;

function SIGsDisplay(props: any): any {
  const [selected, setSelected]: [number, any] = useState<number>(0);
  const { sigs }: any = props;
  return (
    <DisplayWrapper>
      <SIGList sigs={sigs} selected={selected} setSelected={setSelected} />
      <SIGDetailPane sig={sigs[selected]} />
    </DisplayWrapper>
  );
}

export { SIGsDisplay };
