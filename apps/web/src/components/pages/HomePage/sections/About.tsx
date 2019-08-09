import React from "react";
import styled from 'styled-components';
import { Element } from 'react-scroll';

const Wrapper = styled.div`
  .sectionWrapper {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
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
`

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
`

const SectionHeader = styled.h1`
  color: #EF9C6D;
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
`

const SectionText = styled.p`
  color: #092B35;
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
`

const About: React.FC<{}> = () => {
  return (
    <Wrapper>
      <Element className='sectionWrapper' name='about'>
        <Section>
          <SectionHeader>WHAT WE DO</SectionHeader>
          <SectionText>Mosquitofish sauger bigscale bigmouth buffalo freshwater eel, “red snapper Pacific viperfish Black pickerel, deep sea bonefish.” Squarehead catfish bramble shark, pencil catfish warbonnet houndshark European minnow, whiting oceanic.</SectionText>
        </Section>
        <Section>
          <SectionHeader>WHY WE DO IT</SectionHeader>
          <SectionText>Mosquitofish sauger bigscale bigmouth buffalo freshwater eel, “red snapper Pacific viperfish Black pickerel, deep sea bonefish.” Squarehead catfish bramble shark, pencil catfish warbonnet houndshark European minnow, whiting oceanic.</SectionText>
        </Section>
        <Section>
          <SectionHeader>HOW WE DO IT</SectionHeader>
          <SectionText>Mosquitofish sauger bigscale bigmouth buffalo freshwater eel, “red snapper Pacific viperfish Black pickerel, deep sea bonefish.” Squarehead catfish bramble shark, pencil catfish warbonnet houndshark European minnow, whiting oceanic.</SectionText>
        </Section>
      </Element>
    </Wrapper>
  );
};

export default About;