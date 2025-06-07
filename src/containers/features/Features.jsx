import React from "react";
import { Feature } from "../../components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./features.css";

const featuresData = [
  {
    title: "Empowering Individuals with Disabilities",
    text: "SALES is committed to improving the lives of individuals with disabilities, especially those affected by stroke and paralysis. We focus on rehabilitation, medical care, and raising awareness to foster a more inclusive society."
  },
  {
    title: "Raising Awareness on Stroke Prevention",
    text: "Our goal is to educate communities on stroke prevention. Through regular awareness programs, we inform individuals about the importance of early detection and prevention methods, especially in marginalized communities."
  },
  {
    title: "Support for Marginalized Communities",
    text: "We strive to provide essential resources and support to the underprivileged and disabled, offering financial assistance for medical treatment and access to physiotherapy and rehabilitation services."
  },
  {
    title: "Collaboration with Local and International Partners",
    text: "SALES collaborates with organizations like SPRC Barishal, Shomota Inclusive School, and Generation Bangladesh to improve the quality of life for disabled individuals. Together, we make a collective impact on health, education, and social inclusion."
  },
];

const Features = () => {
  return (
    <section className="py-5 bg-transparent" id="features">
      <div className="container">
        <div className="row align-items-start g-5">
          <div className="col-12 col-lg-5">
            <div className="mb-4 mb-lg-0">
              <h1 className="gradient__text fw-bold mb-3" style={{ fontSize: "2.1rem", lineHeight: "2.7rem" }}>
                Our Goal: Empowering Lives, Fostering Inclusion
              </h1>
              <p className="lead" style={{ color: "#ff8a71", fontWeight: 500, fontSize: "1.1rem", lineHeight: "2rem", marginTop: "2rem" }}>
                Join us in making a difference and supporting a brighter future.
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <div className="d-flex flex-column gap-2">
              {featuresData.map((item, index) => (
                <Feature
                  title={item.title}
                  text={item.text}
                  key={item.title + index}
                  titleColor="#4CB572"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;