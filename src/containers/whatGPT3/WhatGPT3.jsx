import React from "react";
import { Feature } from "../../components";
import "./whatgpt3.css";

const WhatGPT3 = () => {
  return (
    <div className="sprc__whatgpt3 section__margin" id="whatsprc">
      <div className="sprc__whatgpt3-feature">
        <Feature
          title="About SALES"
          text="SALES, Barishal was established in 1988 by a group of dedicated individuals committed to serving humanity. The organization’s mission is to facilitate various developmental programs for persons with disabilities, the handicapped, the poor, and socially marginalized communities.
In its early years, SALES collaborated with organizations such as YMCA, CCDB, and World Vision Bangladesh on initiatives including disaster management, relief distribution, women and child nutrition programs, and health education. Following the passing of its founder, SALES experienced a temporary halt in its activities. However, the organization has since resumed operations under new leadership, carrying forward the original vision. Currently, SALES is actively working in partnership with SPRC Barishal, SHOMOTA Inclusive School, Generation Bangladesh, and BBDC to improve the lives of children and individuals with physical and mental disabilities, as well as those affected by stroke and paralysis.
"
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
