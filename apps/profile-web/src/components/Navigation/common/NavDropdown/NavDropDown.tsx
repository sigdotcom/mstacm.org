import React, { FunctionComponent, useEffect, useState } from "react";
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
	@media (max-width: 600px) {
		padding-left: 20px;
		padding-top: 20px;
		font-size: 18px;
	}
`;
const Drop: AnyStyledComponent = styled.div`
	margin-left: 50px;
	@media (max-width: 600px) {
		margin-left: 20px;
	}
`;

const NavDropDown: FunctionComponent<IDropDownProps> = ({
  navTitle,
  navLink,
  linkData,
  children,
}): JSX.Element => {
  const [background, setBackground] = useState("#087abb");
  const [color, setColor] = useState("white");
  const [display, setDisplay] = useState("none");
  const [textColor, setTextColor] = useState("white");

  useEffect(() => {
    if (location.pathname === navLink) {
      setBackground("#f4f5f8");
      setColor("#087abb");
      setDisplay("");
      setTextColor("#0D5D8B");
    } else {
      setBackground("#087abb");
      setColor("white");
      setDisplay("none");
      setTextColor("white");
    }
    if (location.pathname === linkData) {
      setBackground("#f4f5f8");
      setColor("#087abb");
      setDisplay("");
      setTextColor("#0D5D8B");
    }
  });
  const location = useLocation();

  const active: React.CSSProperties = {
    backgroundColor: background,
    color: color,
    transition: "all 0.17s ease-in-out",
  };
  const text: React.CSSProperties = {
    color: textColor,
  };
  const drop: React.CSSProperties = {
    display: display,
    transition: "all 0.17s ease-in-out",
  };

  return (
    <div>
      <div style={active}>
        <Link to={navLink}>
          <div style={text}>
            <ButtonText>{navTitle}</ButtonText>
          </div>
          <Drop>
            <div style={drop}>{children}</div>
          </Drop>
        </Link>
      </div>
    </div>
  );
};

export { NavDropDown };
