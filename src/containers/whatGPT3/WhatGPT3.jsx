import React from "react";
import { Feature } from "../../components";
import "./whatgpt3.css";

const WhatGPT3 = () => {
  return (
    <div className="sprc__whatgpt3 section__margin" id="whatsprc">
      <div className="sprc__whatgpt3-feature">
        <Feature
          title="About SALES"
          text="SALES, Barishal, was founded in 1988 by a passionate group of individuals who were dedicated to serving humanity. The organization’s mission is to facilitate various developmental programs for persons with disabilities, the handicapped, the impoverished, and marginalized communities.
  
  In its early years, SALES worked alongside organizations such as YMCA, CCDB, and World Vision Bangladesh, focusing on disaster management, relief distribution, women and child nutrition, and health education. Following the passing of its founder, SALES faced a brief suspension of activities. However, under new leadership, the organization has resumed its operations, continuing to carry forward the founder's vision. Today, SALES collaborates with partners such as SPRC Barishal, SHOMOTA Inclusive School, Generation Bangladesh, and BBDC, working to improve the lives of children and individuals with physical and mental disabilities, as well as those affected by stroke and paralysis."
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
