import React, { useState } from "react";
import { useWindowSize } from "react-use";
import { scaleDown as Menu } from "react-burger-menu";
import styled, { AnyStyledComponent } from "styled-components";
import logo from "./acm-logo.png";
import { ProfileOptions } from "./Profile";
import { NavButton } from "./common/NavButton";
import { NavDropDownContent } from "./common/NavDropdown/NavDropDownContent";
import { NavDropDown } from "./common/NavDropdown/NavDropDown";

const Center: AnyStyledComponent = styled.div`
  padding-top: 40px;
  width: 230px;
  background-color: #087abb;
  height: 100vh;
  overflow: hidden;
  font-family: Nunito Sans;
  display: flex;
  position: fixed;
  // border-radius: 0px 50px 50px 0px;
  color: white;
  flex-direction: column;
  @media (max-width: 1530px) {
    width: 100%;
    position: relative;
  }
`;

const Side: AnyStyledComponent = styled.ul`
  padding-left: 0;
`;

const Acmtext: AnyStyledComponent = styled.div`
  font-family: Nunito Sans;
  font-style: normal;
  font-weight: bold;
  user-select: none;

  font-size: 24px;
`;

const Acm: AnyStyledComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
`;

const LogMobile: AnyStyledComponent = styled.div`
  display: flex;
  font-family: Nunito Sans;

  align-items: center;
  padding-top: 30px;
  justify-content: center;
  z-index: 10;
`;

const Img = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 10px;
  user-select: none;
`;

function Sidebar() {
  const [link, setLink] = useState();
  const linkCallback = (data: any) => {
    setLink(data);
  };

  const { width } = useWindowSize();

  const content = (
    <div>
      <Acm>
        <Img src={logo}></Img>
        <Acmtext>S&amp;T ACM</Acmtext>
      </Acm>

      <Side>
        <NavDropDown
          linkData={link}
          navTitle="Events"
          navLink="/events/upcoming"
        >
          <NavDropDownContent
            dropDownTitle="Upcoming"
            dropDownLink="/events/upcoming"
            siblingCallBack={linkCallback}
          />
          <NavDropDownContent
            dropDownTitle="Previous"
            dropDownLink="/events/previous"
            siblingCallBack={linkCallback}
          />
        </NavDropDown>
        <NavButton text="Membership" link="/membership"></NavButton>
        <NavButton text="Redemption" link="/redemption" />
      </Side>
    </div>
  );

  if (width <= 1530) {
    return (
      <Menu>
        <Center>
          {content}
          <LogMobile>
            <ProfileOptions />
          </LogMobile>
        </Center>
      </Menu>
    );
  } else {
    return <Center>{content}</Center>;
  }
}

export default Sidebar;
