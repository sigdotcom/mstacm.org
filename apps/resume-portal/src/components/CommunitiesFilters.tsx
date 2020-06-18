import React, { useGlobal } from "reactn";

import styled, { AnyStyledComponent } from "styled-components";

const CommunityList: AnyStyledComponent = styled.div`
  display: flex;
  flex-wrap: wrap;
  label {
    white-space: nowrap;
    }
`;

const CommunityButton: AnyStyledComponent = styled.a`
  background: ${props => props.theme.enabled ? "rgb(66, 192, 252)" : "none"};
  border: 2px solid rgb(66, 192, 252);
  border-radius: 12px;
  padding: 2px 12px;
  color: ${props => props.theme.enabled ? "white" : "rgb(66, 192, 252)"};
  font-weight: normal;
`;

const CommunitiesFilters = () => {
  const [communityFilters, setCommunityFilters] = useGlobal("communityFilters");

  const flipCommunity = (name: string) => {
      communityFilters[name] = !communityFilters[name]
      setCommunityFilters(communityFilters);
  }

  return (
    <CommunityList>
      {Object.entries(communityFilters).map(([name, enabled]: [string, boolean]) => {
        return (
        <CommunityButton className="text-sm ml-3 block text-gray-500 font-bold" key={name} onClick={()=>flipCommunity(name)} theme={{enabled}}>
            {name}
        </CommunityButton>
        );
      })}
    </CommunityList>
  );
}

export { CommunitiesFilters }
