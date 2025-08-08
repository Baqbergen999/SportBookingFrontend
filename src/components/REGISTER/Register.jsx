import { Link } from "react-router-dom";
import "../../styles/login.css";
import Photo from "../../assets/Rectangle 92_LE_upscale_balanced_x4.jpg";
import Header from "../ABOUT_US/Header";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    const weakPasswords = [
      "123456",
      "123456789",
      "password",
      "12345678",
      "qwerty",
      "12345",
      "123123",
      "111111",
      "abc123",
      "000000",
      "qwerty123",
      "1q2w3e4r",
    ];

    if (!username.trim()) {
      newErrors.username = "Атыңызды енгізіңіз";
    } else if (username.length < 3) {
      newErrors.username = "Атыңыз кемінде 3 символ болуы керек";
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(username)) {
      newErrors.username = "Атыңыз тек әріптерден тұруы керек";
    }

    if (!password) {
      newErrors.password = "Құпиясөзді енгізіңіз";
    } else if (password.length < 6) {
      newErrors.password = "Құпиясөз кемінде 6 символ болуы керек";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Құпиясөзде бір бас әріп болу керек";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Құпиясөзде бір сан болу керек";
    } else if (!/[!@#$%^&*_-]/.test(password)) {
      newErrors.password = "Құпиясөзде арнайы символ болу керек (!@#$%^&*)";
    } else if (weakPasswords.includes(password.toLowerCase())) {
      newErrors.password = "Құпиясөз тым оңай. Басқасын таңдаңыз.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await axios.post(
          "https://sportbooking-qr6b.onrender.com/register",
          {
            username,
            password,
          }
        );

        const { token, user } = response.data;

        localStorage.setItem("token", token);
        toast.success("Тіркелу сәтті өтті! Қош келдің " + user.username + "!");
      } catch (err) {
        console.error(err);
        toast.error("Қате шықты! Қайта тексеріңіз!");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="auth-container">
        <div className="login-left">
          <h1>REGISTER</h1>
          <p>
            Қош келдің! Пікір алмасып прогресстерді сақтау үшін аккаунтыңызға
            кіріп алыңыз! Жалғастыру:
          </p>

          <div className="social-buttons">
            <button className="google-btn">
              <img
                width="20px"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                alt=""
              />
              Google
            </button>
            <button className="apple-btn">
              <img
                width="16px"
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

          <form onSubmit={handleRegister} className="login-form">
            <input
              type="text"
              placeholder="Атыңыз"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p style={{ color: "red", marginTop: "-10px" }}>
                {errors.username}
              </p>
            )}

            <input
              type="password"
              placeholder="Құпиясөз"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p style={{ color: "red", marginTop: "-10px" }}>
                {errors.password}
              </p>
            )}

            <button type="submit" className="login-btn">
              REGISTER
            </button>
          </form>

          <p className="register-link">
            Аккаунтыңыз бар ма? <Link to="/login">Кіру</Link>
          </p>
        </div>

        <img className="login-right" src={Photo} alt="Register" />
      </div>
    </>
  );
}

export default Register;
