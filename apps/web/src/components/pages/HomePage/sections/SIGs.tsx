import React from "react";
import styled from "styled-components";
import { ISIG } from "./interfaces";
import { SIGsDisplay } from "./SIGsDisplay";

const SIGsData: ISIG[] = [
  {
    desc:
      "We make websites and tools for ACM that are used administratively and for public use.",
    discord: "https://www.google.com",
    email: "google@google.com",
    logoLink: "https://www.google.com",
    name: "Web",
    website: "https://www.google.com"
  },
  {
    desc:
      "We make websites and tools for ACM that are used administratively and for public use.",
    discord: "https://www.google.com",
    email: "google@google.com",
    logoLink: "https://www.google.com",
    name: "Comp",
    website: "https://www.google.com"
  },
  {
    desc:
      "We make websites and tools for ACM that are used administratively and for public use.",
    discord: "https://www.google.com",
    email: "google@google.com",
    logoLink: "https://www.google.com",
    name: "Tutor",
    website: "https://www.google.com"
  },
  {
    desc:
      "We make websites and tools for ACM that are used administratively and for public use.",
    discord: "https://www.google.com",
    email: "google@google.com",
    logoLink: "https://www.google.com",
    name: "Lounge",
    website: "https://www.google.com"
  },
  {
    desc:
      "We make websites and tools for ACM that are used administratively and for public use.",
    discord: "https://www.google.com",
    email: "google@google.com",
    logoLink: "https://www.google.com",
    name: "Security",
    website: "https://www.google.com"
  },
  {
    desc:
      "We make websites and tools for ACM that are used administratively and for public use.",
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
  padding: 15px;
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
