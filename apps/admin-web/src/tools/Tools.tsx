import React from "react";
import { ToolBox } from "./ToolsBox";
import styled, { AnyStyledComponent } from "styled-components";
//Placeholder until we get a statistic page to replace this
const Grid: AnyStyledComponent = styled.div`
  display: grid;
  height: 100%;
  grid-gap: 40px;
  padding-top: 30px;
  width: 50%;
  margin: auto;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-rows: repeat(3, 1fr);
`;

const ToolList: React.FC<{}> = (): JSX.Element => {
  return (
    <div>
      <Grid>
        <ToolBox link="/events/upcoming" tool="Upcoming events" />
        <ToolBox link="/events/previous" tool="Previous events" />
        <ToolBox link="/membership" tool="Membership" />
        <ToolBox link="/redemption" tool="Redemption" />
      </Grid>
    </div>
  );
};

export { ToolList };
