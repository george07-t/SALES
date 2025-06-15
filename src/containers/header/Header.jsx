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
          SALES – Social Advancement for Livelihood and Educational Support
        </h1>
        <p>
          At Social Advancement for Livelihood and Educational Support (SALES), we empower marginalized and vulnerable communities, particularly children and persons with disabilities, by providing inclusive health, education, and livelihood services. Our holistic programs address physical, emotional, and economic needs through rehabilitation, educational support, skill-building, and advocacy. Rooted in compassion, community participation, and sustainable development, SALES strives to promote social equity, dignity, and independence, ensuring lasting positive impact in the lives we serve.
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
