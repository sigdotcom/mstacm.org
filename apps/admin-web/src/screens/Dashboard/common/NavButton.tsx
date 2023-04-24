import React, { FunctionComponent, useEffect, useState } from "react";
import styled, { AnyStyledComponent } from "styled-components";
import { useLocation, Link } from "react-router-dom";

interface INavButtonProps {
  text: string;
  link: string;
  image: any;
  imageActive: any;
  children?: any;
}
const ButtonText: AnyStyledComponent = styled.div`
  display: flex;
  font-family: sans-serif;
  padding-left: 30px;
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

const Img = styled.img`
  height: 20px;
  width: 20px;

  margin-right: 10px;

  margin-top: 7px;
  user-select: none;
`;
const ImageGroup: AnyStyledComponent = styled.div``;

const NavButton: FunctionComponent<INavButtonProps> = ({
  text,
  link,
  children,
  imageActive,
  image,
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

  const activeTab: boolean = location.pathname === link;

  return (
    <div>
      <div>
        <Link to={link}>
          <div style={active}>
            <ImageGroup>
              <ButtonText>
                <Img src={activeTab ? imageActive : image} />
                {text}
              </ButtonText>
            </ImageGroup>

            {children}
          </div>
        </Link>
      </div>
    </div>
  );
};

export { NavButton };
