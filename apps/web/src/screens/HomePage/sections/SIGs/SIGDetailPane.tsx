import React from "react";
import Icon from "react-eva-icons";
import styled from "styled-components";
import { ISIG } from "./interfaces";

import { config } from "../../../../config";

const PaneWrapper: any = styled.div`
  border-top: 2px solid #ddd;
  padding: 35px 25px;
  flex: 1;

  @media only screen and (min-width: 810px) {
    border-top: none;
    border-left: 2px solid #ddd;
    margin-left: 35px;
    padding: 35px 25px 35px 45px;
  }
`;

const SIGName: any = styled.h1`
  font-family: "Roboto", sans-serif;
  font-size: 21px;
  margin: 0 0 0 10px;
`;
const SIGDesc: any = styled.p`
  margin-bottom: 20px;
  font-size: 17px;
  rgba(0, 0, 0, 0.65);
`;

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

  &:hover #child{
    transition: filter 0.17s ease-in;
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(230deg) brightness(101%) contrast(102%);
  }
`;

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
  border-radius: 50%;
`;

const SIGEmail: any = styled.a`
  display: inline-flex;
  align-items: center;

  i {
    display: inline-flex;
  }
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

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 16px 0;
`;

const SIGDetails = styled.div`
  display: flex;
  align-items: center;
`;

const ExternalIconWebsite: any = styled.img`
  filter: invert(52%) sepia(79%) saturate(1058%) hue-rotate(173deg) brightness(91%) contrast(87%);
  max-width: 20px;
  padding-left: 5px;
  
  &:hover {
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(230deg) brightness(101%) contrast(102%);
  }
`;

const ExternalIconDiscord: any = styled.img`
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(230deg) brightness(101%) contrast(102%);
  max-width: 20px;
  padding-left: 5px;
`;

interface ISIGDetailPaneProps {
  sig: ISIG;
}

const SIGDetailPane: React.FC<ISIGDetailPaneProps> = (props: any): any => {
  const { sig }: any = props;

  return (
    <PaneWrapper>
      <Header>
        <SIGDetails>
          <SIGLogo src={`${config.CDN_URI}/static/${sig.logoLink}`} />
          <SIGName>ACM {sig.name}</SIGName>
        </SIGDetails>
        <SIGEmail href={"mailto:" + sig.email}>
          <Icon name="email" size="large" fill="#777" />
        </SIGEmail>
      </Header>
      <Row>
        <SIGDesc>{sig.desc}</SIGDesc>
        <Row>
          <ButtonRow>
            <SIGWebsite href={sig.website}>
              Website
              <ExternalIconWebsite id="child" alt="external link icon" src={`${config.CDN_URI}/static/external-link.svg`}/>
            </SIGWebsite>
            <SIGDiscord href={sig.discord}>
              Discord
              <ExternalIconDiscord alt="external link icon" src={`${config.CDN_URI}/static/external-link.svg`} />
            </SIGDiscord>
          </ButtonRow>
        </Row>
      </Row>
    </PaneWrapper>
  );
};

export { SIGDetailPane };
