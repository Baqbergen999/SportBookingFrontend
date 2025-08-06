import React from "react";
import "../../styles/Home.css";
import logo from "../../assets/Z logo 1.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../CONTEXT/AuthContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledPast = window.scrollY > window.innerHeight;
      setIsScrolled(scrolledPast);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <header className={`${isScrolled ? "header scrolled" : "header"}`}>
      <div className="header-left">
        <img src={logo} alt="Zhattapal Logo" className="logo" />
        <h1>ZHATTAPAL</h1>
      </div>

      <div className={`header-nav ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Басты бет
            </Link>
          </li>
          <li>
            <Link to="/aboutus" onClick={() => setMenuOpen(false)}>
              Біз туралы
            </Link>
          </li>
          <li>
            <Link to="/booking" onClick={() => setMenuOpen(false)}>
              Брондау
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Байланысу
            </Link>
          </li>
        </ul>
        {isLoggedIn ? (
          <div
            className={`${
              menuOpen ? "opened-header-actions" : "header-actions2"
            }`}
          >
            <button className="auth-btn primary-btn">
              <Link to={"/login"} onClick={handleLogout}>
                Шығу
              </Link>
            </button>
            <button className="auth-btn secondary-btn">
              <Link to={"/profile"}>Профиль</Link>
            </button>
          </div>
        ) : (
          <div
            className={`${
              menuOpen ? "opened-header-actions" : "header-actions2"
            }`}
          >
            <button className="auth-btn primary-btn">
              <Link to="/login">КІРУ</Link>
            </button>
            <button className="auth-btn secondary-btn">
              <Link to="/register">ТІРКЕЛУ</Link>
            </button>
          </div>
        )}
      </div>

      <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
};

export default Header;
