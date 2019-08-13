import React from "react";
import { Element } from "react-scroll";
import styled from "styled-components";

const Wrapper = styled.div`
  .sectionWrapper {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: start;
    padding: 75px 50px;
    background: white;
  }

  @media all and (max-width: 1400px) {
    .sectionWrapper {
      padding: 65px 45px;
    }
  }

  @media all and (max-width: 1200px) {
    .sectionWrapper {
      padding: 57px 40px;
    }
  }

  @media all and (max-width: 800px) {
    .sectionWrapper {  
      flex-direction: column;
      padding 5%;
    }
  }
`;

const Section = styled.div`
  width: 22%;

  @media all and (max-width: 1101px) {
    width: 25%;
  }

  @media all and (max-width: 900px) {
    width: 28%;
  }

  @media all and (max-width: 800px) {
    width: 100%;
  }
`;

const SectionHeader = styled.h1`
  color: #ef9c6d;
  font-family: Roboto;
  font-size: 40px;
  font-weight: 500;
  margin: 0;

  @media all and (max-width: 1400px) {
    font-size: 36px;
  }

  @media all and (max-width: 1200px) {
    font-size: 33px;
  }

  @media all and (max-width: 1000px) {
    font-size: 30px;
  }

  @media all and (max-width: 900px) {
    font-size: 29px;
  }

  @media all and (max-width: 480px) {
    font-size: 36px;
  }
`;

const SectionText = styled.p`
  color: #092b35;
  font-size: 18px;
  font-weight: 600;

  @media all and (max-width: 1400px) {
    font-size: 16px;
  }

  @media all and (max-width: 1200px) {
    font-size: 15px;
  }

  @media all and (max-width: 1000px) {
    font-size: 14px;
  }

  @media all and (max-width: 900px) {
    font-size: 13.5px;
  }

  @media all and (max-width: 480px) {
    font-size: 19px;
  }
`;

const About: React.FC<{}> = () => {
  return (
    <Wrapper>
      <Element className="sectionWrapper" name="about">
        <Section>
          <SectionHeader>WHO WE ARE</SectionHeader>
          <SectionText>
            S&T ACM is Missouri S&T's largest computing organization with 120+
            members. ACM alumni have gone on to join companies such as Google,
            Microsoft, Amazon, and many more.
          </SectionText>
        </Section>
        <Section>
          <SectionHeader>WHAT WE DO</SectionHeader>
          <SectionText>
            We consist of 7 committees that focus on different computing topics
            for students and host some of Missouri S&T's most popular events
            including PickHacks and MegaMiner AI.
          </SectionText>
        </Section>
        <Section>
          <SectionHeader>WHY WE DO IT</SectionHeader>
          <SectionText>
            S&T ACM hopes to build a community of like-minded individuals
            interested in enriching their college experience and building
            relationships with companies and other students.
          </SectionText>
        </Section>
      </Element>
    </Wrapper>
  );
};

export default About;
