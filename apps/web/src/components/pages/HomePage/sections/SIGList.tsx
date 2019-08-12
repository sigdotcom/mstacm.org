import React from "react";
import styled from "styled-components";
import { ISIG } from "./interfaces";

const SIGListWrapper: any = styled.ul`
  list-style: none;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const Item: any = styled.li`
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  margin-bottom: 20px;
  transition: ease-in-out 0.1s all;
  cursor: pointer;
  position: relative;
  z-index: 4;

  &:hover {
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.4);
  }

  h3 {
    padding: 2px 12px;
    width: 200px;
  }
`;

function SIGListItem(props: any): any {
  const { sig, index, selected, setSelected }: any = props;
  const onClick: any = (): any => {
    setSelected(index);
  };
  let styles: any = {};
  if (selected === index) {
    styles = {
      boxShadow: "0 6px 12px 0 rgba(0,0,0,0.5)"
    };
  }
  return (
    <Item style={styles} onClick={onClick}>
      <h3>ACM {sig.name}</h3>
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
