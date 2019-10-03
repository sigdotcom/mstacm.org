import * as React from "react";
import styled from "styled-components";

import { Footer } from "../HomePage/sections/Footer";
import { Nav } from "../HomePage/sections/Nav";
import { PrivacyPolicy } from "./PrivacyPolicy";

const NavWrapper = styled.div`
  background: #f4f5f8;
`;

const PrivacyPolicyPage: React.FC<{}> = () => {
  return (
    <div id="top">
      <NavWrapper>
        <Nav />
      </NavWrapper>
      <PrivacyPolicy />
      <Footer />
    </div>
  );
};

export { PrivacyPolicyPage };