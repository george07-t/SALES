import React from "react";
import "./header.css";
import ai from "../../assets/SPRCHeader1.png";

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
          SALES – Social Advancement for Livelihood and Educational Support
        </h1>
        <p>
          SALES empowers marginalized communities, especially children and disabled individuals, through inclusive health, education, and livelihood services. Their holistic programs address physical, emotional, and economic needs through rehabilitation, education, skill-building, and advocacy. Founded on compassion, community participation, and sustainable development, SALES promotes social equity, dignity, and independence, ensuring lasting positive impact.
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
