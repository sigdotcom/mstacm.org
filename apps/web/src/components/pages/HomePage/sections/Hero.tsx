import React, { useState } from "react";
import styled from 'styled-components';
import windowSize from 'react-window-size';

const Wrapper = styled.div`
  height: 70vh;
  background: #F4F5F8;
  margin-top: -20px;
  position: relative;

  input[type=text] {
    opacity: 0;
    visibility: hidden;
    -webkit-transition: opacity 600ms, visibility 600ms;
    transition: opacity 600ms, visibility 600ms;
  }

  @media all and (max-width: 1300px) {
    height: 65vh;
  }

  @media all and (max-width: 1200px) {
    height: 60vh;
  }

  @media all and (max-width: 1100px) {
    height: 55vh;
  }

  @media all and (max-width: 1000px) {
    height: 50vh;
  }

  @media all and (max-width: 900px) {
    height: 45vh;
  }

  @media all and (max-width: 800px) {
    height: 265px;
  }

  @media all and (max-width: 480px) {
    height: 100%;
    padding-bottom: 25px;
  }
`

const HeroImage = styled.img`
  position: absolute;
  width: 55%;
  margin-top: -1%;
  right: 5px;

  @media all and (max-width: 1300px) {
    width: 51%;
  }

  @media all and (max-width: 1200px) {
    width: 47%;
  }
  
  @media all and (max-width: 1100px) {
    width: 43%;
  }

  @media all and (max-width: 1000px) {
    width: 39%;
  }

  @media all and (max-width: 900px) {
    width: 36%;
  }

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

  @media all and (max-width: 1300px) {
    padding-top: 9%;
    margin-left: 108px;
  }

  @media all and (max-width: 1200px) {
    padding-top: 8%;
    margin-left: 100px;
  }

  @media all and (max-width: 1100px) {
    padding-top: 7%;
    margin-left: 93px;
  }

  @media all and (max-width: 1000px) {
    padding-top: 6%;
    margin-left: 81px;
  }

  @media all and (max-width: 900px) {
    padding-top: 5%;
    margin-left: 73px;
  }

  @media all and (max-width: 800px) {
    margin: 0px 40px;
    padding: 0;
    text-align: center;
  }
`

const Name = styled.h1`
  color: #2D9CDB;
  font-size: 62px;
  font-weight: bold;
  margin-bottom: -24px;

  @media all and (max-width: 1300px) {
    font-size: 54px;
  }

  @media all and (max-width: 1200px) {
    font-size: 48px;
    margin-bottom: -20px;
  }

  @media all and (max-width: 1100px) {
    font-size: 42px;
    margin-bottom: -16px;
  }

  @media all and (max-width: 1000px) {
    font-size: 36px;
    margin-bottom: -14px;
  }

  @media all and (max-width: 900px) {
    font-size: 30px;
    margin-bottom: -12px;
  }

  @media all and (max-width: 800px) {
    font-size: 44px;
    margin-bottom: 10px;
  }
`

const CatchPhrase = styled.h1`
  color: #646566;
  font-size: 48px;

  @media all and (max-width: 1300px) {
    font-size: 42px;
  }

  @media all and (max-width: 1200px) {
    font-size: 38px;
  }

  @media all and (max-width: 1100px) {
    font-size: 33px;
  }

  @media all and (max-width: 1000px) {
    font-size: 28px;
  }

  @media all and (max-width: 900px) {
    font-size: 23px;
  }

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
  margin-bottom: 0px;

  @media all and (max-width: 1300px) {
    font-size: 19px;
  }

  @media all and (max-width: 1200px) {
    font-size: 17px;
    margin-top: -18px;
  }

  @media all and (max-width: 1100px) {
    font-size: 15px;
    margin-top: -16px;
  }

  @media all and (max-width: 1000px) {
    font-size: 13px;
    margin-top: -14px;
  }

  @media all and (max-width: 900px) {
    font-size: 11px;
    margin-top: -12px;
  }

  @media all and (max-width: 800px) {
    margin: 0;
    font-size: 13px;
  }
`

const InputWrapper = styled.form`
  @media all and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const MailingInput = styled.input`
  background: #DCDFE9;
  border: none;
  border-radius: 30px;
  width: 25%;
  height: 50px;
  padding-left: 20px;
  padding-right: 60px;

  @media all and (max-width: 1300px) {
    height: 45px;
    font-size: 12px;
  }

  @media all and (max-width: 1200px) {
    height: 40px;
    font-size: 10px;
  }

  @media all and (max-width: 1100px) {
    height: 35px;
  }

  @media all and (max-width: 1000px) {
    height: 30px;
    font-size: 8px;
  }

  @media all and (max-width: 900px) {
    height: 25px;
  }

  @media all and (max-width: 800px) {
    width: 100%;
    height: 30px;
    max-width: 300px;
    padding-right: 80px;
    margin-top: 5px;
    font-size: 10px;
    visibility: hidden;
  }
`

const MailingJoin = styled.button`
  background: #42C0FC;
  border: none;
  border-radius: 30px;
  width: 10%;
  height: 50px;
  margin-left: -45px;
  color: #FFF;
  font-size: 18px;
  font-family: Nunito;
  font-weight: bold;
  vertical-align: top;
  transition: 0.3s;

  @media all and (max-width: 1300px) {
    height: 45px;
    font-size: 16px;
  }

  @media all and (max-width: 1200px) {
    height: 40px;
    font-size: 14px;
  }

  @media all and (max-width: 1100px) {
    height: 35px;
    font-size: 12px;
  }

  @media all and (max-width: 1000px) {
    height: 30px;
    font-size: 9px;
  }

  @media all and (max-width: 900px) {
    height: 25px;
  }

  @media all and (max-width: 800px) {
    height: 30px;
    margin-top: 5px;
  }

  @media all and (max-width: 480px) {
    width: 85px;
    margin: 10px 40px;
    padding: 0;
    font-size: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  }
`

interface IProps {
  windowWidth?: any // Used to check if user is on mobile for initially hiding text input
}

const Hero: React.FC<IProps> = (props) => {
  const [email, setEmail] = useState('');
  const [inputVisible, setInputVisibilty] = useState(true);


  const handleClick = (e: any) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(props.windowWidth <= 480 && inputVisible) {
      setInputVisibilty(false);
    } else {
      if (re.test(email)) {
        // Valid email
      } else {
        // Invalid email
        alert('Invalid email.');
      }
    }
    e.preventDefault()
  }

  const showInput = () => {
    if (props.windowWidth <= 480 && inputVisible) {
      return false
    }
    return true
  }

  return (
    <div>
        <Wrapper>
          <HeroImage src={require('../../../../static/img/acm-logo-large.svg')} />
          <HeroText>
            <Name>S&T ACM</Name>
            <CatchPhrase><span style={{fontWeight: 'bold'}}>Tech</span>nically Impressive</CatchPhrase>
            <MailingText>Enjoy our perks and come to exclusive events.</MailingText>
            <InputWrapper>
              <MailingInput style={{visibility: (showInput() ? 'visible' : 'hidden'), opacity: (showInput() ? 1 : 0)}} type='text' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}/>
              <MailingJoin style={{marginTop: (showInput() ? '' : '-30px')}} onClick={handleClick}>JOIN</MailingJoin>
            </InputWrapper>
          </HeroText>
        </Wrapper>
    </div>
  );
};

export default windowSize(Hero);
