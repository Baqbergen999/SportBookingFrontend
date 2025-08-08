import React from "react";
import "../../styles/Home.css";
import { FaYoutube, FaTwitter, FaTiktok, FaGithub } from "react-icons/fa";
import logo from "../../assets/black-logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <img src={logo} alt="" />
        </div>

        <div className="footer-links">
          <div>
            <p>Компаниялар</p>
            <p>Серіктестер</p>
            <p>Туралы</p>
            <p>Басқа</p>
          </div>
          <div>
            <p>Сайт картасы</p>
            <p>Кері байланыс</p>
            <p>Көмек орталығы</p>
            <p>Сұрақтар</p>
          </div>
          <div>
            <p>Орналасуы</p>
            <p>
              Алматы қаласы, Медеу ауданы
              <br />
              Мәуленова 92
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Барлық құқықтар қорғалған</p>
        <div className="social-icons">
          <FaYoutube />
          <FaTwitter />
          <FaTiktok />
          <FaGithub />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
