import React from "react";
import styled, { AnyStyledComponent } from "styled-components";
import { OfficerCard } from "./OfficerCard";
import ClayProfile from "./common/clay.png";


export interface IOfficer {
  img: string;
  firstName: string;
  lastName: string;
  role: string;
}

const OfficersList: React.SFC<{}> = (): JSX.Element => {
  // dummy data
  const officersData: IOfficer[] = [
    {
      "img": ClayProfile,
      "firstName": "Carter",
      "lastName": "Wagner",
      "role": "Web Chair"
    },
    {
      "img": ClayProfile,
      "firstName": "Carter",
      "lastName": "Wagner",
      "role": "Web Chair"
    },
    {
      "img": ClayProfile,
      "firstName": "Carter",
      "lastName": "Wagner",
      "role": "Web Chair"
    },
    {
      "img": ClayProfile,
      "firstName": "Carter",
      "lastName": "Wagner",
      "role": "Web Chair"
    },
    {
      "img": ClayProfile,
      "firstName": "Carter",
      "lastName": "Wagner",
      "role": "Web Chair"
    },
    {
      "img": ClayProfile,
      "firstName": "Carter",
      "lastName": "Wagner",
      "role": "Web Chair"
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
