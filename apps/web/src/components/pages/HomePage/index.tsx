import * as React from "react";
import styled from "styled-components";

import About from "./sections/About";
import { Events } from "./sections/Events";
import { Footer } from "./sections/Footer";
import Hero from "./sections/Hero";
import { Nav } from "./sections/Nav";
import { SIGs } from "./sections/SIGs";
import { Sponsors } from "./sections/Sponsors";

const NavHeroWrapper = styled.div`
  height: 100vh;
  background: #f4f5f8;
  display: flex;
  flex-direction: column;
  max-height: 1000px;
  position: relative;

  @media screen and (min-height: 1000px) {
    height: 600px;
  }
`;

const HomePage: React.FC<{}> = () => {
  return (
    <div>
      <NavHeroWrapper>
        <Nav />
        <Hero />
      </NavHeroWrapper>
      <About />
      <SIGs />
      <Events />
      <Sponsors />
      <Footer />
    </div>
  );
};

export { HomePage };
