import React from "react";
import { scaleDown as Menu } from "react-burger-menu";
import { Link, useLocation } from "react-router-dom";
import styled, { AnyStyledComponent } from "styled-components";
import logo from "./acm-logo.png";
// import { ProfileOptions } from "./Profile";
const Center1: AnyStyledComponent = styled.div`
  padding-top: 40px;
  width: 100%;
  background-color: #087abb;
  height: 100%;
  overflow: hidden;
  font-family: Nunito Sans;
  display: flex;
  color: white;
  flex-direction: column;
  transition: all 1s ease-in-out;
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
// const Log: AnyStyledComponent = styled.div`
//   height: 10vh;
//   display: flex;
//   font-family: Nunito Sans;
//   background-color: #0d5d8b;
//   align-items: center;
//   padding-top: 20px;
//   justify-content: center;
//   z-index: 10;
// `;
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
const IsThere = styled.div`
  @media (min-width: 1500px) {
    display: none;
  }
`;
function Sidebarm() {
  const location = useLocation();

  const mystyle = {
    backgroundColor: "#087abb",
    color: "white",
    transition: "all 0.17s ease-in-out",
    borderRadius: "50px 0px 0px 50px",
  };
  const mystyle1 = {
    backgroundColor: "#087abb",
    color: "white",
    transition: "all 0.17s ease-in-out",
    borderRadius: "50px 0px 0px 50px",
  };
  const mystyle2 = {
    backgroundColor: "#087abb",
    color: "white",
    transition: "all 0.17s ease-in-out",
    borderRadius: "50px 0px 0px 50px",
  };
  const upcoming = {
    color: "#0D5D8B",
  };
  const previous = {
    color: "#0D5D8B",
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
    location.pathname == "/events/upcoming" ||
    location.pathname == "/events/previous"
  ) {
    mystyle.backgroundColor = "#f4f5f8";
    mystyle.color = "#087abb";
    drop.display = "";
    color.color = "#0D5D8B";
  }

  if (location.pathname == "/membership") {
    mystyle1.backgroundColor = "#f4f5f8";
    mystyle1.color = "#087abb";
  }
  if (location.pathname == "/events/upcoming") {
    upcoming.color = "#000";
  }
  if (location.pathname == "/events/previous") {
    previous.color = "#000";
  }
  if (location.pathname == "/redemption") {
    mystyle2.backgroundColor = "#f4f5f8";
    mystyle2.color = "#087abb";
  }
  return (
    <IsThere>
      <Menu>
        <Center1>
          <Acm>
            <Img src={logo}></Img>
            <Acmtext>S&amp;T ACM</Acmtext>
          </Acm>

          <Side>
            <div style={mystyle}>
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
              <div style={mystyle1}>
                <Item>Membership</Item>
              </div>
            </Link>
            <Link to="/redemption">
              <div style={mystyle2}>
                <Item>Redemption</Item>
              </div>
            </Link>
          </Side>
        </Center1>
      </Menu>
    </IsThere>
  );
}

export default Sidebarm;
