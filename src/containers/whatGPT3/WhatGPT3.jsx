import React from "react";
import { Feature } from "../../components";
import "./whatgpt3.css";

const WhatGPT3 = () => {
  return (
    <div className="sprc__whatgpt3 section__margin" id="whatsprc">
      <div className="sprc__whatgpt3-feature">
        <Feature
          title="About SALES"
          text="SALES, Barishal, was founded in 1988 by a group of dedicated individuals committed to serving humanity. The organization’s mission is to empower marginalized and vulnerable communities, especially children and persons with disabilities, by providing inclusive health, education, and livelihood services.

In its early years, SALES collaborated with organizations such as YMCA, CCDB, and World Vision Bangladesh, focusing on disaster management, relief distribution, women and child nutrition, and health education. After the passing of its founder, SALES experienced a brief pause in its activities. However, under new leadership, the organization has resumed its mission, upholding the founder's vision of dignity and equity for all. Today, SALES partners with SPRC Barishal, SHOMOTA Inclusive School, Generation Bangladesh, and BBDC to improve the lives of children and individuals with physical and intellectual disabilities, as well as those affected by stroke and paralysis."
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
