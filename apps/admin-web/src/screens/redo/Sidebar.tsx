import React from "react";
import { useWindowSize } from "react-use";
import { Link, useLocation } from "react-router-dom";
import { scaleDown as Menu } from "react-burger-menu";
import styled, { AnyStyledComponent } from "styled-components";
import logo from "./acm-logo.png";
import { ProfileOptions } from "./Profile";

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
  @media (max-width: 1500px) {
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
const Item = styled.li`
  display: flex;
  font-family: Nunito Sans;
  padding-left: 50px;
  padding-top: 20px;
  font-size: 24px;

  user-select: none;
  cursor: pointer;
`;
const Img = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 10px;
  user-select: none;
`;

const DropItem = styled.div`
  border-left: 2px solid #d3d3d3;
  padding-left: 15px;
  color: #0d5d8b;
`;
function Sidebar() {
  const location = useLocation();

  const eventStyle = {
    backgroundColor: "#087abb",
    color: "white",
    transition: "all 0.17s ease-in-out",
    // borderRadius: "50px 0px 0px 50px",
  };
  const membershipStyle = {
    backgroundColor: "#087abb",
    color: "white",
    transition: "all 0.17s ease-in-out",
    // borderRadius: "50px 0px 0px 50px",
  };
  const redemptionStyle = {
    backgroundColor: "#087abb",
    color: "white",
    transition: "all 0.17s ease-in-out",
    // borderRadius: "50px 0px 0px 50px",
  };
  const upcoming = {
    color: "#0D5D8B",
  };
  const previous = {
    color: "#0D5D8B",
    paddingBottom: "5px",
  };
  const color = {
    color: "white",
  };
  const drop = {
    marginLeft: "50px",
    display: "none",
    transition: "all 0.17s ease-in-out",
  };
  if (
    location.pathname === "/events/upcoming" ||
    location.pathname === "/events/previous"
  ) {
    eventStyle.backgroundColor = "#f4f5f8";
    eventStyle.color = "#087abb";
    drop.display = "";
    color.color = "#0D5D8B";
  }

  if (location.pathname === "/membership") {
    membershipStyle.backgroundColor = "#f4f5f8";
    membershipStyle.color = "#087abb";
  }
  if (location.pathname === "/events/upcoming") {
    upcoming.color = "#000";
  }
  if (location.pathname === "/events/previous") {
    previous.color = "#000";
  }
  if (location.pathname === "/redemption") {
    redemptionStyle.backgroundColor = "#f4f5f8";
    redemptionStyle.color = "#087abb";
  }

  const { width } = useWindowSize();

  const content = (
    <div>
      <Acm>
        <Img src={logo}></Img>
        <Acmtext>S&amp;T ACM</Acmtext>
      </Acm>

      <Side>
        <div style={eventStyle}>
          <Link to="/events/upcoming">
            <div style={color}>
              <Item>Events</Item>
            </div>
            <div style={drop}>
              <Link to="/events/upcoming">
                <DropItem>
                  <div style={upcoming}>Upcoming </div>
                </DropItem>
              </Link>

              <Link to="/events/previous">
                <DropItem>
                  <div style={previous}>Previous</div>
                </DropItem>
              </Link>
            </div>
          </Link>
        </div>

        <Link to="/membership">
          <div style={membershipStyle}>
            <Item>Membership</Item>
          </div>
        </Link>
        <Link to="/redemption">
          <div style={redemptionStyle}>
            <Item>Redemption</Item>
          </div>
        </Link>
      </Side>
    </div>
  );

  if (width <= 1500) {
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
