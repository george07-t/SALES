import React, { useState } from "react";
import "./footer.css";
import sprcLogo from "../../assets/SPRCHeader1.png";
import FooterModal from "../../components/footermodel/FooterModal";
import ReactMarkdown from "react-markdown";
import termsMd from "../../assets/Document/TermCondition.md";
import privacyMd from "../../assets/Document/PrivacyPolicy.md";

const Footer = () => {
  const [modal, setModal] = useState({ show: false, title: "", content: "" });

  const openModal = async (type) => {
    let title = "";
    let mdFile = "";
    if (type === "terms") {
      title = "Terms & Conditions";
      mdFile = termsMd;
    } else if (type === "privacy") {
      title = "Privacy Policy";
      mdFile = privacyMd;
    }
    if (mdFile) {
      const response = await fetch(mdFile);
      const text = await response.text();
      setModal({ show: true, title, content: text });
    }
  };

  const closeModal = () => setModal({ show: false, title: "", content: "" });

  return (
    <footer className="bg-footer text-white pt-5 pb-3">
      <div className="container">
        <div className="text-center mb-5">
          <h1
            className="gradient__text fw-bold mb-3"
            style={{
              fontSize: "2rem",
              lineHeight: "2.5rem",
              letterSpacing: "1px",
              textShadow: "0 2px 12px rgba(19,94,75,0.10)",
            }}
          >
            Join Us in Empowering Lives and Building a Better Future
          </h1>
        </div>
        <div className="row gy-5 justify-content-between align-items-start">
          <div className="col-12 col-md-6 col-lg-3 d-flex flex-column align-items-md-start align-items-center text-md-start text-center mb-4 mb-lg-0">
            <img
              src={sprcLogo}
              alt="SALES logo"
              style={{ width: 180, height: 90, objectFit: "contain" }}
              className="mb-3 rounded shadow-sm bg-white p-2"
            />
            <p className="small mb-2" style={{ opacity: 0.85 }}>
              Holding 121, Ambagan Club Goli, Police Line Road, Barishal.
            </p>
            <p className="small mb-0" style={{ opacity: 0.7 }}>
              All Rights Reserved
            </p>
          </div>
          <div className="col-6 col-lg-2 mb-4 mb-lg-0">
            <h4 className="h6 mb-3 text-uppercase" style={{ letterSpacing: "1px", color: "#A1D8B5" }}>Quick Links</h4>
            <ul className="list-unstyled mb-0">
              <li><a href="#whatsprc" className="footer-link">About Us</a></li>
              <li><a href="#blog" className="footer-link">Our Programs</a></li>
              <li><a href="#possibility" className="footer-link">Get Involved</a></li>
            </ul>
          </div>
          <div className="col-6 col-lg-2 mb-4 mb-lg-0">
            <h4 className="h6 mb-3 text-uppercase" style={{ letterSpacing: "1px", color: "#A1D8B5" }}>Company</h4>
            <ul className="list-unstyled mb-0">
              <li>
                <button
                  type="button"
                  className="footer-link btn btn-link p-0"
                  style={{ textAlign: "left" }}
                  onClick={() => openModal("terms")}
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer-link btn btn-link p-0"
                  style={{ textAlign: "left" }}
                  onClick={() => openModal("privacy")}
                >
                  Privacy Policy
                </button>
              </li>
              <li><a href="#possibility" className="footer-link">Donations</a></li>
              <li><a href="/admin" className="footer-link">Admin</a></li>
            </ul>
          </div>
          <div className="col-12 col-lg-3">
            <h4 className="h6 mb-3 text-uppercase" style={{ letterSpacing: "1px", color: "#A1D8B5" }}>Contact Us</h4>
            <div className="d-flex flex-column gap-1 mb-3">
              <span className="small d-flex align-items-center">
                <i className="bi bi-geo-alt-fill me-2" style={{ color: "#4CB572" }}></i>
                Holding 121, Ambagan Club Goli, Police Line Road, Barishal
              </span>
              <span className="small d-flex align-items-center">
                <i className="bi bi-telephone-fill me-2" style={{ color: "#4CB572" }}></i>
                <a
                  href="tel:01536243460"
                  className="footer-link"
                  style={{ display: "inline" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  01536243460
                </a>
              </span>
              <span className="small d-flex align-items-center">
                <i className="bi bi-envelope-fill me-2" style={{ color: "#4CB572" }}></i>
                <a
                  href="mailto:salesbarishal1988@gmail.com"
                  className="footer-link"
                  style={{ display: "inline" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  salesbarishal1988@gmail.com
                </a>
              </span>
            </div>
            <div className="d-flex gap-3 justify-content-start">
              <a href="https://www.facebook.com/profile.php?id=61574923051551" target="_blank" rel="noopener noreferrer" className="footer-link fs-4" aria-label="Facebook">
                <i className="bi bi-facebook" style={{ color: "#4CB572" }}></i>
              </a>
              <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="footer-link fs-4" aria-label="YouTube">
                <i className="bi bi-youtube" style={{ color: "#ff0000" }}></i>
              </a>
              <a href="tel:01536243460" className="footer-link fs-4" aria-label="Phone">
                <i className="bi bi-telephone-fill" style={{ color: "#4CB572" }}></i>
              </a>
              <a href="mailto:salesbarishal1988@gmail.com" className="footer-link fs-4" aria-label="Email">
                <i className="bi bi-envelope-fill" style={{ color: "#4CB572" }}></i>
              </a>
            </div>
          </div>
        </div>
        <hr className="border-light my-4" />
        <div className="text-center small" style={{ opacity: 0.8 }}>
          <p className="mb-0">© 2025 SALES. All Rights Reserved.</p>
        </div>
      </div>
      <FooterModal
        show={modal.show}
        onHide={closeModal}
        title={modal.title}
      >
        <ReactMarkdown>{modal.content}</ReactMarkdown>
      </FooterModal>
    </footer>
  );
};

export default Footer;