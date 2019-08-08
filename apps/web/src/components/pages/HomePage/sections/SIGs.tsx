import React from "react";
import styled from "styled-components";
import { ISIG } from "./interfaces";
import { SIGsDisplay } from "./SIGsDisplay";

const SIGsData: ISIG[] = [
  {
    color: "blue",
    desc:
      "We make websites and tools for ACM that are used administratively and for public use.",
    discord: "https://www.google.com",
    email: "google@google.com",
    logoLink: "https://www.google.com",
    name: "Web",
    website: "https://www.google.com"
  },
  {
    color: "red",
    desc:
      "We make websites and tools for ACM that are used administratively and for public use.",
    discord: "https://www.google.com",
    email: "google@google.com",
    logoLink: "https://www.google.com",
    name: "Comp",
    website: "https://www.google.com"
  },
  {
    color: "orange",
    desc:
      "We make websites and tools for ACM that are used administratively and for public use.",
    discord: "https://www.google.com",
    email: "google@google.com",
    logoLink: "https://www.google.com",
    name: "Tutor",
    website: "https://www.google.com"
  },
  {
    color: "pink",
    desc:
      "It all happens automatically. We're not trying to teach you a thing to copy. We're just here to teach you a technique, then let you loose into the world. Mountains are so simple, they're hard. This is where you take out all your hostilities and frustrations.",
    discord: "https://www.google.com",
    email: "google@google.com",
    logoLink: "https://www.google.com",
    name: "Lounge",
    website: "https://www.google.com"
  },
  {
    color: "purple",
    desc:
      "But we're not there yet, so we don't need to worry about it. Water's like me. It's laaazy ... Boy, it always looks for the easiest way to do things If you overwork it you become a cloud killer. There's nothing worse than a cloud killer. This is your world. We don't have to be concerned about it. We just have to let it fall where it will.",
    discord: "https://www.google.com",
    email: "google@google.com",
    logoLink: "https://www.google.com",
    name: "Security",
    website: "https://www.google.com"
  },
  {
    color: "wheat",
    desc:
      "There we are. Nice little clouds playing around in the sky. If it's not what you want - stop and change it. Don't just keep going and expect it will get better. This painting comes right out of your heart. The only thing worse than yellow snow is green snow.",
    discord: "https://www.google.com",
    email: "google@google.com",
    logoLink: "https://www.google.com",
    name: "Web",
    website: "https://www.google.com"
  }
];

const SIGsWrapper: any = styled.div`
  margin: auto;
  width: 100%;
  max-width: 900px;
  padding: 25px;
`;

function SIGs(): any {
  return (
    <SIGsWrapper>
      <h1>Special Interest Groups</h1>
      <p>
        Members of our SIGs focus their skills in computing on special topics,
        listed below, and work towards highly specialized goals in
        career-making.
      </p>
      <SIGsDisplay sigs={SIGsData} />
    </SIGsWrapper>
  );
}

export { SIGs };
