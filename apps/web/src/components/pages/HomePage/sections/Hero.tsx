import React, { useState } from "react";
import styled from 'styled-components';
import windowSize from 'react-window-size';

const Wrapper = styled.div`
  height: 100vh;
  background: #F4F5F8;
  margin-top: -20px;
  position: relative;

  button:hover {
    cursor: pointer;
    transition: 0.3s;
  }

  @keyframes show {
    from {
      opacity: inherit;
      visibility: inherit;
    }
    to {
      opacity: 1;
      visibility: visible;
    }
  }

  @media all and (max-width: 800px) {
    height: 265px;
  }

  @media all and (max-width: 680px) {
    height: 100%;
    padding: 25px 0 50px 0;
  }
`

const HeroImage = styled.img`
  position: absolute;
  width: 1100px;
  margin-top: -1%;
  right: 5px;

  @media all and (max-width: 1700px) {
    width: 990px;
  }

  @media all and (max-width: 1600px) {
    width: 885px;
  }

  @media all and (max-width: 1475px) {
    width: 785px;
  }

  @media all and (max-width: 1300px) {
    width: 685px;
  }

  @media all and (max-width: 1150px) {
    width: 590px;
  }

  @media all and (max-width: 1000px) {
    width: 510px;
  }

  @media all and (max-width: 900px) {
    width: 425px;
  }

  @media all and (max-width: 800px) {
    width: 325px;
  }
  
  @media all and (max-width: 680px) {
    display: none;
  }
`

const HeroText = styled.div`
  padding-top: 250px;
  margin-left: 7%;
  font-family: 'Roboto';

  button:hover {
    background: #FFF;
    color: #42C0FC;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  }

  @media all and (max-width: 1700px) {
    padding-top: 225px;
  }

  @media all and (max-width: 1600px) {
    padding-top: 200px;
  }

  @media all and (max-width: 1475px) {
    padding-top: 150px;
  }

  @media all and (max-width: 1300px) {
    padding-top: 125px;
  }

  @media all and (max-width: 1150px) {
    padding-top: 100px;
  }

  @media all and (max-width: 1000px) {
    padding-top: 85px;
  }

  @media all and (max-width: 900px) {
    padding-top: 50px;
  }

  @media all and (max-width: 800px) {
    padding-top: 30px;
  }

  @media all and (max-width: 680px) {
    margin: 0px 40px;
    padding: 0;
    text-align: center;

    button:hover {
      background: #42C0FC;
      color: #FFF;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    }
  }
`

const Name = styled.h1`
  color: #2D9CDB;
  font-size: 62px;
  font-weight: bold;
  margin-bottom: -24px;

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
`

const CatchPhrase = styled.h1`
  color: #646566;
  font-size: 48px;

  @media all and (max-width: 1475px) {
    font-size: 42px;
  }

  @media all and (max-width: 1300px) {
    font-size: 37px;
  }

  @media all and (max-width: 1150px) {
    font-size: 34px;
  }

  @media all and (max-width: 1000px) {
    font-size: 32px;
  }

  @media all and (max-width: 900px) {
    font-size: 30px;
  }

  @media all and (max-width: 680px) {
    margin-top: -27px;
    font-size: 32px;
  }

  @media all and (max-width: 425px) {
    font-size: 25px;
  }
`

const MailingText = styled.p`
  color: #376B83;
  font-size: 22px;
  font-weight: bold;
  font-family: Nunito;
  margin-top: -20px;
  margin-bottom: 0px;

  @media all and (max-width: 1475px) {
    font-size: 19px;
    padding-top: 10px;
  }

  @media all and (max-width: 1300px) {
    font-size: 17px;
  }

  @media all and (max-width: 1150px) {
    font-size: 14.5px;
    padding-top: 7px;
  }

  @media all and (max-width: 900px) {
    font-size: 14px;
    padding-top: 7px;
  }

  @media all and (max-width: 680px) {
    margin: 0;
    font-size: 20px;
  }
`

const InputWrapper = styled.form`
  @media all and (max-width: 680px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

const MailingInput = styled.input`
  background: #DCDFE9;
  border: none;
  border-radius: 30px;
  width: 325px;
  height: 50px;
  padding-left: 20px;
  padding-right: 60px;
  font-size: 16px;

  @media all and (max-width: 1475px) {
    width: 290px;
    height: 45px;
    font-size: 14px;
    padding-left: 18px;
  }

  @media all and (max-width: 1300px) {
    width: 260px;
    height: 40px;
    font-size: 13px;
    padding-left: 16px;
  }

  @media all and (max-width: 1150px) {
    width: 235px;
    height: 35px;
    font-size: 12px;
    padding-left: 16px;
  }

  @media all and (max-width: 900px) {
    width: 235px;
    height: 35px;
    font-size: 12px;
    padding-left: 16px;
  }

  @media all and (max-width: 680px) {
    width: 100%;
    height: 45px;
    padding-right: 80px;
    margin-top: 5px;
    font-size: 13px;
  }
`

const MailingJoin = styled.button`
  background: #42C0FC;
  border: none;
  border-radius: 30px;
  width: 150px;
  height: 50px;
  margin-left: -45px;
  color: #FFF;
  font-size: 18px;
  font-family: Nunito;
  font-weight: bold;
  vertical-align: top;

  @media all and (max-width: 1475px) {
    width: 125px;
    height: 45px;
    font-size: 16px;
  }

  @media all and (max-width: 1300px) {
    width: 110px;
    height: 40px;
    font-size: 16px;
  }

  @media all and (max-width: 1150px) {
    width: 95px;
    height: 35px;
    font-size: 14px;
  }

  @media all and (max-width: 680px) {
    width: 125px;
    height: 45px;
    margin: 10px 40px;
    padding: 0;
    font-size: 17px;
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

    if(props.windowWidth <= 680 && inputVisible) {
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
    if (props.windowWidth <= 680 && inputVisible) {
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
              <MailingInput style={{visibility: (showInput() ? 'visible' : 'hidden'), 
                                    opacity: (showInput() ? 1 : 0), 
                                    transitionDuration: "0s"}} 
                                    type='text' 
                                    placeholder='Enter email' 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                />
              <MailingJoin style={{marginTop: (showInput() ? '' : '-30px')}} onClick={handleClick}>JOIN</MailingJoin>
            </InputWrapper>
          </HeroText>
        </Wrapper>
    </div>
  );
};

export default windowSize(Hero);
