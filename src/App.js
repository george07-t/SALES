import React, { useEffect } from "react";
import "./App.css";
import {
  Footer,
  Header,
  Possibility,
  Features,
  WhatGPT3,
  Blog,
  ScrollPhoto
} from "./containers";

import { Navbar } from "./components";

const App = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      const bar = document.getElementById("scroll-progress-bar");
      if (bar) bar.style.width = `${scrolled}%`;
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App">
      <div id="home" className="gradient__bg">
        <Navbar />
        <Header />
      </div>
      <div className="main-content">
        <ScrollPhoto />
        <WhatGPT3 />
        <Features />
        <Possibility />
        <Blog />
        <Footer />
      </div>
    </div>
  );
};

export default App;