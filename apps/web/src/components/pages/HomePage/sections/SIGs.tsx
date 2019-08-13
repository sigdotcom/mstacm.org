import React from "react";
import styled from "styled-components";
import { ISIG } from "./interfaces";
import { SIGsDisplay } from "./SIGsDisplay";

import Icon from "react-eva-icons";

import { PageConstraint } from "../../../common/PageConstraint";

const SIGsData: ISIG[] = [
  {
    color: "skyblue",
    desc:
      "We make websites and tools for ACM that are used administratively and for public use.",
    discord: "https://www.google.com",
    email: "google@google.com",
    logoLink: "https://source.unsplash.com/random",
    name: "Web",
    website: "https://www.google.com"
  },
  {
    color: "#ff8888",
    desc:
      "We make websites and tools for ACM that are used administratively and for public use.",
    discord: "https://www.google.com",
    email: "google@google.com",
    logoLink: "https://source.unsplash.com/random",
    name: "Competition",
    website: "https://www.google.com"
  },
  {
    color: "orange",
    desc:
      "We make websites and tools for ACM that are used administratively and for public use.",
    discord: "https://www.google.com",
    email: "google@google.com",
    logoLink: "https://source.unsplash.com/random",
    name: "Tutor",
    website: "https://www.google.com"
  },
  {
    color: "pink",
    desc:
      "It all happens automatically. We're not trying to teach you a thing to copy. We're just here to teach you a technique, then let you loose into the world. Mountains are so simple, they're hard. This is where you take out all your hostilities and frustrations.",
    discord: "https://www.google.com",
    email: "google@google.com",
    logoLink: "https://source.unsplash.com/random",
    name: "Game",
    website: "https://www.google.com"
  },
  {
    color: "lavender",
    desc:
      "But we're not there yet, so we don't need to worry about it. Water's like me. It's laaazy ... Boy, it always looks for the easiest way to do things If you overwork it you become a cloud killer. There's nothing worse than a cloud killer. This is your world. We don't have to be concerned about it. We just have to let it fall where it will.",
    discord: "https://www.google.com",
    email: "google@google.com",
    logoLink: "https://source.unsplash.com/random",
    name: "Data",
    website: "https://www.google.com"
  },
  {
    color: "wheat",
    desc:
      "There we are. Nice little clouds playing around in the sky. If it's not what you want - stop and change it. Don't just keep going and expect it will get better. This painting comes right out of your heart. The only thing worse than yellow snow is green snow.",
    discord: "https://www.google.com",
    email: "google@google.com",
    logoLink: "https://source.unsplash.com/random",
    name: "Women",
    website: "https://www.google.com"
  },
  {
    color: "aquamarine",
    desc:
      "There we are. Nice little clouds playing around in the sky. If it's not what you want - stop and change it. Don't just keep going and expect it will get better. This painting comes right out of your heart. The only thing worse than yellow snow is green snow.",
    discord: "https://www.google.com",
    email: "google@google.com",
    logoLink: "https://source.unsplash.com/random",
    name: "Hack",
    website: "https://www.google.com"
  }
];

const SIGsWrapper: any = styled.div`
  margin: auto;
  width: 100%;
  max-width: 1200px;
  padding: 0 5%;
  font-family: "Nunito Sans", sans-serif;
`;

const Heading: any = styled.h1`
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  font-size: 23px;
  & i {
    margin-right: 10px;
  }
`;

const Description: any = styled.p`
  margin-bottom: 20px;
  font-size: 19px;
`;

const Line: any = styled.hr`
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  margin: 100px 0;
`;

function SIGs(): any {
  return (
    <PageConstraint>
      <SIGsWrapper>
        <Heading>
          <Icon name="people" size="large" fill="#777" /> Our Communities
        </Heading>
        <Description>
          Members of our communities (formerly known as SIGs) hone their
          computing skills in special topics, listed below, and work towards
          highly specialized goals in development and career-making. Click on
          the topic to learn more about the community and find out how to get
          involved!
        </Description>
        <SIGsDisplay sigs={SIGsData} />
      </SIGsWrapper>
      <Line />
    </PageConstraint>
  );
}

export { SIGs };
