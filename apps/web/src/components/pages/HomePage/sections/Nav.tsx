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
`

const Logo = styled.img`
  min-width: 85px;
  margin-left: 5%;
`

const MenuItems = styled.div`
  display: flex;
  justify-content: space-between;
  width: 425px;
  margin-left: 4%;

  @media all and (max-width: 800px) {
    display: none;
  }
`

const MenuItem = styled.a`
  color: #376B83;
  font-weight: 600;
  font-size: 24px;
`

const SignIn = styled.button`
  position: absolute;
  right: 5%;
  background: #42C0FC;
  border: none;
  border-radius: 30px;
  width: 15%;
  max-width: 200px;
  min-width: 100px;
  height: 50px;
  color: #FFF;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  transition: 0.3s;
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

export { Nav };