import React from "react";
import styled, { AnyStyledComponent } from "styled-components";

import Icon from "react-eva-icons";

export const IconContainer: AnyStyledComponent = styled.span`
  .eva-hover {
    display: flex
    align-content: center;
    justify-content: center;
    align-items: center;
  }
`;

export interface CenteredIconProps {
  name: string;
  size: "small" | "medium" | "large" | "xlarge";
  fill?: string;
}

export const CenteredIcon: React.FC<CenteredIconProps> = (
  props: CenteredIconProps
) => {
  return (
    <IconContainer>
      <Icon {...props} />
    </IconContainer>
  );
};
