import * as React from "react";
import styled from "styled-components";
import {Link} from "react-scroll";

const HLine = styled.div`
    align-items: center;
    width: 70%;
    margin-left: 15%;
    border-top: 3px solid #D1D6D8;

    @media all and (max-width: 680px) {
        margin-left: 7.5%;
        width: 85%;
    }
`

const Foot = styled.div`
    display: Flex;
    flex-direction: column;
    height: 300px;
    background: #DFE6E9;

    @media all and (max-width: 680px) {
        height: 100%;
    } 
`
const Links = styled.div`
    display: flex;
    justify-content: space-between;
    width: 70%;
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 50px;

    a {
        margin-top: 10px;
        font-size: 20px;
        color: #092B35;
    }

    a:hover {
        color: #42C0FC;
    }

    @media all and (max-width: 680px) {
        width: 100%;
        margin: 0;
        margin-left: 10px;
        margin-top: 30px;
        align-items: center;
        flex-direction: column;
    } 

`

const Nav1 = styled.div`
    display: flex;
    flex-direction: column;

    @media all and (max-width: 680px) {
        flex-direction: row;

        img {
            width: 70px;
            margin-left: 30px;
        }

        h2 {
            margin-top: 60px;
            font-size: 15px;
        }
    } 
`

const Nav2 = styled.div`
    display: flex;
    flex-direction: column;

    @media all and (max-width: 680px) {
        display: none;
    } 
`

const Nav3 = styled.div`
    display: flex;
    flex-direction: column;

    @media all and (max-width: 680px) {
        width: 85%;
        flex-direction: row;
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
    flex-direction: column;

    @media all and (max-width: 680px) {
        width: 85%;
        flex-direction: row;
    } 
`

const Nav4a = styled.div`
    display: flex;
    flex-direction: column;

    @media all and (max-width: 680px) {
        width: 50%;
    } 
`

const Nav4b = styled.div`
    display: flex;
    flex-direction: column;

    @media all and (max-width: 680px) {
        width: 50%;
    } 
`


const Footer: React.FC<{}> = () => {
    return (
        <Foot>
            <HLine></HLine>
            <Links>
                <Nav2>
                    <Link to="about" smooth={true}><a>About Us</a></Link>
                    <Link to="groups" smooth={true}><a>Groups</a></Link>
                    <Link to="events" smooth={true}><a>Events</a></Link>
                    <Link to="sponsors" smooth={true}><a>Sponsors</a></Link>
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
                    <img src={require('../../../../static/img/navlogo.svg')}></img>
                    <h2>Copyright © 2019 ACM Web.</h2>
            </Nav1>
        </Foot>
    );
};

export { Footer };