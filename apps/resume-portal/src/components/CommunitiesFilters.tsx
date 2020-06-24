import React, { useGlobal } from "reactn";

import styled, { AnyStyledComponent } from "styled-components";

const CommunityList: AnyStyledComponent = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  label {
    white-space: nowrap;
  }
`;

const CommunityButton: AnyStyledComponent = styled.a`
  background: ${props =>
    props.theme.enabled ? "rgba(66, 192, 252, 0.05)" : "none"};
  border: 2px solid
    ${props =>
      props.theme.enabled ? "rgba(66,192,252, .8)" : "rgba(0, 0, 0, .2)"};
  border-radius: 8px;
  padding: 1px 14px;
  color: ${props =>
    props.theme.enabled ? "rgba(66,192,252, .8)" : "rgba(0, 0, 0, .3)"};
  font-weight: normal;
  transition: ease-in-out 0.2s all;
`;

const CommunitiesFilters = (): JSX.Element => {
  const [communityFilters, setCommunityFilters] = useGlobal("communityFilters");

  const flipCommunity = (name: string): void => {
    communityFilters[name] = !communityFilters[name];
    setCommunityFilters(communityFilters);
  };

  return (
    <CommunityList>
      {Object.entries(communityFilters).map(
        ([name, enabled]: [string, boolean]) => {
          return (
            <CommunityButton
              className="text-sm mr-3 mb-1 block text-gray-500 font-bold"
              key={name}
              onClick={(): void => flipCommunity(name)}
              theme={{ enabled }}
            >
              {name}
            </CommunityButton>
          );
        }
      )}
    </CommunityList>
  );
};

export { CommunitiesFilters };
