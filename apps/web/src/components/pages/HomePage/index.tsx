import * as React from "react";
import styled from 'styled-components';

import About from './sections/About';
import { Events } from "./sections/Events";
import { Footer } from "./sections/Footer";
import Hero from './sections/Hero';
import Nav from './sections/Nav';
import { SIGs } from "./sections/SIGs";
import { Sponsors } from "./sections/Sponsors";

const NavHeroWrapper = styled.div`
  height: 100vh;

  @media all and (max-width: 1700px) {
    height: 885px;
  }

  @media all and (max-width: 1600px) {
    height: 775px;
  }

  @media all and (max-width: 1475px) {
    height: 700px;
  }

  @media all and (max-width: 1300px) {
    height: 625px;
  }

  @media all and (max-width: 1150px) {
    height: 550px;
  }

  @media all and (max-width: 1000px) {
    height: 490px;
  }

  @media all and (max-width: 900px) {
    height: 425px;
  }

  @media all and (max-width: 800px) {
    height: 350px;
  }

  @media all and (max-width: 680px) {
    height: 100%;
  }
`

const HomePage: React.FC<{}> = () => {
  return (
    <div>
      <NavHeroWrapper>
        <Nav />
        <Hero />
      </NavHeroWrapper>
      <About />
      <SIGs />
      <Events/>
      <Sponsors/>
      <Footer/>
    </div>
  );
};

export { HomePage };

