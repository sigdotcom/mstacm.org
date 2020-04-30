import React from "react";
import styled from "styled-components";

import { useAuth0 } from "../utils/react-auth0-wrapper";

const LogoutBtn = styled.a`
  border-radius: 0 0 8px 8px;
  color: white;
  font-size: 12px;
  text-align: right;
`;

const Options: React.FC<{}> = (): JSX.Element => {
  const { logout } = useAuth0();

  const logoutClick = () => {
    logout({ returnTo: window.location.origin });
  };

  return <LogoutBtn onClick={logoutClick}>Log Out</LogoutBtn>;
};

export { Options };
