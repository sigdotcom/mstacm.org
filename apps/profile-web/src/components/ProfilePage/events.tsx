import React from "react";

import styled, { AnyStyledComponent } from "styled-components";

const EventsWrapper: AnyStyledComponent = styled.div`
  position: absolute;
  bottom: 0;
  transform: translateY(50%);
  background: white;
  border-radius: 50px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);

  @media all and (min-width: 600px) {
    display: none;
  }
`;

const WrapperWrapper: AnyStyledComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  margin: 0 1.5rem;
`;

const NumberAttended: AnyStyledComponent = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #333333;
  margin-right: .5rem;
`;

const EventsAttended: AnyStyledComponent = styled.div`
  font-size: 0.94rem;
  font-weight: 400;
  width: 4rem;
  color: #333333;
`;

export const Events: React.FC<{}> = () => {
  return (
    <EventsWrapper>
      <WrapperWrapper>
        <NumberAttended>35</NumberAttended>
        <EventsAttended>Events attended</EventsAttended>
      </WrapperWrapper>
    </EventsWrapper>
  );
};
