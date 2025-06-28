import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./blogpost.css";
import Footer from "../footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { Helmet } from "react-helmet-async";

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

  // Generate a meta description from the first section or a default
  const metaDescription =
    sections && sections.length > 0 && sections[0].text
      ? sections[0].text.substring(0, 150) +
        (sections[0].text.length > 150 ? "..." : "")
      : "Read the latest blog post from SALES – Social Advancement for Livelihood and Educational Support.";

  return (
    <>
      <Helmet>
        <title>{heading} | SALES Blog</title>
        <meta name="description" content={metaDescription} />
        <meta
          name="keywords"
          content="SALES, Blog, Updates, Stories, Nonprofit, Bangladesh, Social Advancement, Livelihood, Educational Support"
        />
        <meta property="og:title" content={heading + " | SALES Blog"} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <Navbar />
      <div className="blogpost-container py-5" style={{ marginTop: "90px" }}>
        <button
          className="btn btn-outline-success mb-4"
          onClick={() => navigate(-1)}
        >
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
              <div
                className="fs-5"
                style={{ whiteSpace: "pre-line" }}
              >
                {section.text}
              </div>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default BlogPost;