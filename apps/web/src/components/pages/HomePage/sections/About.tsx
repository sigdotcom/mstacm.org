import React from "react";
import { Element } from "react-scroll";
import styled from "styled-components";

import { PageConstraint } from "../../../common/PageConstraint";

const Wrapper = styled.div`
  .sectionWrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: auto;
    padding: 75px 5% 0 5%;
    background: white;
  }

  @media all and (max-width: 1200px) {
    .sectionWrapper {
      padding: 65px 5% 0 5%;
    }
  }

  @media all and (max-width: 800px) {
    .sectionWrapper {  
      flex-direction: column;
      padding 30px 5% 0 5%;
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
  font-family: "Roboto", sans-serif;
  font-size: 26px;
  margin: 30px 0 20px 0;
`;

const SectionText = styled.p`
  color: rgba(0, 0, 0, 0.65);
  font-size: 17px;
`;

const Line = styled.hr`
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  margin: 100px 0;
`;

const About: React.FC<{}> = () => {
  return (
    <PageConstraint>
      <Wrapper>
        <Element className="sectionWrapper" name="about">
          <Section>
            <SectionHeader>WHAT WE DO</SectionHeader>
            <SectionText>
              Mosquitofish sauger bigscale bigmouth buffalo freshwater eel, “red
              snapper Pacific viperfish Black pickerel, deep sea bonefish.”
              Squarehead catfish bramble shark, pencil catfish warbonnet
              houndshark European minnow, whiting oceanic.
            </SectionText>
          </Section>
          <Section>
            <SectionHeader>WHY WE DO IT</SectionHeader>
            <SectionText>
              Mosquitofish sauger bigscale bigmouth buffalo freshwater eel, “red
              snapper Pacific viperfish Black pickerel, deep sea bonefish.”
              Squarehead catfish bramble shark, pencil catfish warbonnet
              houndshark European minnow, whiting oceanic.
            </SectionText>
          </Section>
          <Section>
            <SectionHeader>HOW WE DO IT</SectionHeader>
            <SectionText>
              Mosquitofish sauger bigscale bigmouth buffalo freshwater eel, “red
              snapper Pacific viperfish Black pickerel, deep sea bonefish.”
              Squarehead catfish bramble shark, pencil catfish warbonnet
              houndshark European minnow, whiting oceanic.
            </SectionText>
          </Section>
        </Element>
        <Line />
      </Wrapper>
    </PageConstraint>
  );
};

export default About;
