import React from "react";
import styled from "styled-components";
import { ISIG } from "./interfaces";

import { config } from "../../../../config";

const SIGListWrapper: any = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  flex: 1;
  min-width: 340px;
`;

const Item: any = styled.li`
  border-radius: 6px;
  transition: ease-in-out 0.1s all;
  cursor: pointer;
  height: 50px;
  min-width: 155px;
  max-width: 200px;
  width: calc(50% - 15px);
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.25);
  margin-bottom: 15px;
  margin-right: 15px;

  &:hover {
    box-shadow: 0 4px 10px -2px rgba(0, 0, 0, 0.3);
  }

  h3 {
    margin: 0;
  }
`;

const Logo: any = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  margin: 0 10px 0 10px;
`;

function SIGListItem(props: any): any {
  const { sig, index, selected, setSelected }: any = props;
  const onClick: any = (): any => {
    setSelected(index);
  };
  let styles: any = {};
  if (selected === index) {
    styles = {
      background: sig.color,
      boxShadow: "none"
    };
  }

  return (
    <Item style={styles} onClick={onClick}>
      <Logo src={`${config.CDN_URI}/static/${sig.logoLinkDark}`} />
      <h3>{sig.name}</h3>
    </Item>
  );
}

function SIGList(props: any): any {
  const { sigs, selected, setSelected }: any = props;

  return (
    <SIGListWrapper>
      {sigs.map((sig: ISIG, index: number) => (
        <SIGListItem
          sig={sig}
          index={index}
          key={index}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
    </SIGListWrapper>
  );
}

export { SIGList };
