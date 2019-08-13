import React from "react";
import windowSize from "react-window-size";
import styled from "styled-components";
import { ISIG } from "./interfaces";

const PaneWrapper: any = styled.div`
  border: 2px solid lightgray;
  border-radius: 0 0 10px 10px;
  padding: 25px;
  flex: 1;

  @media only screen and (min-width: 768px) {
    border: 2px solid lightgray;
    border-left: 4px solid red;
    border-radius: 0 0 10px 10px;
    margin-left: 25px;
  }
`;

const SIGName: any = styled.h1`
  font-family: "Roboto";
`;
const SIGDesc: any = styled.p`
  margin-bottom: 20px;
`;
const SIGButton: any = styled.a`
  border-radius: 4px;
  padding: 10px 34px;
  transition: 0.1s ease-in-out all;
`;
const SIGWebsite: any = styled(SIGButton)`
  background: #11bb66;
  color: white;
  margin-right: 20px;
  &:hover {
    color: white;
    background: #00aa55;
  }
`;
const SIGDiscord: any = styled(SIGButton)`
  background: #1166bb;
  color: white;
  &:hover {
    color: white;
    background: #0055aa;
  }
`;
const SIGEmail: any = styled.a`
  padding: 10px 34px;
  align-self: flex-end;
`;
const SIGLogo: any = styled.img`
  min-width: 70px;
  max-width: 70px;
  min-height: 70px;
  max-height: 70px;
  margin: 0 0 20px 0;
  border-radius: 50%;
`;

const Row: any = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

interface ISIGDetailPaneProps {
  sig: ISIG;
}

const SIGDetailPaneBase: React.FC<ISIGDetailPaneProps> = (props: any): any => {
  const { sig }: any = props;

  const styles: any = {};

  if (props.windowWidth < 768) {
    styles.borderRadius = "0 0 10px 10px";
    styles.borderTop = "4px solid " + sig.color;
  } else {
    styles.borderRadius = "0 10px 10px 0";
    styles.borderLeft = "4px solid " + sig.color;
  }

  return (
    <PaneWrapper style={styles}>
      <SIGLogo src={sig.logoLink} />
      <Row>
        <div>
          <SIGName>ACM {sig.name}</SIGName>
          <SIGDesc>{sig.desc}</SIGDesc>
          <Row>
            <Row>
              <SIGWebsite href={sig.website}>Website</SIGWebsite>
              <SIGDiscord href={sig.discord}>Discord</SIGDiscord>
            </Row>
            <SIGEmail href={"mailto:" + sig.email}>Email</SIGEmail>
          </Row>
        </div>
      </Row>
    </PaneWrapper>
  );
};

const SIGDetailPane: any = windowSize(SIGDetailPaneBase);
export { SIGDetailPane };
