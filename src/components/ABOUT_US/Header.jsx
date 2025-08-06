import "../../styles/Home.css";
import logo from "../../assets/Z logo 1.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../CONTEXT/AuthContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <header className="header2">
      <div className="header-left2">
        <img src={logo} alt="Zhattapal Logo" className="logo2" />
        <h1>ZHATTAPAL</h1>
      </div>

      <nav className={`header-nav2 ${menuOpen ? "open" : ""}`}>
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
              menuOpen ? "opened-header-actions2" : "header-actions2"
            }`}
          >
            <button className="auth-btn2 primary-btn2">
              <Link to={"/login"} onClick={handleLogout}>
                Шығу
              </Link>
            </button>
            <button className="auth-btn2 secondary-btn2">
              <Link to={"/profile"}>Профиль</Link>
            </button>
          </div>
        ) : (
          <div
            className={`${
              menuOpen ? "opened-header-actions2" : "header-actions2"
            }`}
          >
            <button className="auth-btn2 primary-btn2">
              <Link to="/login">КІРУ</Link>
            </button>
            <button className="auth-btn2 secondary-btn2">
              <Link to="/register">ТІРКЕЛУ</Link>
            </button>
          </div>
        )}
      </nav>

      <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
}
