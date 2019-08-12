import React, { useState } from "react";
import styled from "styled-components";
import { SIGDetailPane } from "./SIGDetailPane";
import { SIGList } from "./SIGList";

const DisplayWrapper: any = styled.div`
  display: flex;
  max-width: 900px;
  width: 100%;
  padding: 15px;
  margin: auto;
  justify-content: space-between;
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
