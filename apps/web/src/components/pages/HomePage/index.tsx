import * as React from "react";
import styled from 'styled-components';
import Hero from './sections/Hero';
import About from './sections/About';
import Nav from './sections/Nav';

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
    </div>
  );
};

export { HomePage };
