import gql from "graphql-tag";
import React from "react";
import { Element } from "react-scroll";
import styled, { AnyStyledComponent } from "styled-components";
import Icon from "react-eva-icons";
import { Sig as ISIG,
         useGetSigsQuery,
         GetSigsQueryHookResult } from "../../../../generated/graphql";
import { SIGsDisplay } from "./SIGsDisplay";


import { PageConstraint } from "../../../../components/PageConstraint";

export const GET_SIGS_QUERY: any = gql`
  query getSigs {
    sigs {
      name
      color
      description
      discordLink
      email
      logoLink
      logoLinkDark
      website
      display
    }
  }
`;

const SIGsWrapper: AnyStyledComponent = styled.div`
  margin: auto;
  margin-top: 100px;
  width: 100%;
  max-width: 1200px;
  padding: 0 5%;
  font-family: "Nunito Sans", sans-serif;
`;

const Heading: AnyStyledComponent = styled.h1`
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  font-size: 23px;
  & i {
    margin-right: 10px;
  }
`;

const Description: AnyStyledComponent = styled.p`
  margin-bottom: 20px;
  font-size: 19px;
`;

const Line: AnyStyledComponent = styled.hr`
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  margin: 100px 0;
`;

const SIGs: React.FC<{}> = (): JSX.Element => {
  const result: GetSigsQueryHookResult = useGetSigsQuery();
  let SIGsData: ISIG[] = [];
  var isLoading;
  if (result.data && result.data.sigs) {
    SIGsData = result.data.sigs.filter(sig => sig.display) as ISIG [];
    SIGsData.sort(
      (a: ISIG, b: ISIG) =>
      {
        let filterResult;
        if(a.name.toLowerCase() > b.name.toLowerCase()) filterResult = 1;
        else if(a.name.toLowerCase() < b.name.toLowerCase()) filterResult = -1;
        else filterResult = 0;
        return filterResult;
      });
    isLoading = false;
  } else {
    isLoading = true;
  }

  return (
      <Element name="communities">
        <PageConstraint>
          <SIGsWrapper>
            <Heading>
              <Icon name="people" size="large" fill="#777" />
              {' '}
              Our Communities
            </Heading>
            <Description>
              Members of our communities (formerly known as SIGs) hone their
              computing skills in special topics, listed below, and work towards
              highly specialized goals in development and career-making. Click on
              the topic to learn more about the community and find out how to get
              involved!
            </Description>
            { isLoading 
              ? <div />
              : <SIGsDisplay sigs={SIGsData}/>
            }
            
          </SIGsWrapper>
          <Line />
        </PageConstraint>
      </Element>
    );
};

export { SIGs };
