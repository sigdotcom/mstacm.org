import React from "react";
import { Element } from "react-scroll";
import styled, { AnyStyledComponent } from "styled-components";
import { ICommunity } from "./interfaces";
import { CommunitiesDisplay } from "./CommunitiesDisplay";

import Icon from "react-eva-icons";

import { PageConstraint } from "../../../../components/PageConstraint";

const CommunitiesData: ICommunity[] = [
  {
    color: "skyblue",
    desc:
      "Interested in software engineering, web development, or development operations? In ACM Web, we attempt to build production-grade websites using software engineering skills and development patterns with weekly development meetings.  Currently, ACM Web is developing the https://acm.mst.edu/ website. Moreover, we host workshops on various foundational skills such as Python, Git, HTML, CSS, and many others.",
    discord: "https://discord.gg/eKtkR4k",
    email: "acm@mst.edu",
    logoLink: "web.png",
    logoLinkDark: "web-dark.png",
    name: "Web",
    website: "https://mstacm.org"
  },
  {
    color: "#ff8888",
    desc:
      "ACM Competition focuses primarily on competitive programming. With weekly lectures from Dr. Morales we tackle challenge problems from many online judge websites such as Kattis (https://open.kattis.com/) and UVA (https://uva.onlinejudge.org/).  We also hold our own programming contests on campus where people can win the admiration of their peers and some great prizes.",
    discord: "https://discord.gg/4t954Ad",
    email: "acm@mst.edu",
    logoLink: "comp.png",
    logoLinkDark: "comp-dark.png",
    name: "Competition",
    website: "https://acmcomp.mst.edu"
  },
  {
    color: "orange",
    desc:
      "ACM Security helps develop the cybersecurity profession for the student body of Missouri University of Science and Technology by sponsoring high-quality workshops and lectures from both local and natinal industry professionals, as well as hosting on campus security events and competitions.",
    discord: "https://discord.gg/BfPyeHw",
    email: "sigsec@mst.edu",
    logoLink: "sec.png",
    logoLinkDark: "sec-dark.png",
    name: "Security",
    website: "https://acmsigsec.mst.edu"
  },
  {
    color: "pink",
    desc:
      "ACM Game develops and hosts artificial intelligence programming competitions on S&T's campus in Rolla, Missouri. We utilize many programming languages, tools and development strategies standard to the Computer Science Industry.  Our members gain valuable experience on one of our five development teams: Arena, Game, Public Relations, Visualizer, and Web. ACM Game offers experience working on a real team, with fellow students and mentors to learn and grow as a software developer. We accept new members of all skill levels and majors, so don't hesitate to contact us.",
    discord: "https://discord.gg/xdXwxup",
    email: "siggame@mst.edu",
    logoLink: "game.png",
    logoLinkDark: "game-dark.png",
    name: "Game",
    website: "http://siggame.io/"
  },
  {
    color: "lavender",
    desc:
      "ACM Data is a data focused org covering topics like Data Science, Data Mining, Data Analytics, and Data Engineering. Data Science, commonly seen as a combination of most data professions, is a new field with an infinite landscape. Our goal is to catalyze a new era of Data Science by using our curiosity to explore this landscape and push new standards. In ACM Data, we participate in competition sites such as Kaggle, tell stories using data, learn what’s new in Data Science, and whatever is necessary to be cutting edge.",
    discord: "https://discord.gg/pm2KJtt",
    email: "acm@mst.edu",
    logoLink: "data.png",
    logoLinkDark: "data-dark.png",
    name: "Data",
    website: "https://modata.blog"
  },
  {
    color: "wheat",
    desc:
      "ACM-W aims to facilitate a thriving community of women in computing through the organizing of great activities, networking, and mentorship programs. We aim to address the issue of retention of women in computer science by creating a support system for academic and professional pursuits and empowering our members to pursue their goals through knowledge and education about women's contribution to technology. This group is open to all students (male or female) that wish to promote women in computing.",
    discord: "https://discord.gg/hh2wkmq",
    email: "acmw@mst.edu",
    logoLink: "acm-w.png",
    logoLinkDark: "acm-w-dark.png",
    name: "Women",
    website: "https://acmw.mst.edu"
  },
  {
    color: "aquamarine",
    desc:
      "ACM Hack introduces students to the world of hackathons: weekend long events where students come together to turn ideas into reality. We organize travel and attendance to these events, which take place across the Midwest and the country.  We also run PickHacks, the annual student-run hackathon held at S&T in March. Alongside hackathons, we also host events about various design thinking concepts, hackathon preparation, and much more. Skill level and major doesn’t matter here — as long as you like building new things and meeting awesome people, ACM Hack is right for you.",
    discord: "https://discord.gg/zkwtu9p",
    email: "pickhacks@mst.edu",
    logoLink: "hack.png",
    logoLinkDark: "hack-dark.png",
    name: "Hack",
    website: "https://pickhacks.io"
  }
];

const CommunitiesWrapper: AnyStyledComponent = styled.div`
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

const Communities: React.FC = (): JSX.Element => {
  return (
    <Element name="communities">
      <PageConstraint>
        <CommunitiesWrapper>
          <Heading>
            <Icon name="people" size="large" fill="#777" /> Our Communities
          </Heading>
          <Description>
            Members of our communities (formerly known as Communities) hone their
            computing skills in special topics, listed below, and work towards
            highly specialized goals in development and career-making. Click on
            the topic to learn more about the community and find out how to get
            involved!
          </Description>
          <CommunitiesDisplay communities={CommunitiesData} />
        </CommunitiesWrapper>
        <Line />
      </PageConstraint>
    </Element>
  );
};

export { Communities };
