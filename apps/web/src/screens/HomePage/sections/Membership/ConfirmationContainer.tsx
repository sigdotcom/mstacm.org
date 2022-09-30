import React from "react";
import styled, { AnyStyledComponent } from "styled-components";

const MembershipTierContainer: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0.5rem 2rem 0.5rem 2rem;

  transition: all 0.4s linear;

  min-width: 350px;
  height: 300px;

  border: 1.5px solid #c1c1c1;
  border-radius: 0.5rem !important;
  overflow: hidden;
`;

export const Header: AnyStyledComponent = styled.h2`
  background-color: rgb(243, 247, 249);
  color: rgb(78, 97, 108);

  padding: 0.5rem 4rem;
  margin-bottom: 0px;

  vertical-align: middle;
  text-align: center;
  font-size: 2rem;
`;

const ContentWrapper: AnyStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;

  height: 100%;
`;

const Subtitle: AnyStyledComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;

  font-size: 1.25rem;
`;

const Info: AnyStyledComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;

  font-size: 3rem;
  font-weight: bold;
`;

interface ITierContainerProps {
  date: string;
}

export const ConfirmationContainer: React.SFC<ITierContainerProps> = (
  props: ITierContainerProps
): JSX.Element => {
  const parsedDate: string = new Date(props.date).toLocaleDateString();
  return (
    <MembershipTierContainer>
      <Header>You're Good!</Header>
      <ContentWrapper>
        <Subtitle>Membership expires:</Subtitle>
        <Info>{parsedDate}</Info>
      </ContentWrapper>
    </MembershipTierContainer>
  );
};
