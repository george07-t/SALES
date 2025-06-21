import React, { useState, useEffect } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/LogoSalesSprc.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";
import GetInvolvedModal from "../getinvolvedmodal/GetInvolvedModal";

const navItems = [
  { id: "home", label: "Home" },
  { id: "whatsprc", label: "About Us" },
  { id: "features", label: "Our Goals" },
  { id: "blog", label: "Our Work" },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [active, setActive] = useState("home");
  const [showInvolved, setShowInvolved] = useState(false);

  // Highlight active nav item only on homepage
  useEffect(() => {
    if (window.location.pathname !== "/") return;
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      let current = "home";
      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section) {
          const offset = section.offsetTop - 80;
          if (scrollPos >= offset) {
            current = item.id;
          }
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Universal navigation for all routes
  const handleNavClick = (id) => {
    if (window.location.pathname === "/") {
      // On homepage, scroll smoothly
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setShowMenu(false);
      }
    } else {
      // On other pages, go to homepage and anchor
      window.location.href = id === "home" ? "/" : `/#${id}`;
    }
  };

  // Donate button: always go to possibility section on homepage
  const handleDonate = () => {
    if (window.location.pathname === "/") {
      const section = document.getElementById("possibility");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#possibility";
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-footer fixed-top shadow-sm py-2">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center gap-2" href="/" onClick={() => setActive("home")}>
          <img src={logo} alt="logo" width={45} height={45} className="rounded-circle" />
          <span className="fw-bold fs-3 font-manrope stylish-brand">SALES</span>
        </a>
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          style={{ color: "#fff" }}
        >
          {showMenu ? <RiCloseLine size={27} color="#fff" /> : <RiMenu3Line size={27} color="#fff" />}
        </button>
        <div className={`collapse navbar-collapse${showMenu ? " show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-2">
            {navItems.map((item) => (
              <li className="nav-item" key={item.id}>
                <a
                  href={item.id === "home" ? "/" : `/#${item.id}`}
                  className={`nav-link nav-link-custom px-3 ${active === item.id ? "active" : ""}`}
                  style={{
                    fontFamily: "var(--font-family)",
                    fontWeight: 600,
                    fontSize: "18px",
                    lineHeight: "25px",
                    cursor: "pointer",
                  }}
                  onClick={e => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="d-flex gap-2 ms-lg-3 mt-3 mt-lg-0">
            <button
              className="btn btn-outline-orange fw-semibold px-3"
              type="button"
              onClick={() => setShowInvolved(true)}
            >
              Get Involved
            </button>
            <button className="btn btn-orange fw-semibold px-3" type="button" onClick={handleDonate}>
              Donate
            </button>
          </div>
        </div>
      </div>
      <div id="scroll-progress-bar"></div>
      <GetInvolvedModal show={showInvolved} onHide={() => setShowInvolved(false)} />
    </nav>
  );
};

export default Navbar;