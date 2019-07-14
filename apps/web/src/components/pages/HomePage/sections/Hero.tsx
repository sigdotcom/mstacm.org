import React, { useState } from "react";
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 70vh;
  background: #F4F5F8;
  margin-top: -20px;
  position: relative;

  @media all and (max-width: 800px) {
    height: 300px;
    margin-bottom: -20px;
  }
`

const HeroImage = styled.img`
  position: absolute;
  width: 55%;
  margin-top: -1%;
  right: 5px;

  @media all and (max-width: 800px) {
    display: none;
  }
`

const HeroText = styled.div`
  padding-top: 10%;
  margin-left: 120px;
  font-family: 'Roboto';

  button:hover {
    background: #FFF;
    color: #42C0FC;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  }

  @media all and (max-width: 800px) {
    margin: 10px 40px;
    padding: 0;
    text-align: center;
  }
`

const Name = styled.h1`
  color: #2D9CDB;
  font-size: 62px;
  font-weight: bold;
  margin-bottom: -18px;
`

const CatchPhrase = styled.h1`
  color: #646566;
  font-size: 48px;

  @media all and (max-width: 800px) {
    margin-top: -27px;
    font-size: 27px;
  }
`

const MailingText = styled.p`
  color: #376B83;
  font-size: 22px;
  font-weight: bold;
  font-family: Nunito;
  margin-top: -20px;

  @media all and (max-width: 800px) {
    margin: 0;
    font-size: 13px;
  }
`

const MailingInput = styled.input`
  background: #DCDFE9;
  border: none;
  border-radius: 30px;
  width: 310px;
  height: 50px;
  margin-top: -10px;
  padding-left: 20px;
  padding-right: 60px;

  @media all and (max-width: 800px) {
    width: 100%;
    padding-right: 80px;
    margin-top: 0px;
  }
`

const MailingJoin = styled.button`
  background: #42C0FC;
  border: none;
  border-radius: 30px;
  width: 125px;
  height: 50px;
  margin-top: -10px;
  margin-left: -45px;
  color: #FFF;
  font-size: 18px;
  font-family: Nunito;
  font-weight: bold;
  vertical-align: top;
  transition: 0.3s;

  @media all and (max-width: 800px) {
    margin: 10px 40px;
    padding: 0;
  }
`

const Hero: React.FC<{}> = () => {
  const [email, setEmail] = useState('');

  const handleClick = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      // Valid email
    } else {
      // Invalid email
      alert('Invalid email.');
    }
  }

  return (
    <div>
        <Wrapper>
          <HeroImage src={require('../../../../static/img/acm-logo-large.svg')} />
          <HeroText>
            <Name>S&T ACM</Name>
            <CatchPhrase><span style={{fontWeight: 'bold'}}>Tech</span>nically Impressive</CatchPhrase>
            <MailingText>Enjoy our perks and come to exclusive events.</MailingText>
            <MailingInput type='text' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <MailingJoin onClick={handleClick}>JOIN</MailingJoin>
          </HeroText>
        </Wrapper>
    </div>
  );
};

export { Hero };
