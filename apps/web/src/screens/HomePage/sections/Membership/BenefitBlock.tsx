import React from "react";
import Icon from "react-eva-icons";
import styled, { AnyStyledComponent } from "styled-components";

const BenefitContainer: AnyStyledComponent = styled.div`
  flex-basis: 100%;

  padding: 16px;
`;

const BenefitIconContainer: AnyStyledComponent = styled.div`
  margin-top: 8px;
  margin-bottom: 16px;
`;

export interface IBenefitBlockProps {
  iconName: string;
  title: string;
  description: string;
}

export const BenefitBlock: React.FC<IBenefitBlockProps> = (
  props: IBenefitBlockProps
): JSX.Element => {
  return (
    <BenefitContainer>
      <BenefitIconContainer>
        <Icon name={props.iconName} size="xlarge" fill="#777" />
      </BenefitIconContainer>
      <h2 style={{ fontSize: "19px" }}>{props.title}</h2>
      <p style={{ fontSize: "17px" }}>{props.description}</p>
    </BenefitContainer>
  );
};
