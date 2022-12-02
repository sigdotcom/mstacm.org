import React from "react";
import "./index.css";
import NavBar from "./components/NavBar/NavBar";
import styled from "styled-components";

function App() {
    const HeroImage = styled.img`
    display: none;
  
    @media screen and (min-width: 768px) {
      width: 800px;
      display: block;
      opacity: 0.5;
      position: absolute;
      right: 300px;
      bottom: -250px;
      pointer-events: none;
    }
  
    @media screen and (min-width: 1300px) and (min-height: 800px) {
      width: 940px;
    }
  
    @media screen and (min-height: 1000px) {
      width: 800px;
      bottom: -250px;
    }
  `;
    return (
        <div className="App">
            <NavBar />
            {/* <img src="https://cdn.mstacm.org/static/acm-logo-large.svg"></img> */}
            <HeroImage src="https://cdn.mstacm.org/static/acm-logo-large.svg" />
        </div>
    );
}

export default App;