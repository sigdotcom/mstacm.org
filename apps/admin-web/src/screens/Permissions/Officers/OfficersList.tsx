import React from "react";
import styled, { AnyStyledComponent } from "styled-components";
import { OfficerCard } from "./OfficerCard";

export interface IOfficer {
  firstName: string;
  lastName: string;
}

const OfficersList: React.SFC<{}> = (): JSX.Element => {
  // dummy data
  const officersData: IOfficer[] = [
    {
      "firstName": "Carter",
      "lastName": "Wagner"
    },
    {
      "firstName": "Carter",
      "lastName": "Wagner"
    },
    {
      "firstName": "Carter",
      "lastName": "Wagner"
    },
    {
      "firstName": "Carter",
      "lastName": "Wagner"
    },
    {
      "firstName": "Carter",
      "lastName": "Wagner"
    },
    {
      "firstName": "Carter",
      "lastName": "Wagner"
    }
  ];

  const Wrapper: AnyStyledComponent = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: right;
    justify-content: center;
    margin-top: 25px;
    padding-left: 200px;
    padding-right: 200px;
  `;

  return (
    <Wrapper>
      {officersData.map((officer: IOfficer) => <OfficerCard value={officer} />)}
    </Wrapper>
  );
};

export { OfficersList };
