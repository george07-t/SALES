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
import { Helmet } from "react-helmet-async"; // Add this import

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
      <Helmet>
        <title>SALES – Social Advancement for Livelihood and Educational Support</title>
        <meta
          name="description"
          content="SALES empowers marginalized communities, especially children and persons with disabilities, through inclusive health, education, and livelihood services in Barishal and beyond."
        />
        <meta
          name="keywords"
          content="SALES, Social Advancement, Livelihood, Educational Support, Barishal, Disability, Nonprofit, Health, Education, Rehabilitation, Donation, NGO, Bangladesh"
        />
        <meta name="author" content="SALES Organization" />
        <meta property="og:title" content="SALES – Social Advancement for Livelihood and Educational Support" />
        <meta property="og:description" content="Empowering marginalized communities through health, education, and livelihood services. Join SALES in making a difference." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sales-gray-theta.vercel.app/" />
      </Helmet>
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