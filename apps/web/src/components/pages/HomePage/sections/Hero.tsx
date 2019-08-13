import React, { useState } from "react";
import styled from "styled-components";

import { PageConstraint } from "../../../common/PageConstraint";

const BG = styled.div`
  flex: 1;
`;

const HeroImage = styled.img`
  display: none;

  @media screen and (min-width: 768px) {
    width: 800px;
    display: block;
    opacity: 0.5;
    position: absolute;
    right: 5px;
    margin-top: -60px;
    margin-right: -80px;
    pointer-events: none;
  }
`;

const HeroTextWrapper = styled.div`
  position: absolute;
  height: 100vh;
  display: flex;
  align-items: center;
  top: 0;
  width: 100%;
  pointer-events: none;

  @media screen and (min-height: 1000px) {
    height: 600px;
  }
`;
const HeroText = styled.div`
  font-family: "Roboto";
  width: 100%;
  text-align: center;
  display: block;
  position: relative;
  z-index: 3;
  padding: 16vh 0;
  pointer-events: auto;

  @media screen and (min-height: 1000px) {
    padding: 12vh 0;
  }

  @media screen and (min-width: 768px) {
    text-align: left;
    padding-left: 40px;
  }

  @media screen and (min-width: 900px) {
    padding-left: 100px;
  }
`;

const Name = styled.h1`
  color: #2d9cdb;
  font-size: 62px;
  font-weight: bold;
  margin-bottom: -20px;
  padding: 0 20px;

  @media screen and (min-width: 768px) {
    padding: 0;
    font-size: 48px;
  }

  /*
  @media all and (max-width: 1475px) {
    font-size: 54px;
    margin-bottom: -22px;
  }

  @media all and (max-width: 1300px) {
    font-size: 48px;
    margin-bottom: -18px;
  }

  @media all and (max-width: 1150px) {
    font-size: 45px;
  }

  @media all and (max-width: 1000px) {
    font-size: 42px;
  }

  @media all and (max-width: 900px) {
    font-size: 40px;
  }

  @media all and (max-width: 680px) {
    font-size: 58px;
    margin-bottom: 10px;
  }

  @media all and (max-width: 425px) {
    font-size: 52px;
  }
  */
`;

const CatchPhrase = styled.h1`
  color: #646566;
  font-size: 28px;
  margin-bottom: 24px;
  padding: 0 20px;

  @media screen and (min-width: 768px) {
    font-size: 36px;
    margin-bottom: 8px;
    padding: 0;
  }
`;

const MailingText = styled.p`
  color: #376b83;
  font-size: 22px;
  font-weight: bold;
  font-family: Nunito Sans;
  margin-bottom: 0px;
  padding: 0 20px;

  @media screen and (min-width: 768px) {
    font-size: 17px;
    padding: 0;
  }
`;

const InputWrapper = styled.form`
  margin-top: 30px;

  @media screen and (min-width: 768px) {
    margin: 0;
  }
`;

const MailingInput = styled.input`
  background: #dcdfe9;
  border: none;
  border-radius: 30px;
  padding: 8px 26px;
  font-size: 17px;
`;

const MailingJoin = styled.button`
  background: #42c0fc;
  border: none;
  border-radius: 30px;
  margin-left: -45px;
  padding: 8px 34px;
  color: #fff;
  font-size: 17px;
  font-family: Nunito Sans;
  font-weight: bold;
  vertical-align: top;
  transition: 0.2s ease-in-out all;
  cursor: pointer;

  &:hover {
    background: #32b0ec;
  }
`;

const Hero: React.FC<{}> = () => {
  const [email, setEmail] = useState("");

  const handleClick = (e: any) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      // Valid email
    } else {
      // Invalid email
      alert("Invalid email.");
    }
    e.preventDefault();
  };

  return (
    <BG>
      <PageConstraint>
        <HeroTextWrapper>
          <HeroText>
            <Name>S&T ACM</Name>
            <CatchPhrase>
              <span style={{ fontWeight: "bold" }}>Tech</span>nically Impressive
            </CatchPhrase>
            <MailingText>
              Enjoy our perks and come to exclusive events.
            </MailingText>
            <InputWrapper>
              <MailingInput
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <MailingJoin onClick={handleClick}>JOIN</MailingJoin>
            </InputWrapper>
          </HeroText>
        </HeroTextWrapper>
        <HeroImage src={require("../../../../static/img/acm-logo-large.svg")} />
      </PageConstraint>
    </BG>
  );
};

export default Hero;
