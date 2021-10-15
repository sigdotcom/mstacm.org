import React, { FunctionComponent, useEffect, useState } from "react";
import styled, { AnyStyledComponent } from "styled-components";
import { useLocation, Link } from "react-router-dom";

interface INavButtonProps {
  text: string;
  link: string;
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

const NavButton: FunctionComponent<INavButtonProps> = ({
  text,
  link,
  children,
}): JSX.Element => {
  const [background, setBackground] = useState("#087abb");
  const [color, setColor] = useState("white");
  useEffect(() => {
    if (location.pathname === link) {
      setBackground("#f4f5f8");
      setColor("#087abb");
    } else {
      setBackground("#087abb");
      setColor("white");
    }
  });
  const location = useLocation();

  const active: React.CSSProperties = {
    backgroundColor: background,
    color: color,
    transition: "all 0.17s ease-in-out",
  };

  return (
    <div>
      <div>
        <Link to={link}>
          <div style={active}>
            <ButtonText>{text}</ButtonText>
            {children}
          </div>
        </Link>
      </div>
    </div>
  );
};

export { NavButton };
