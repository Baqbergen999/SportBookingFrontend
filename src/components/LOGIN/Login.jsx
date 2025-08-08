import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/login.css";
import Header from "../ABOUT_US/Header";
import Photo from "../../assets/Rectangle 92_LE_upscale_balanced_x4.jpg";
import jwt_decode from "jwt-decode";
import { useAuth } from "../CONTEXT/AuthContext";
import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://sportbooking-qr6b.onrender.com/login",
        {
          username,
          password,
        }
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const decoded = jwt_decode(token);
      const userId = decoded.id;
      console.log("userId:", userId);

      toast.success("Кіру сәтті өтті! Қош келдің " + user.username + "!");
      setIsLoggedIn(true);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      toast.error("Қате шықты! Қайта тексеріңіз!");
    }
  };

  return (
    <>
      <Header />
      <div className="auth-container">
        <div className="login-left">
          <h1>LOG IN</h1>
          <p>
            Қайтып келуіңмен достым! Пікір алмасып прогресстерді сақтау үшін
            аккаунтыңызға кіріп алыңыз! Жалғастыру :
          </p>
          <div className="social-buttons">
            <button className="google-btn">
              <img
                width={"20px"}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                alt=""
              />{" "}
              Google
            </button>
            <button className="apple-btn">
              <img
                width={"16px"}
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt=""
              />
              Apple
            </button>
          </div>
          <div className="line-or">
            <span className="line"></span>
            <span className="or">Немесе</span>
            <span className="line"></span>
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Атыңыз"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Құпиясөз"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-btn">
              LOGIN
            </button>
          </form>
          <p className="register-link">
            Аккаунтыңыз жоқ па? <Link to="/register">Регистрация</Link>
          </p>
        </div>
        <img className="login-right" src={Photo} alt="Login" />
      </div>
    </>
  );
}

export default Login;
