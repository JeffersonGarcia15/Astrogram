import { useState } from "react";
import { Modal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { DiPython, DiReact, DiNodejs } from "react-icons/di";
import {
  SiJavascript,
  SiRedux,
  SiDocker,
  SiHeroku,
  SiFlask,
  SiPostgresql,
  SiPostman,
  SiAmazonaws,
  SiHtml5,
  SiCss3,
  SiMaterialUi,
} from "react-icons/si";

import "./footer.css";

function Footer() {
  const history = useHistory();
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showAboutTheProject, setShowAboutTheProject] = useState(false);
  const [technologies, setTechnologies] = useState(false);

  function toggleShowHowItWorks() {
    setShowHowItWorks((prev) => !prev);
  }

  function toggleShowAboutTheProject() {
    setShowAboutTheProject((prev) => !prev);
  }

  return (
    <footer className="footer">
      {showHowItWorks && (
        <Modal onClose={toggleShowHowItWorks}>
          <div className="about__the__project show__it__works">
            <h1>
              Please visit the{" "}
              <a
                href="https://github.com/JeffersonGarcia15/Astrogram"
                target="_blank"
                className="footer__how__it__works__a"
                rel="noreferrer"
              >
                repo
              </a>{" "}
              to see some of the app's demos{" "}
            </h1>
          </div>
        </Modal>
      )}
      <nav className="footer__logo">
        <div
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            history.push(`/feed`);
          }}
        >
          <img
            className="logo-navbar"
            src="https://i.ibb.co/pWpLBFN/Astrogram.png"
            alt="Astrogram"
            border="0"
          />
        </div>
      </nav>
      <nav
        className="footer__explore footer__section
      "
      >
        <p className="footer__section__title">Explore</p>
        <ul className="footer__ul">
          <li className="footer__li">Planets</li>
          <li className="footer__li">Galaxies</li>
          <li className="footer__li">Habitable planets</li>
          <li className="footer__li">Black holes</li>
          <li className="footer__li">Stars</li>
          <li className="footer__li">Moons</li>
          <li className="footer__li">Other</li>
        </ul>
      </nav>
      <nav
        className="footer__about__us footer__section
      "
      >
        <p className="footer__section__title">About Us</p>
        <ul className="footer__ul footer__ul__technologies">
          <li className="footer__li" onClick={() => history.push("/about-us")}>
            Meet the team
          </li>
          <li className="footer__li" onClick={toggleShowAboutTheProject}>
            About the Project
          </li>
          <li className="footer__li">
            <a
              className="footer__about__us__a"
              href="https://github.com/JeffersonGarcia15/Astrogram"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Repo
            </a>
          </li>
          <li
            className="footer__li"
            onMouseEnter={() => setTechnologies(true)}
            onMouseLeave={() => setTechnologies(false)}
          >
            Tools
            <div
              onMouseEnter={() => setTechnologies(true)}
              onMouseLeave={() => setTechnologies(false)}
              className={`tools ${technologies ? "tools-active" : ""}`}
            >
              <p className="tools__header">Built with</p>
              <SiJavascript
                style={{ paddingRight: "10px", height: "30px", width: "30px" }}
              ></SiJavascript>
              <SiHtml5
                style={{ paddingRight: "10px", height: "30px", width: "30px" }}
              ></SiHtml5>
              <SiCss3
                style={{ paddingRight: "10px", height: "30px", width: "30px" }}
              ></SiCss3>
              <DiNodejs
                style={{ paddingRight: "10px", height: "30px", width: "30px" }}
              ></DiNodejs>
              <DiReact
                style={{ paddingRight: "10px", height: "30px", width: "30px" }}
              ></DiReact>
              <SiRedux
                style={{ paddingRight: "10px", height: "30px", width: "30px" }}
              ></SiRedux>
              <DiPython
                style={{ paddingRight: "10px", height: "30px", width: "30px" }}
              ></DiPython>
              <SiFlask
                style={{ paddingRight: "10px", height: "30px", width: "30px" }}
              ></SiFlask>
              <SiPostgresql
                style={{ paddingRight: "10px", height: "30px", width: "30px" }}
              ></SiPostgresql>
              <SiDocker
                style={{ paddingRight: "10px", height: "30px", width: "30px" }}
              ></SiDocker>
              <SiAmazonaws
                style={{ paddingRight: "10px", height: "30px", width: "30px" }}
              ></SiAmazonaws>
              <SiHeroku
                style={{ paddingRight: "10px", height: "30px", width: "30px" }}
              ></SiHeroku>
              <SiPostman
                style={{ paddingRight: "10px", height: "30px", width: "30px" }}
              ></SiPostman>
              <SiMaterialUi
                style={{ paddingRight: "10px", height: "30px", width: "30px" }}
              ></SiMaterialUi>
              <div className="t"></div>{" "}
            </div>
          </li>
        </ul>
      </nav>
      {showAboutTheProject && (
        <Modal onClose={toggleShowAboutTheProject}>
          <div className="about__the__project">
            <h1>
              {" "}
              This Instagram clone is a side project designed to practice
              front-end and back-end development and it is part of the capstone
              requirements at App Academy. It showcases image uploads, posts,
              post likes, comments, comment likes and followers.
            </h1>
          </div>
        </Modal>
      )}
      <nav
        className="footer__help footer__section
      "
      >
        <p className="footer__section__title">Help</p>
        <ul className="footer__ul">
          <li className="footer__li" onClick={toggleShowHowItWorks}>
            How It Works
          </li>
          <li className="footer__li" onClick={() => history.push("/faq")}>
            FAQ
          </li>
        </ul>
      </nav>
      <nav
        className="footer__social__media footer__section
      "
      >
        <p className="footer__section__title">Social Media</p>
        <ul className="footer__ul">
          <li className="footer__li">
            <a
              href="https://www.linkedin.com/in/jefferson-jurado-garcia/"
              target="_blank"
              rel="noreferrer"
              className="footer__social__media__a"
            >
              LinkedIn
            </a>
          </li>
          <li className="footer__li">
            <a
              href="https://github.com/JeffersonGarcia15"
              target="_blank"
              rel="noreferrer"
              className="footer__social__media__a"
            >
              GitHub
            </a>
          </li>
          <li className="footer__li">
            <a
              href="https://jefferson-portfolio.onrender.com/"
              target="_blank"
              rel="noreferrer"
              className="footer__social__media__a"
            >
              Portfolio
            </a>
          </li>
          <li className="footer__li">
            <a
              href="https://wellfound.com/u/jefferson-a-lopez-garcia"
              target="_blank"
              rel="noreferrer"
              className="footer__social__media__a"
            >
              Wellfound
            </a>
          </li>
        </ul>
      </nav>
      <nav
        className="footer__legal footer__section
      "
      >
        <p className="footer__section__title">Legal</p>
        <ul className="footer__ul">
          <li className="footer__li">Terms & Conditions</li>
          <li className="footer__li">Privacy Policy</li>
        </ul>
      </nav>
      <nav
        className="footer__extras footer__section
      "
      >
        <p className="footer__section__title">Extras</p>
        <ul className="footer__ul">
          <li className="footer__li">Become a contributor</li>
          <li className="footer__li">Partner with Us</li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
