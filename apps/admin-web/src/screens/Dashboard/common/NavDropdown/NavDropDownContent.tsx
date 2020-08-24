import React, { FunctionComponent, useState } from "react";
import styled, { AnyStyledComponent } from "styled-components";
import { useLocation, Link } from "react-router-dom";

interface IDropDownContentProps {
  dropDownTitle: string;
  dropDownLink: string;
  siblingCallBack: Function;
}

const DropItem: AnyStyledComponent = styled.div`
  border-left: 1px solid #d3d3d3;
  padding-left: 10px;
  color: #0d5d8b;
`;
const NavDropDownContent: FunctionComponent<IDropDownContentProps> = ({
  dropDownTitle,
  dropDownLink,
  siblingCallBack,
}): JSX.Element => {
  const location = useLocation();
  const [childLink, setChildLink] = useState("");
  const dropColor = {
    color: "#0D5D8B",
  };
  const handleClick = () => {
    setChildLink(dropDownLink);
  };
  if (location.pathname === dropDownLink) {
    dropColor.color = "#000";
  }

  siblingCallBack(childLink);

  return (
    <div onClick={handleClick}>
      <Link to={dropDownLink}>
        <DropItem>
          <div style={dropColor}>{dropDownTitle}</div>
        </DropItem>
      </Link>
    </div>
  );
};

export { NavDropDownContent };
