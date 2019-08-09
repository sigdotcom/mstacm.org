import React from "react";
import styled from 'styled-components';
import { Link } from 'react-scroll';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 120px;
  background: #F4F5F8;

  button:hover {
    background: #FFF;
    color: #42C0FC;
    cursor: pointer;
  }

  @media all and (max-width: 1600px) {
    margin-top: -5px;
  }

  @media all and (max-width: 1400px) {
    margin-top: -9px;
  }

  @media all and (max-width: 1200px) {
    margin-top: -13px;
  }

  @media all and (max-width: 1000px) {
    margin-top: -18.5px;
  }
`

const Logo = styled.img`
  width: 85px;
  margin-left: 5%;

  @media all and (max-width: 1400px) {
    width: 77px;
  }

  @media all and (max-width: 1200px) {
    width: 72px;
  }

  @media all and (max-width: 1000px) {
    width: 56px;
  }

  @media all and (max-width: 480px) {
    width: 72px;
  }
`

const MenuItems = styled.div`
  display: flex;
  justify-content: space-between;
  width: 375px;
  margin-left: 4%;

  @media all and (max-width: 1400px) {
    width: 337px;
  }

  @media all and (max-width: 1200px) {
    width: 311px;
  }

  @media all and (max-width: 1000px) {
    width: 275px;
  }

  @media all and (max-width: 800px) {
    display: none;
  }
`

const MenuItem = styled.a`
  color: #376B83;
  font-weight: 600;
  font-size: 20px;

  @media all and (max-width: 1400px) {
    font-size: 18px;
  }

  @media all and (max-width: 1200px) {
    font-size: 16.5px;
  }

  @media all and (max-width: 1000px) {
    font-size: 15px;
  }
`

const SignIn = styled.button`
  position: absolute;
  right: 5%;
  background: #42C0FC;
  border: none;
  border-radius: 30px;
  width: 150px;
  height: 50px;
  color: #FFF;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  transition: 0.3s;

  @media all and (max-width: 1400px) {
    width: 125px;
    height: 45px;
    font-size: 16px;
  }

  @media all and (max-width: 1200px) {
    width: 110px;
    height: 40px;
    font-size: 16px;
  }

  @media all and (max-width: 1000px) {
    width: 95px;
    height: 35px;
    font-size: 14px;
  }

  @media all and (max-width: 480px) {
    width: 125px;
    height: 45px;
    font-size: 17px;
    background: inherit;
    color: #2D9CDB;
    border: 3px solid #2D9CDB;
    box-shadow: none;
  }
`

const Nav: React.FC<{}> = () => {
  const handleSignIn = () => {
  
  }
  
  return (
    <Wrapper>
      <Logo src={require('../../../../static/img/acm-logo.png')}/>
      <MenuItems>
        <Link to='about' smooth={true}><MenuItem>About</MenuItem></Link>
        <Link to='groups' smooth={true}><MenuItem>Groups</MenuItem></Link>
        <Link to='events' smooth={true}><MenuItem>Events</MenuItem></Link>
        <Link to='sponsors' smooth={true}><MenuItem>Sponsors</MenuItem></Link>
      </MenuItems>
      <SignIn onClick={handleSignIn}>SIGN IN</SignIn>
    </Wrapper>
  );
};

export default Nav;