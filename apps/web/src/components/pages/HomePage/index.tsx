import * as React from "react";
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Nav } from './sections/Nav';

const HomePage: React.FC<{}> = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <About />
    </div>
  );
};

export { HomePage };
