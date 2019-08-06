import React from "react";
import styled from "styled-components";

const PaneWrapper: any = styled.div`
  border: 2px solid lightgray;
  border-radius: 10px;
`;

function SIGDetailPane(props: any): any {
  const { sig }: any = props;
  return (
    <PaneWrapper>
      <h3>{sig.name}</h3>
      <p>{sig.desc}</p>
    </PaneWrapper>
  );
}

export { SIGDetailPane };
