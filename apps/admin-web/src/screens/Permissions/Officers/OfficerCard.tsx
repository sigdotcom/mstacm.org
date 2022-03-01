import React from "react";
import styled, { AnyStyledComponent } from "styled-components";
import { IOfficer } from "./OfficersList";

interface IOfficerProps {
  value: IOfficer;
}

const OfficerCard: React.FC<any> = (props: IOfficerProps): JSX.Element => {
  const data = props.value;

  const OfficerCard: AnyStyledComponent = styled.div`
    flex: 1;
    height: 320px;
    min-width: 260px;
    max-width: 260px;
    padding: 10px;
    margin: 30px;
    user-select: none;
    background-color: white;
    border-radius: 12px;
    padding-top: 10px;
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08);
    font-weight: bold;
    font-size: 20px;
    text-align: center;
    &:hover {
      cursor: pointer;
    }
  `;
  
  return (
    <OfficerCard>
      <div>{data.firstName} {data.lastName}</div>
    </OfficerCard>
  );
};

export { OfficerCard };
