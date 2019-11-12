import React, { useState } from "react";
import styled from "styled-components";
import { CommunityDetailPane } from "./CommunityDetailPane";
import { CommunityList } from "./CommunityList";

const DisplayWrapper: any = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (min-width: 810px) {
    flex-direction: row;
  }
`;

function CommunitiesDisplay(props: any): any {
  const [selected, setSelected]: [number, any] = useState<number>(0);
  const { communities }: any = props;
  return (
    <DisplayWrapper>
      <CommunityList communities={communities} selected={selected} setSelected={setSelected} />
      <CommunityDetailPane community={communities[selected]} />
    </DisplayWrapper>
  );
}

export { CommunitiesDisplay };
