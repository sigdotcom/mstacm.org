import React from "react";
import { Element } from "react-scroll";
import styled, { AnyStyledComponent } from "styled-components";
import Icon from "react-eva-icons";
import { ISIG } from "./interfaces";
import { SIGsDisplay } from "./SIGsDisplay";


import { PageConstraint } from "../../../../components/PageConstraint";

const SIGsData: ISIG[] = [
  {
    color: "#299DDC",
    desc:
      "Our goal is to enrich the college experience and foster the next generation of innovators by hosting talks, competitions, and workshops that provide real-world learning opportunities and networking.",
    discord: "https://discord.gg/cQyXztZ",
    email: "acm@mst.edu",
    logoLink: "acm.png",
    logoLinkDark: "acm-dark.png",
    name: "General",
    website: "https://mstacm.org"
  },
  {
    color: "skyblue",
    desc:
      "Interested in software engineering, web development, or development operations? In ACM Web, we build industry-grade websites using top software engineering practices. ACM Web is developing the https://mstacm.org/ website and much more. Moreover, we host workshops on various skills in web development, Typescript, and Git.",
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
      "ACM Competition focuses on competitive programming, a mind-sport in which computer science problems are solved as quickly as possible. If you are interested in sharpening your algorithmic problem-solving skills, then this is the community for you.",
    discord: "https://discord.gg/4t954Ad",
    email: "acm@mst.edu",
    logoLink: "comp.png",
    logoLinkDark: "comp-dark.png",
    name: "Competition",
    website: "https://comp.mstacm.org"
  },
  {
    color: "orange",
    desc:
      "ACM Security helps develop the cybersecurity profession for the student body of Missouri University of Science and Technology by sponsoring high-quality workshops and lectures from both local and natinal industry professionals, as well as hosting on campus security events and competitions.",
    discord: "https://discord.gg/BfPyeHw",
    email: "crawlins@mst.edu",
    logoLink: "sec.png",
    logoLinkDark: "sec-dark.png",
    name: "Security",
    website: "https://acmsec.mst.edu"
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
    website: "https://women.mstacm.org"
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
  },
  {
    color: "turquoise",
    desc:
      "Focuses on improving and utilizing technical, and soft skills to create a game for the community’s arcade machine(s) on campus every semester/year. This community will also host game jams, so non-members can experience the game development process.",
    discord: "https://discord.gg/RZCYUpT",
    email: "acm@mst.edu",
    logoLink: "arcade.png",
    logoLinkDark: "arcade-dark.png",
    name: "Arcade",
    website: "https://discord.gg/RZCYUpT"
  },
  {
    color: "lime",
    desc:
      "A community of graduate students doing computing related work.",
    discord: "https://discord.gg/xWt5BVE",
    email: "acm@mst.edu",
    logoLink: "grad.png",
    logoLinkDark: "grad-dark.png",
    name: "Grad",
    website: "https://discord.gg/xWt5BVE"
  },

];

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

const SIGs: React.FC = (): JSX.Element => {
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
          <SIGsDisplay sigs={SIGsData} />
        </SIGsWrapper>
        <Line />
      </PageConstraint>
    </Element>
  );
};

export { SIGs };
