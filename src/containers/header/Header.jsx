import React from "react";
import "./header.css";
import ai from "../../assets/SPRCHeader.png";

const Header = () => {
  const handleClick = () => {
    const section = document.getElementById("whatsprc");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sprc__header section__padding">
      <div className="sprc__header-content">
        <h1 className="gradient__text">
          SALES – Society for Achieve Leadership Empowerment for People with Stroke
        </h1>
        <p>
          SALES has been empowering individuals with disabilities, especially stroke and paralysis patients, since 1988. We focus on building an inclusive society through health awareness, rehabilitation, and medical support. Committed to marginalized communities, SALES provides resources and educates the public on stroke prevention and rehabilitation, working with partners to foster positive change.
        </p>
        <div className="sprc__header-content__input">
          <button type="button" onClick={handleClick}>Get Started</button>
        </div>
      </div>
      <div className="sprc__header-image">
        <img src={ai} alt="ai" />
      </div>
    </div>
  );
};

export default Header;
