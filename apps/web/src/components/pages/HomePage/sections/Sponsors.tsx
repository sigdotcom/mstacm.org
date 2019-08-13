import * as React from "react";
import styled from "styled-components";
import { Element } from "react-scroll";

const SponsorWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  background: #DFE6E9;
`

const Title = styled.div`
  position: relative;
  text-align: center;
  margin-top: -36px;
  display: none;
  
  h1 {
    text-transform: uppercase;
    font-weight: bold;
    color: white;
    font-size: 34px;
    margin-top: -65px;
  }

  img {
    width: 260px;
  }

  @media all and (max-width: 680px) {
    width: 90%;
    margin-left: 5%;
  }
`

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
`

const Logos = styled.div`
  display: flex;
  justify-content: center;    
  margin-top: 30px;
  width: 85%
  margin-left: 7.5%;
  background: #DFE6E9;

  img {
    margin: 30px 30px 100px 30px;
    width: 180px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }

  img:hover{
    width: 190px;
    margin: 25px 25px 95px 25px; 
  }

  @media all and (max-width: 1200px) {
    img {
      margin: 20px 20px 80px 20px;
      width: 150px;
    }

    img:hover {
      width: 160px;
      margin: 15px 15px 75px 15px; 
    }
  }

  @media all and (max-width: 1000px) {
    img {
      margin: 20px 20px 70px 20px;
      width: 125px;
    }

    img:hover{
      width: 135px;
      margin: 15px 15px 65px 15px; 
    }
  }

  @media all and (max-width: 800px) {
    img {
      margin: 20px 20px 70px 20px;
    }

    img:hover{
      width: 135px;
      margin: 15px 15px 65px 15px; 
    }
  }

  @media all and (max-width: 680px) {
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 25px;

    img {
      width: 220px;
      margin: 10px 10px 30px 10px;
    }

    img:hover{
      width: 220px;
      margin: 10px 10px 30px 10px; 
    }
  }
`

const Sponsors: React.FC<{}> = () => {
  return (
    <SponsorWrap>
      <Element name="sponsors">
        <Title>
          <img src={require('../../../../static/img/rectangle.svg')}/>
          <h1>Sponsors</h1>
        </Title>
        <Sponsor>
          <h2>Big thanks to our sponsors and partners!</h2>
        </Sponsor>
        <Logos>
          <a href="https://www.att.com/" target="_blank"><img src={require('../../../../static/img/at&t.jpg')}/></a>
          <a href="https://www.garmin.com/en-US/" target="_blank"><img src={require('../../../../static/img/garmin.jpg')}/></a>
          <a href="https://www.netlify.com/" target="_blank"><img src={require('../../../../static/img/netlify.jpg')}/></a>
          <a href="http://tradebot.com/" target="_blank"><img src={require('../../../../static/img/tradebot.jpg')}/></a>
        </Logos>
      </Element>
    </SponsorWrap>
  );
}

export { Sponsors };