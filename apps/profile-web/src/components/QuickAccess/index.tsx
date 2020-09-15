import React from "react";

import styled, { AnyStyledComponent } from "styled-components";

const Box: AnyStyledComponent = styled.div`
  background: #324177;

  h1 {
    color: white;
  }
`;

export const QuickAccess: React.FC<{}> = () => {
  return (
    <Box>
      <h1>Quick Access</h1>
    </Box>
  );
};
