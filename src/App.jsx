import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/REGISTER/Register";
import Login from "./components/LOGIN/Login";
import Home from "./components/HOME/Result";
import Booking from "./components/BOOKING_PAGE/Booking";
import Profile from "./components/PROFILE/ProfilePage";
import AboutUs from "./components/ABOUT_US/Body";
import { AuthProvider } from "./components/CONTEXT/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const isAuth = !!localStorage.getItem("token");
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/booking" element={<Booking />}></Route>
          <Route
            path="/profile"
            element={isAuth ? <Profile /> : <Navigate to="/login" />}
          />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
      />
    </AuthProvider>
  );
}

export default App;
