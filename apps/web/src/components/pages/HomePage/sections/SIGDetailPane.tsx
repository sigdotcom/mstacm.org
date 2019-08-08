import React from "react";
import styled from "styled-components";

const PaneWrapper: any = styled.div`
  border: 2px solid lightgray;
  border-top: 4px solid red;
  border-radius: 0 0 10px 10px;
  padding: 15px;
  flex: 1;

  @media only screen and (min-width: 768px) {
    border: 2px solid lightgray;
    border-left: 4px solid red;
    border-radius: 0 0 10px 10px;
    margin-left: 25px;
  }
`;

const SIGName: any = styled.h1``;
const SIGDesc: any = styled.p``;
const SIGButton: any = styled.a`
  border-radius: 8px;
  padding: 10px 34px;
  transition: 0.1s ease-in-out all;
`;
const SIGWebsite: any = styled(SIGButton)`
  background: #11bb66;
  color: white;
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
const SIGLogo: any = styled.img`
  min-width: 50px;
  min-height: 50px;
`;

const SIGContent: any = styled.div`
  display: flex;
`;

function SIGDetailPane(props: any): any {
  const { sig }: any = props;

  return (
    <PaneWrapper>
      <SIGName>ACM {sig.name}</SIGName>
      <SIGContent>
        <SIGLogo src={sig.logoLink} />
        <div>
          <SIGDesc>{sig.desc}</SIGDesc>
          <SIGWebsite href={sig.website}>Website</SIGWebsite>
          <SIGDiscord href={sig.discord}>Discord</SIGDiscord>
          <p>{sig.email}</p>
        </div>
      </SIGContent>
    </PaneWrapper>
  );
}

export { SIGDetailPane };
