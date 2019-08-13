import * as React from "react";
import styled from "styled-components";
import {Link} from "react-scroll";

const HLine = styled.div`
  width: 85%;
  margin-left: 7.5%;
  border-top: 3px solid #D1D6D8;

  @media all and (max-width: 680px) {
    margin-left: 0;
  } 
`

const Foot = styled.div`
  height: 100%;
  padding: 50px 0;

  @media all and (max-width: 680px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding: 0;
  } 
`
const Links = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-top: 15px;
  float: right;

  a {
    margin-bottom: 10px;
    font-size: 20px;
    color: #092B35;
  }

  a:hover {
    color: #42C0FC;
  }

  @media all and (max-width: 1200px) {
    a {
      font-size: 18px;
    }
  } 

  @media all and (max-width: 1000px) {
    a {
      font-size: 16px;
    }
  } 

  @media all and (max-width: 800px) {
    width: 65%;

    a {
      font-size: 15px;
    }
  } 

  @media all and (max-width: 680px) {
    width: 100%;
    margin: 0;
    padding-left: 10px;
    margin-top: 30px;
    align-items: center;
    flex-direction: column;

    a {
      font-size: 20px;
    }
  } 

`

const Nav1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: -15px;
  padding-left: 7.5%
  width: 35%;

  h2 {
    font-size: 20px;
  }

  img {
    width: 150px;
  }

  @media all and (max-width: 1200px) {
    margin-top: -23px
    
    h2 {
      font-size: 18px;
    }
  }
  
  @media all and (max-width: 1000px) {
    margin-top: -8px;

    h2 {
      font-size: 16px;
    }

    img {
      width: 125px;
    }
  }

  @media all and (max-width: 800px) {
    margin-top: -10px;

    h2 {
      font-size: 12px;
    }
  }

  @media all and (max-width: 680px) {
    align-items: center;
    margin-top: 15px;
    padding: 0;
    width: 100%;

    h2 {
      font-size: 16px;
    }
  } 
`

const Nav2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;

  @media all and (max-width: 680px) {
    display: none;
  } 
`

const Nav3 = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;

  @media all and (max-width: 680px) {
    width: 85%;
    flex-direction: row;
    margin-left: 0;
    margin-bottom: 35px;
  } 
`

const Nav3a = styled.div`
  display: flex;
  flex-direction: column;

  @media all and (max-width: 680px) {
    width: 50%;
  } 
`

const Nav3b = styled.div`
  display: flex;
  flex-direction: column;

  @media all and (max-width: 680px) {
    width: 50%;
  } 
`

const Nav4 = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;

  @media all and (max-width: 680px) {
    width: 85%;
    flex-direction: row;
  } 
`

const Nav4a = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`

const Nav4b = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`

const Footer: React.FC<{}> = () => {
  return (
    <div style={{background: "#DFE6E9"}}>
      <HLine></HLine>
      <Foot>
        <Links>
          <Nav2>
            <Link to="about" smooth={true}>About Us</Link>
            <Link to="groups" smooth={true}>Groups</Link>
            <Link to="events" smooth={true}>Events</Link>
            <Link to="sponsors" smooth={true}>Sponsors</Link>
          </Nav2> 
          <Nav3>
            <Nav3a>
              <a href="https://github.com/sigdotcom/mstacm.org/blob/master/LICENSE" target="_blank">License</a>
              <a href="https://github.com/sigdotcom/mstacm.org" target="_blank">Source Code</a>
            </Nav3a>
            <Nav3b>
              <a href="https://www.acm.org/" target="_blank">About ACM</a>
              <a href="https://women.acm.org/" target="_blank">About ACM-W</a>
            </Nav3b>
          </Nav3>
          <Nav4>
            <Nav4a>
              <a href="https://discordapp.com/invite/4t954Ad" target="_blank">ACM Comp</a>
              <a href="https://modata.blog/" target="_blank">ACM Data</a>
              <a href="https://siggame.io/" target="_blank">ACM Game</a>
            </Nav4a>
            <Nav4b>
              <a href="https://pickhacks.io/" target="_blank">ACM Hack</a>
              <a href="https://acmsigsec.mst.edu/" target="_blank">ACM Sec</a>
              <a href="https://mst.orgsync.com/org/acmw/home" target="_blank">ACM-W</a>
            </Nav4b>
          </Nav4>
        </Links>
        <Nav1>
            <img src={require('../../../../static/img/web.png')}></img>
            <h2>Copyright © 2019 ACM Web.</h2>
        </Nav1>
      </Foot>
    </div>
  );
};

export { Footer };