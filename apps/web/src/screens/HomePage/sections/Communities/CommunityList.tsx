import React from "react";
import styled from "styled-components";
import { ICommunity } from "./interfaces";

import { config } from "../../../../config";

const CommunityListWrapper: any = styled.ul`
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

function CommunityListItem(props: any): any {
  const { community, index, selected, setSelected }: any = props;
  const onClick: any = (): any => {
    setSelected(index);
  };
  let styles: any = {};
  if (selected === index) {
    styles = {
      background: community.color,
      boxShadow: "none"
    };
  }

  return (
    <Item style={styles} onClick={onClick}>
      <Logo src={`${config.CDN_URI}/static/${community.logoLinkDark}`} />
      <h3>{community.name}</h3>
    </Item>
  );
}

function CommunityList(props: any): any {
  const { communities, selected, setSelected }: any = props;

  return (
    <CommunityListWrapper>
      {communities.map((community: ICommunity, index: number) => (
        <CommunityListItem
          community={community}
          index={index}
          key={index}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
    </CommunityListWrapper>
  );
}

export { CommunityList };
