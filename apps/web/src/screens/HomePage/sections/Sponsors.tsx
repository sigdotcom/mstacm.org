import * as React from "react";
import { Element } from "react-scroll";
import styled from "styled-components";

import { config } from "../../../config";

const SponsorWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #dfe6e9;
`;

const Sponsor = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 30px;

  h2 {
    font-weight: 800;
    font-size: 50px;
  }

  @media all and (max-width: 1200px) {
    h2 {
      font-size: 45px;
    }
  }

  @media all and (max-width: 1000px) {
    h2 {
      font-size: 40px;
    }
  }

  @media all and (max-width: 800px) {
    h2 {
      font-size: 35px;
    }
  }

  @media all and (max-width: 680px) {
    padding-top: 55px;
    width: 90%;
    margin-left: 5%;

    h2 {
      font-size: 35px;
    }
  }
`;

const Logos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: #DFE6E9;

  a {
    width: 50%;
    margin-bottom: 20px;
  }

  img {
    background: #fff;
    width: 100%;
    padding: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  @media all and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30px;
    margin-bottom: 60px;
    width: 85%
    margin-left: 7.5%;

    a {
      width: 15%;
      margin: 0
    }

    img:hover {
      width: 110%;
      margin: -5%;
    }
  }
`;

const Sponsors: React.FC<{}> = (): JSX.Element => {
  return (
    <SponsorWrap>
      <Element name="sponsors">
        <Sponsor>
          <h2>Big thanks to our sponsors and partners!</h2>
        </Sponsor>
        <Logos>
          <a
            href="https://www.auth0.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="Auth0 Logo" src={`${config.CDN_URI}/static/auth0.png`} />
          </a>
          <a
            href="https://www.att.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img alt="ATT Logo" src={`${config.CDN_URI}/static/at&t.png`} />
          </a>
          <a
            href="https://www.garmin.com/en-US/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="Garmin Logo"
              src={`${config.CDN_URI}/static/garmin.png`}
            />
          </a>
          <a
            href="https://www.netlify.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="Netlify Logo"
              src={`${config.CDN_URI}/static/netlify.png`}
            />
          </a>
          <a
            href="http://tradebot.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="Tradebot Logo"
              src={`${config.CDN_URI}/static/tradebot.png`}
            />
          </a>
          <a
            href="http://digitalocean.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="DigitalOcean Logo"
              src={`${config.CDN_URI}/static/digitalocean.svg`}
            />
          </a>
        </Logos>
      </Element>
    </SponsorWrap>
  );
};

export { Sponsors };
