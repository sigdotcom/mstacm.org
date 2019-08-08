import * as React from "react";
import styled from 'styled-components';
import Hero from './sections/Hero';
import About from './sections/About';
import Nav from './sections/Nav';

const NavHeroWrapper = styled.div`
  height: 100vh;

  @media all and (max-width: 1600px) {
    height: 775px;
  }

  @media all and (max-width: 1400px) {
    height: 635px;
  }

  @media all and (max-width: 1200px) {
    height: 550px;
  }

  @media all and (max-width: 1000px) {
    height: 450px;
  }

  @media all and (max-width: 800px) {
    height: 350px;
  }

  @media all and (max-width: 480px) {
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
