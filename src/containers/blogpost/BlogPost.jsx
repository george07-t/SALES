import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./blogpost.css";
import Footer from "../footer/Footer";
import Navbar from "../../components/navbar/Navbar";

const BlogPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { heading, date, sections } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!heading || !sections) {
    navigate("/#blog", { replace: true });
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="blogpost-container py-5" style={{ marginTop: "90px" }}>
        <button className="btn btn-outline-success mb-4" onClick={() => navigate(-1)}>
          &larr; Back to Blog
        </button>
        <h1 className="gradient__text mb-2">{heading}</h1>
        {date && <p className="text-muted mb-4">{date}</p>}
        {sections.map((section, idx) => (
          <div key={idx} className="mb-4">
            {section.images && section.images.length > 0 && (
              <div className="d-flex flex-row flex-nowrap overflow-auto gap-3 mb-3">
                {section.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={heading + " " + (idx + 1) + " image " + (i + 1)}
                    className="img-fluid blogpost-image shadow"
                    style={{ maxWidth: 300, height: "auto" }}
                  />
                ))}
              </div>
            )}
            {section.text && (
              <div className="fs-5" style={{ whiteSpace: "pre-line" }}>{section.text}</div>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default BlogPost;