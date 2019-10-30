import React from "react";
import styled, { AnyStyledComponent } from "styled-components";

import { PrimaryButton } from "../../../../components/PrimaryButton";
import { useAuth0 } from "../../../../utils/react-auth0-wrapper";

const MembershipTierContainer: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0.5rem 2rem 0.5rem 2rem;

  transition: all 0.4s linear;

  min-width: 300px;
  height: 300px;

  border: 1.5px solid #c1c1c1;
  border-radius: 0.5rem !important;
  overflow: hidden;
`;

export const Header: AnyStyledComponent = styled.h2`
  background-color: rgb(243, 247, 249);
  color: rgb(78, 97, 108);

  padding: 0.5rem 4rem;

  vertical-align: middle;
  text-align: center;
  font-size: 2rem;
`;

const Cost: AnyStyledComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;

  font-size: 5rem;
  font-weight: bold;
`;

interface ITierContainerProps {
  title: string;
  cost: string;
  onClick?: () => void;
}

export const TierContainer: React.SFC<ITierContainerProps> = (
  props: ITierContainerProps
): JSX.Element => {
  const { isAuthenticated }: { isAuthenticated: boolean } = useAuth0();

  return (
    <MembershipTierContainer>
      <Header>{props.title}</Header>
      <Cost>
        <span style={{ fontSize: "4rem", fontWeight: "normal" }}>$</span>
        {props.cost}
      </Cost>

      <div style={{ margin: "auto auto 16px auto" }}>
        <PrimaryButton
          // disabled={!isAuthenticated}
          onClick={props.onClick}
        >
          {isAuthenticated && "BUY NOW"}
          {!isAuthenticated && "PLEASE LOGIN"}
        </PrimaryButton>
      </div>
    </MembershipTierContainer>
  );
};
