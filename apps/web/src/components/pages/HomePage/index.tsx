import * as React from "react";
import { Events } from "./sections/Events";
import { Sponsors } from "./sections/Sponsors";
import { Footer } from "./sections/Footer";

const HomePage: React.FC<{}> = () => {
  return (
    <div>
      <Events/>
      <Sponsors/>
      <Footer/>
    </div>
  );
};

export { HomePage };

