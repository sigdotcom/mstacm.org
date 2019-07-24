import React from "react";
import styled from 'styled-components';
import { Link } from 'react-scroll';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 110px;
  background: #F4F5F8;

  button:hover {
    background: #FFF;
    color: #42C0FC;
  }

  @media all and (max-width: 1300px) {
    margin-top: -5px;
  }

  @media all and (max-width: 1200px) {
    margin-top: -9px;
  }

  @media all and (max-width: 1100px) {
    margin-top: -13px;
  }

  @media all and (max-width: 1000px) {
    margin-top: -18.5px;
  }

  @media all and (max-width: 900px) {
    margin-top: -22px;
  }
`

const Logo = styled.img`
  width: 85px;
  margin-left: 5%;

  @media all and (max-width: 1300px) {
    width: 77px;
  }

  @media all and (max-width: 1200px) {
    width: 72px;
  }

  @media all and (max-width: 1100px) {
    width: 65px;
  }

  @media all and (max-width: 1000px) {
    width: 56px;
  }

  @media all and (max-width: 900px) {
    width: 51px;
  }
`

const MenuItems = styled.div`
  display: flex;
  justify-content: space-between;
  width: 425px;
  margin-left: 4%;

  @media all and (max-width: 1300px) {
    width: 382px;
  }

  @media all and (max-width: 1200px) {
    width: 353px;
  }

  @media all and (max-width: 1100px) {
    width: 325px;
  }

  @media all and (max-width: 1000px) {
    width: 283px;
  }

  @media all and (max-width: 900px) {
    width: 254px;
  }

  @media all and (max-width: 800px) {
    display: none;
  }
`

const MenuItem = styled.a`
  color: #376B83;
  font-weight: 600;
  font-size: 24px;

  @media all and (max-width: 1300px) {
    font-size: 21.5px;
  }

  @media all and (max-width: 1200px) {
    font-size: 20px;
  }

  @media all and (max-width: 1100px) {
    font-size: 18.5px;
  }

  @media all and (max-width: 1000px) {
    font-size: 16px;
  }

  @media all and (max-width: 900px) {
    font-size: 14.5px;
  }
`

const SignIn = styled.button`
  position: absolute;
  right: 5%;
  background: #42C0FC;
  border: none;
  border-radius: 30px;
  width: 200px;
  height: 50px;
  color: #FFF;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  transition: 0.3s;

  @media all and (max-width: 1300px) {
    width: 175px;
    height: 45px;
    font-size: 16px
  }

  @media all and (max-width: 1200px) {
    width: 150px;
    height: 40px;
    font-size: 14px
  }

  @media all and (max-width: 1100px) {
    width: 125px;
    height: 35px;
    font-size: 12px
  }

  @media all and (max-width: 1000px) {
    width: 100px;
    height: 30px;
    font-size: 10px
  }

  @media all and (max-width: 900px) {
    width: 85px;
    height: 25px;
    font-size: 8px;
  }

  @media all and (max-width: 800px) {
    width: 85px;
    height: 30px;
    font-size: 10px;
  }
`

const Nav: React.FC<{}> = () => {
  const handleSignIn = () => {
  
  }
  
  return (
    <Wrapper>
      <Logo src={require('../../../../static/img/acm-logo-small.svg')}/>
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