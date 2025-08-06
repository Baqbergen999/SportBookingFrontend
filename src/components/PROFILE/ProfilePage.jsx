import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/profile.css";
import { useNavigate } from "react-router-dom";
import Header from "../ABOUT_US/Header";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3000";

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const EditIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <g id="style=fill">
        {" "}
        <g id="edit">
          {" "}
          <path
            id="Subtract"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.9405 3.12087L21.0618 5.24219C22.2334 6.41376 22.2334 8.31326 21.0618 9.48483L19.2586 11.288L12.8947 4.92403L14.6978 3.12087C15.8694 1.94929 17.7689 1.94929 18.9405 3.12087ZM11.834 5.98469L3.70656 14.1121C3.22329 14.5954 2.91952 15.2292 2.84552 15.9086L2.45151 19.5264C2.31313 20.7969 3.38571 21.8695 4.65629 21.7311L8.27401 21.3371C8.95345 21.2631 9.58725 20.9594 10.0705 20.4761L18.1979 12.3486L11.834 5.98469Z"
            fill="#ffffff"
          ></path>{" "}
        </g>{" "}
      </g>{" "}
    </g>
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const StadiumIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.69 2 6 4.69 6 8s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm8 4c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4v-2h16v2z" />
  </svg>
);

const ChatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
  </svg>
);

const BookmarkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
  </svg>
);

const LoadingIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    className="loading-spinner"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="31.416"
      strokeDashoffset="31.416"
    >
      <animate
        attributeName="stroke-dasharray"
        dur="2s"
        values="0 31.416;15.708 15.708;0 31.416"
        repeatCount="indefinite"
      />
      <animate
        attributeName="stroke-dashoffset"
        dur="2s"
        values="0;-15.708;-31.416"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

const ClipboardIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="currentColor"
    opacity="0.5"
  >
    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
  </svg>
);

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);

  const [modalContent, setModalContent] = useState({ title: "", type: "" });
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const navigate = useNavigate();

  const [savedSports, setSavedSports] = useState([]);

  const token = localStorage.getItem("token");
  const decoded = jwt_decode(token);
  const userId = decoded.id;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${userId}/saved`)
      .then((res) => setSavedSports(res.data))
      .catch((err) => console.error("Сақталғандар қателігі:", err));
  }, []);

  const [bookedItems, setBookedItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${userId}/booked`)
      .then((res) => {
        console.log("Брондалған алаңдар:", res.data);
        setBookedItems(res.data);
      })
      .catch((err) => console.error("Қате:", err));
  }, []);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetch(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Қате: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProfile({
          username: data.username,
          email: data.email || "",
          phone: data.phone || "",
          avatar: data.avatar || "Undefined",
          joinDate: new Date(data.join_date).toLocaleDateString("kk-KZ"),
          bookmarkedAreas: 0,
          reviewsWritten: 0,
          savedItems: 0,
        });
      })
      .catch((err) => {
        console.error("Жүктеу қатесі:", err);
        router.push("/login");
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };

  const handleEdit = (field) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
    setEditMode((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const handleSaveAll = () => {
    const token = localStorage.getItem("token");
    const profileData = {
      username: profile.username,
      email: profile.email,
      phone: profile.phone,
      avatar: profile.avatar,
    };

    fetch(`${API_URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Сақтау қатесі");
        return res.json();
      })
      .then(() => {
        const button = document.querySelector(".save-btn");
        if (button) {
          button.style.background =
            "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)";
          button.innerHTML = "Сақталды! ✅";
          setTimeout(() => {
            button.style.background =
              "linear-gradient(135deg, #76d498 0%, #DEFF00 100%)";
            button.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 8px">
              <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
            </svg>Барлық өзгерістерді сақтау`;
          }, 2000);
        }
        toast.success("Параметрлер сәтті жаңартылды!");
      })
      .catch((err) => {
        console.error("Сақтау қатесі:", err);
        toast.error("Серверге сақтау кезінде қате туындады!");
      });
  };

  const openModal1 = (title, type) => {
    setModalContent({ title, type });
    setModalOpen1(true);
  };

  const openModal2 = (title, type) => {
    setModalContent({ title, type });
    setModalOpen2(true);
  };

  const openModal3 = (title, type) => {
    setModalContent({ title, type });
    setModalOpen3(true);
  };

  const closeAllModal = () => {
    setModalOpen1(false);
    setModalOpen2(false);
    setModalOpen3(false);
    setModalContent({ title: "", type: "" });
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Тек сурет файлдарын жүктеу аласыз!");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Файл өлшемі 5MB-тан көп!");
        return;
      }
      setUploadingAvatar(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
        setTimeout(() => {
          setProfile((prev) => ({
            ...prev,
            avatar: e.target.result,
          }));
          setUploadingAvatar(false);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    const fileInput = document.getElementById("avatar-upload");
    if (fileInput) {
      fileInput.click();
    }
  };

  const removeAvatar = () => {
    setProfile((prev) => ({
      ...prev,
      avatar: "/placeholder.svg?height=140&width=140&text=👤",
    }));
    setAvatarPreview(null);
    const fileInput = document.getElementById("avatar-upload");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Сіз аккаунттын сәтті шықтыңыз!");
    navigate("/login");
  };

  const EditableField = ({
    field,
    value,
    type = "text",
    IconComponent,
    placeholder,
  }) => (
    <div className="info-value">
      {editMode[field] ? (
        <input
          type={type}
          value={value}
          onChange={(e) =>
            setProfile((prev) => ({
              ...prev,
              [field]: e.target.value,
            }))
          }
          onBlur={(e) => handleSave(field, e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSave(field, e.target.value);
            }
          }}
          autoFocus
          placeholder={placeholder || `${field} енгізіңіз...`}
        />
      ) : (
        <span>{value?.trim() === "" ? "XXX-XXX-XXX" : value}</span>
      )}
      <button
        className="edit-btn"
        onClick={() => handleEdit(field)}
        title={editMode[field] ? "Сақтау" : "Өзгерту"}
      >
        {editMode[field] ? "Ok" : <IconComponent />}
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div style={{ marginBottom: "20px", color: "#22c55e" }}>
            <LoadingIcon />
          </div>
          <div style={{ color: "#22c55e", fontWeight: "600" }}>
            Профиль жүктелуде...
          </div>
          <div style={{ fontSize: "14px", color: "#64748b", marginTop: "8px" }}>
            Сәл күте тұрыңыз
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="error-container">
        <div className="error-content">
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>😕</div>
          <div style={{ color: "#ef4444", fontWeight: "600" }}>
            Профиль табылмады
          </div>
          <div style={{ fontSize: "14px", color: "#64748b", marginTop: "8px" }}>
            <button
              onClick={() => router.push("/login")}
              style={{
                color: "#3b82f6",
                textDecoration: "underline",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Link to={"/login"}>Логин бетіне оралу</Link>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleUnsave = async (sportId) => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const userId = decoded?.id;

      await axios.post("http://localhost:3000/users/unsave", {
        userId,
        sportId,
      });

      setSavedSports((prev) => prev.filter((sport) => sport.id !== sportId));
      toast.success("Дерек сәтті өшірілді!");
    } catch (error) {
      console.error("Өшіру қатесі:", error);
      toast.error("Өшіру кезінде қате шықты!");
    }
  };

  const handleUnbook = async (sportId) => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const userId = decoded?.id;

      await axios.post("http://localhost:3000/users/unbook", {
        userId,
        sportId,
      });

      setBookedItems((prev) => prev.filter((sport) => sport.id !== sportId));
      toast.success("Брон сәтті өшірілді!");
    } catch (error) {
      console.error("Өшіру қатесі:", error);
      toast.error("Броннан бас тарта алмадыңыз!");
    }
  };

  return (
    <>
      <Header />
      <div className="body">
        <div className="profile-container">
          <div className="profile-header">
            <button className="logout-btn" onClick={handleLogout}>
              <Link to={"/login"}>Шығу</Link>
            </button>

            <div className="avatar-container" onClick={triggerFileUpload}>
              <div className="avatar-wrapper">
                <img
                  src={
                    avatarPreview ||
                    profile.avatar ||
                    "/placeholder.svg?height=140&width=140&text=👤"
                  }
                  className="avatar"
                  alt="Avatar"
                />
                {uploadingAvatar && (
                  <div className="avatar-loading">
                    <LoadingIcon />
                  </div>
                )}
                <div className="avatar-upload-hint">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                  <span>Сурет жүктеу үшін басыңыз</span>
                </div>
                {profile.avatar !==
                  "/placeholder.svg?height=140&width=140&text=👤" && (
                  <button
                    className="avatar-remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeAvatar();
                    }}
                    title="Суретті өшіру"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                    </svg>
                  </button>
                )}
              </div>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                style={{ display: "none" }}
              />
            </div>

            <h1 className="username">{profile.username}</h1>
            <p className="join-date">
              <CalendarIcon />
              <span>Қосылған күні: {profile.joinDate}</span>
            </p>
          </div>

          <div className="profile-content">
            <div className="section">
              <h2 className="section-title">
                <UserIcon />
                Жеке ақпарат
              </h2>
              <div className="info-grid">
                <div className="info-item">
                  <div className="info-label">
                    <UserIcon />
                    Пайдаланушы аты
                  </div>
                  <EditableField
                    field="username"
                    value={profile.username}
                    IconComponent={EditIcon}
                    placeholder="Пайдаланушы атын енгізіңіз"
                  />
                </div>

                <div className="info-item">
                  <div className="info-label">
                    <PhoneIcon />
                    Телефон нөмірі
                  </div>
                  <EditableField
                    field="phone"
                    value={profile.phone}
                    type="tel"
                    IconComponent={EditIcon}
                    placeholder="+7 (777) 123-45-67"
                  />
                </div>

                <div className="info-item">
                  <div className="info-label">
                    <EmailIcon />
                    Электрондық пошта
                  </div>
                  <EditableField
                    field="email"
                    value={profile.email}
                    type="email"
                    IconComponent={EditIcon}
                    placeholder="example@email.com"
                  />
                </div>

                <div className="info-item">
                  <div className="info-label">
                    <LockIcon />
                    Құпия сөз
                  </div>
                  <div className="info-value">
                    <span>••••••••</span>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        toast.error("Құпиясөзді өзгертуге рұқсат жоқ!")
                      }
                      title="Өзгерту"
                    >
                      <LockIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="section">
              <h2 className="section-title">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                </svg>
                Белсенділік статистикасы
              </h2>
              <div className="stats-grid">
                <div
                  className="stat-item clickable"
                  onClick={() =>
                    openModal1("Брондалған алаңдар", "bookmarkedAreas")
                  }
                >
                  <div className="stat-icon">
                    <StadiumIcon />
                  </div>
                  <div className="stat-value">{bookedItems.length}</div>
                  <div className="stat-label">Брондалған алаңдар</div>
                </div>

                <div
                  className="stat-item clickable"
                  onClick={() =>
                    openModal2("Жазылған пікірлер", "reviewsWritten")
                  }
                >
                  <div className="stat-icon">
                    <ChatIcon />
                  </div>
                  <div className="stat-value">{profile.reviewsWritten}</div>
                  <div className="stat-label">Жазылған пікірлер</div>
                </div>

                <div
                  className="stat-item clickable"
                  onClick={() => openModal3("Сақталған заттар", "savedItems")}
                >
                  <div className="stat-icon">
                    <BookmarkIcon />
                  </div>
                  <div className="stat-value">{savedSports.length}</div>
                  <div className="stat-label">Сақталған заттар</div>
                </div>
              </div>
            </div>

            <button className="save-btn" onClick={handleSaveAll}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ marginRight: "8px" }}
              >
                <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
              </svg>
              Барлық өзгерістерді сақтау
            </button>
          </div>
        </div>

        {modalOpen1 && (
          <div className="modal-overlay" onClick={closeAllModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">{modalContent.title}</h2>
                <button className="modal-close" onClick={closeAllModal}>
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <div className="empty-content">
                  {bookedItems.length === 0 ? (
                    <div>
                      <div className="empty-icon">
                        <ClipboardIcon />
                      </div>
                      <p className="empty-text">
                        Мұнда сіздің деректеріңіз болады
                      </p>
                      <p className="subtext">Сіз ештеңе сақтамадыңыз</p>
                    </div>
                  ) : (
                    <div className="sport-cards">
                      {bookedItems.map((item) => (
                        <div key={item.id} className="sport-card">
                          <img src={item.image} alt={item.name} />
                          <div className="sport-card-content">
                            <h3>{item.name}</h3>
                            <p>
                              {item.city} | {item.type}
                            </p>
                            <p>Бағасы: {item.price} ₸</p>
                            <button onClick={() => handleUnbook(item.id)}>
                              Бас тарту
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {modalOpen2 && (
          <div className="modal-overlay" onClick={closeAllModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">{modalContent.title}</h2>
                <button className="modal-close" onClick={closeAllModal}>
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <div className="empty-content">
                  <div className="empty-icon">
                    <ClipboardIcon />
                  </div>
                  <p className="empty-text">Мұнда сіздің деректеріңіз болады</p>
                  <p className="subtext">Сіз ештеңе сақтамадыңыз</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {modalOpen3 && (
          <div className="modal-overlay" onClick={closeAllModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">{modalContent.title}</h2>
                <button className="modal-close" onClick={closeAllModal}>
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <div className="empty-content">
                  {savedSports.length === 0 ? (
                    <div>
                      <div className="empty-icon">
                        <ClipboardIcon />
                      </div>
                      <p className="empty-text">
                        Мұнда сіздің деректеріңіз болады
                      </p>
                      <p className="subtext">Сіз ештеңе сақтамадыңыз</p>
                    </div>
                  ) : (
                    <div className="sport-cards">
                      {savedSports.map((sport) => (
                        <div key={sport.id} className="sport-card">
                          <img src={sport.image} alt={sport.name} />
                          <div className="sport-card-content">
                            <h3>{sport.name}</h3>
                            <p>
                              {sport.city} | {sport.type}
                            </p>
                            <p>Бағасы: {sport.price} ₸</p>

                            <button onClick={() => handleUnsave(sport.id)}>
                              Бас тарту
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
