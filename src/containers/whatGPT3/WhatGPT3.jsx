import React from "react";
import { Feature } from "../../components";
import "./whatgpt3.css";

const WhatGPT3 = () => {
  return (
    <div className="sprc__whatgpt3 section__margin" id="whatsprc">
      <div className="sprc__whatgpt3-feature">
        <Feature
          title="About SALES"
          text="The organization’s mission is to empower marginalized and vulnerable communities, especially children and persons with disabilities, by providing inclusive health, education, and livelihood services."
        />


      </div>
      <div className="sprc__whatgpt3-heading">
        <h1 className="gradient__text">
          Empowering Lives, Building Futures
        </h1>
        <p>Join us in making a difference</p>
      </div>
      <div className="sprc__whatgpt3-container">

        <Feature
          title="Main Work"
          text="SALES runs health awareness programs, provides physiotherapy, and offers financial aid to individuals, especially stroke patients. We also partner with schools to assist disabled children with medical care."
        />
        <Feature
          title="Source of Fund"
          text={
            <>
              Funding comes from member subscriptions, donations, and CSR support from organizations such as{" "}
              <a
                href="https://www.facebook.com/paincare.smileface"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#CCDCDB" }} // Change this color as needed
              >
                SPRC Barishal
              </a>.
            </>
          }
        />
        <Feature
          title="Organizational Strength"
          text="With a dynamic managing committee, skilled staff, and transparent systems, SALES continues to grow and strengthen its impact in Barishal."
        />
        <Feature
          title="Years of Experience"
          text="With over 2 years of experience, SALES has consistently worked towards improving the lives of people with disabilities."
        />
      </div>
    </div>
  );
};

export default WhatGPT3;
