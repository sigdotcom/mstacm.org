import * as React from "react";
import { Link } from "react-scroll";
import styled from "styled-components";

import { PageConstraint } from "../../../components/PageConstraint";

import { config } from "../../../config";

const HLine = styled.div`
  width: 85%;
  margin-left: 7.5%;
  border-top: 3px solid #d1d6d8;
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 50px 0;

  @media all and (max-width: 680px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding: 0;
  }
`;
const Links = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-top: 15px;
  float: right;

  a {
    margin-bottom: 10px;
    font-size: 15px;
    color: #496b75;
  }

  a:hover {
    color: #42c0fc;
  }

  @media all and (max-width: 1200px) {
    a {
      font-size: 15px;
    }
  }

  @media all and (max-width: 1000px) {
    a {
      font-size: 15px;
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
      font-size: 15px;
    }
  }
`;

const Copyright = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: -15px;
  padding-left: 7.5%
  width: 35%;

  h2 {
    font-size: 17px;
  }

  img {
    width: 150px;
  }

  @media all and (max-width: 1200px) {
    margin-top: -23px
    
    h2 {
      font-size: 17px;
    }
  }
  
  @media all and (max-width: 1000px) {
    margin-top: -8px;

    h2 {
      font-size: 17px;
    }

    img {
      width: 125px;
    }
  }

  @media all and (max-width: 800px) {
    margin-top: -10px;

    h2 {
      font-size: 17px;
    }
  }

  @media all and (max-width: 680px) {
    align-items: center;
    margin-top: 15px;
    padding: 0;
    width: 100%;

    h2 {
      font-size: 17px;
    }
  } 
`;

const PageLinks = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;

  @media all and (max-width: 680px) {
    display: none;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;

  div {
    display: flex;
    flex-direction: column;
  }

  @media all and (max-width: 680px) {
    width: 85%;
    flex-direction: row;

    div {
      width: 50%;
    }
  }
`;

const Communities = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;

  div {
    display: flex;
    flex-direction: column;
    width: 50%;
  }

  @media all and (max-width: 680px) {
    width: 85%;
    flex-direction: row;
    margin-bottom: 35px;
  }
`;

const Footer: React.FC<{}> = (): JSX.Element => {
  return (
    <div style={{ background: "#DFE6E9" }}>
      <PageConstraint>
        <HLine />
        <Wrapper>
          <Links>
            <PageLinks>
              <Link to="communities" smooth={true}>
                Communities
              </Link>
              <Link to="events" smooth={true}>
                Events
              </Link>
              <Link to="sponsors" smooth={true}>
                Sponsors
              </Link>
            </PageLinks>
            <Communities>
              <div>
                <a href="https://acmcomp.mst.edu" target="_blank">
                  ACM Competition
                </a>
                <a href="https://modata.blog/" target="_blank">
                  ACM Data
                </a>
                <a href="https://siggame.io/" target="_blank">
                  ACM Game
                </a>
              </div>
              <div>
                <a href="https://pickhacks.io/" target="_blank">
                  ACM Hack
                </a>
                <a href="https://acmsigsec.mst.edu/" target="_blank">
                  ACM Security
                </a>
                <a href="http://mst.orgsync.com/org/acmw/home" target="_blank">
                  ACM-W
                </a>
              </div>
            </Communities>
            <Info>
              <div>
                <a href="https://www.acm.org/" target="_blank">
                  ACM Global
                </a>
                <a
                  href="https://github.com/sigdotcom/mstacm.org"
                  target="_blank"
                >
                  Source Code
                </a>
              </div>
              <div>
                <a
                  href="https://github.com/sigdotcom/mstacm.org/blob/master/LICENSE"
                  target="_blank"
                >
                  License
                </a>
              </div>
            </Info>
          </Links>
          <Copyright>
            <img src={`${config.CDN_URI}/static/web_footer.png`} />
            <h2>Copyright © 2019 ACM Web.</h2>
          </Copyright>
        </Wrapper>
      </PageConstraint>
    </div>
  );
};

export { Footer };
