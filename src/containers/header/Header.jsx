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
          Since 1988, SALES has been empowering individuals with disabilities, especially stroke and paralysis patients. We aim to build an inclusive society through health awareness, rehabilitation, and medical support. SALES is committed to marginalized communities, providing resources and educating the public on stroke prevention, while working with partners to foster positive change.
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
