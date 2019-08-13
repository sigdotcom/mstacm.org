import React from "react";
import Icon from "react-eva-icons";
import windowSize from "react-window-size";
import styled from "styled-components";
import { ISIG } from "./interfaces";

const PaneWrapper: any = styled.div`
  border-top: 2px solid #ddd;
  padding: 35px 25px;
  flex: 1;

  @media only screen and (min-width: 768px) {
    border-top: none;
    border-left: 2px solid #ddd;
    margin-left: 35px;
    padding: 35px 25px 35px 45px;
  }
`;

const SIGName: any = styled.h1`
  font-family: "Roboto", sans-serif;
  font-size: 21px;
  display: inline;
  margin-left: 20px;
`;
const SIGDesc: any = styled.p`
  margin-bottom: 20px;
  font-size: 17px;
  rgba(0, 0, 0, 0.65);
`;
/*
const SIGWebsite: any = styled(SIGButton)`
  background: #11bb66;
  color: white;
  margin-right: 20px;
  &:hover {
    color: white;
    background: #00aa55;
  }
`;
*/

const SIGWebsite = styled.a`
  transition: 0.2s ease-in-out;
  font-weight: bold;
  font-family: "Nunito Sans", sans-serif;
  border-radius: 30px;
  width: 140px;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  color: #2d9cdb;
  border: 3px solid #2d9cdb;
  cursor: pointer;
  text-align: center;

  &:hover {
    background: #2d9cdb;
    color: #fff;
  }
`;

/*
const SIGDiscord: any = styled(SIGButton)`
  background: #1166bb;
  color: white;
  &:hover {
    color: white;
    background: #0055aa;
  }
`;
*/

const SIGDiscord = styled.a`
  background: #42c0fc;
  border: none;
  border-radius: 30px;
  margin-left: 20px;
  color: #fff;
  font-size: 17px;
  font-family: "Nunito Sans", sans-serif;
  font-weight: bold;
  vertical-align: top;
  transition: 0.2s ease-in-out all;
  cursor: pointer;
  width: 140px;
  height: 50px;
  line-height: 50px;
  text-align: center;

  &:hover {
    background: #1290cc;
    color: #fff;
  }
`;

const SIGLogo: any = styled.img`
  min-width: 70px;
  max-width: 70px;
  min-height: 70px;
  max-height: 70px;
  margin: 0 0 20px 0;
  border-radius: 50%;
`;

const SIGEmail: any = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonRow: any = styled.div`
  display: flex;
`;

const Row: any = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
`;

interface ISIGDetailPaneProps {
  sig: ISIG;
}

const SIGDetailPaneBase: React.FC<ISIGDetailPaneProps> = (props: any): any => {
  const { sig }: any = props;

  return (
    <PaneWrapper>
      <SIGLogo src={sig.logoLink} />
      <SIGName>ACM {sig.name}</SIGName>
      <Row>
        <SIGDesc>{sig.desc}</SIGDesc>
        <Row>
          <ButtonRow>
            <SIGWebsite href={sig.website}>Website</SIGWebsite>
            <SIGDiscord href={sig.discord}>Discord</SIGDiscord>
          </ButtonRow>
          <SIGEmail>
            <a href={"mailto:" + sig.email}>
              <Icon name="email" size="large" fill="#777" />
            </a>
          </SIGEmail>
        </Row>
      </Row>
    </PaneWrapper>
  );
};

const SIGDetailPane: any = windowSize(SIGDetailPaneBase);
export { SIGDetailPane };
