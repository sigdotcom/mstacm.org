import React from "react";
import styled from "styled-components";

import { useAuth0 } from "../../../utils/react-auth0-wrapper";

import { Options } from "../sections/Options";

const Thing = styled.div`
  position: relative;
`

const Name = styled.div`
  border: none;
  font-size: 17px;
  font-weight: bold;
  background: none;
  color: black;
  margin-right: 1em;
  margin-left: .5em;

  &:hover {
    cursor: pointer;
  }
`;

const Picture = styled.img`
  min-width: 30px;
  max-width: 30px;
  min-height: 30px;
  max-height: 30px;
  border-radius: 50%;
`

const Something = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
`

const TriangleDown = styled.div`
  height: 0;
  width: 0;
  border-top: 4px solid black;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
`

const TriangleRight = styled.div`
  height: 0;
  width: 0;
  margin-right: 4px;
  border-top: 4px solid transparent;
  border-left: 4px solid black;
  border-bottom: 4px solid transparent;
`

const ProfileOptions: React.FC<{}> = (): JSX.Element => {
  const { loading, user } = useAuth0();

  const [down, setDown] = React.useState(false);

  return (
    <Thing>
      <Something onClick={() => {if (down) {setDown(false)} else {setDown(true)}}}>
	{ !loading && <Picture src={user.picture} alt="Profile"></ Picture> }
	{ !loading && <Name>{user.name}</ Name> }
	{ down ? <TriangleDown /> : <TriangleRight /> }
      </ Something>
      { down && <Options /> }
    </Thing>
  );
};

export { ProfileOptions };
