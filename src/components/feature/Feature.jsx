import React from "react";
import "./feature.css";

const Feature = ({ title, text, titleColor }) => {
  return (
    <div className="row feature-box py-3 px-2 mb-3">
      <div className="col-12 d-flex flex-column align-items-start">
        <div className="feature-bar mb-2"></div>
        <h1
          className="feature-title mb-0"
          style={titleColor ? { color: titleColor } : {}}
        >
          {title}
        </h1>
      </div>
      <div className="col-12">
        <p className="feature-text mb-0">{text}</p>
      </div>
    </div>
  );
};

export default Feature;