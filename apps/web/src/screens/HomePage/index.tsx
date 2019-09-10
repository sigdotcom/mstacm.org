import * as React from "react";
import styled from "styled-components";

import { Events } from "./sections/Events/index";
import { Footer } from "./sections/Footer";
import Hero from "./sections/Hero";
import { Membership } from "./sections/Membership";
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
  overflow: hidden;

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
      <SIGs />
      <Events />
      <Membership />
      <Sponsors />
      <Footer />
    </div>
  );
};

export { HomePage };
