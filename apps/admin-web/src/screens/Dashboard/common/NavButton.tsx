import React, { FunctionComponent } from "react";
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
`;

const NavButton: FunctionComponent<INavButtonProps> = ({
  text,
  link,
  children,
}): JSX.Element => {
  const location = useLocation();

  const active: any = {
    backgroundColor: "#087abb",
    color: "white",
    transition: "all 0.17s ease-in-out",
  };

  if (location.pathname === link) {
    active.backgroundColor = "#f4f5f8";
    active.color = "#087abb";
  } else {
    active.color = "white";
  }

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
