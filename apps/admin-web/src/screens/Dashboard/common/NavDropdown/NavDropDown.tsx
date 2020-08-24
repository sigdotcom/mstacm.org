import React, { FunctionComponent } from "react";
import styled, { AnyStyledComponent } from "styled-components";
import { useLocation, Link } from "react-router-dom";

interface IDropDownProps {
  navTitle: string;
  navLink: string;
  linkData?: string;
}
const ButtonText: AnyStyledComponent = styled.div`
  display: flex;
  font-family: Nunito Sans;
  padding-left: 50px;
  padding-top: 20px;
  font-size: 24px;

  user-select: none;
  cursor: pointer;
`;

const NavDropDown: FunctionComponent<IDropDownProps> = ({
  navTitle,
  navLink,
  linkData,
  children,
}): JSX.Element => {
  const location = useLocation();

  const active = {
    backgroundColor: "#087abb",
    color: "white",
    transition: "all 0.17s ease-in-out",
  };
  const color = {
    color: "white",
  };
  const drop = {
    marginLeft: "50px",
    display: "none",
    transition: "all 0.17s ease-in-out",
  };

  if (location.pathname === navLink) {
    active.backgroundColor = "#f4f5f8";
    active.color = "#087abb";
    drop.display = "";
    color.color = "#0D5D8B";
  } else {
    active.backgroundColor = "#087abb";
    active.color = "white";
  }

  if (location.pathname === linkData) {
    active.backgroundColor = "#f4f5f8";
    active.color = "#087abb";
    drop.display = "";

    color.color = "#0D5D8B";
  }
  return (
    <div>
      <div style={active}>
        <Link to={navLink}>
          <div style={color}>
            <ButtonText>{navTitle}</ButtonText>
          </div>
          <div style={drop}>{children}</div>
        </Link>
      </div>
    </div>
  );
};

export { NavDropDown };
