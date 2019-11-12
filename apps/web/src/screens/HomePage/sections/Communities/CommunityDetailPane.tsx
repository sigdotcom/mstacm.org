import React from "react";
import Icon from "react-eva-icons";
import styled from "styled-components";
import { ICommunity } from "./interfaces";

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

const CommunityName: any = styled.h1`
  font-family: "Roboto", sans-serif;
  font-size: 21px;
  margin: 0 0 0 10px;
`;
const CommunityDesc: any = styled.p`
  margin-bottom: 20px;
  font-size: 17px;
  rgba(0, 0, 0, 0.65);
`;
/*
const CommunityWebsite: any = styled(CommunityButton)`
  background: #11bb66;
  color: white;
  margin-right: 20px;
  &:hover {
    color: white;
    background: #00aa55;
  }
`;
*/

const CommunityWebsite = styled.a`
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
const CommunityDiscord: any = styled(CommunityButton)`
  background: #1166bb;
  color: white;
  &:hover {
    color: white;
    background: #0055aa;
  }
`;
*/

const CommunityDiscord = styled.a`
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

const CommunityLogo: any = styled.img`
  min-width: 70px;
  max-width: 70px;
  min-height: 70px;
  max-height: 70px;
  border-radius: 50%;
`;

const CommunityEmail: any = styled.a`
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

const CommunityDetails = styled.div`
  display: flex;
  align-items: center;
`;

interface ICommunityDetailPaneProps {
  community: ICommunity;
}

const CommunityDetailPane: React.FC<ICommunityDetailPaneProps> = (props: any): any => {
  const { community }: any = props;

  return (
    <PaneWrapper>
      <Header>
        <CommunityDetails>
          <CommunityLogo src={`${config.CDN_URI}/static/${community.logoLink}`} />
          <CommunityName>ACM {community.name}</CommunityName>
        </CommunityDetails>
        <CommunityEmail href={"mailto:" + community.email}>
          <Icon name="email" size="large" fill="#777" />
        </CommunityEmail>
      </Header>
      <Row>
        <CommunityDesc>{community.desc}</CommunityDesc>
        <Row>
          <ButtonRow>
            <CommunityWebsite href={community.website}>Website</CommunityWebsite>
            <CommunityDiscord href={community.discord}>Discord</CommunityDiscord>
          </ButtonRow>
        </Row>
      </Row>
    </PaneWrapper>
  );
};

export { CommunityDetailPane };
