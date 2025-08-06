import { useState, useEffect } from "react";
import "../../styles/Booking.css";
import tournir from "../../assets/booking-element.png";
import group1 from "../../assets/group1.png";
import group2 from "../../assets/group2.png";
import group3 from "../../assets/group3.png";
import theEnd from "../../assets/the-end.png";
import Header from "../../components/ABOUT_US/Header";
import Footer from "../HOME/Footer";
import { Star } from "lucide-react";
import axios from "axios";
import jwt_decode from "jwt-decode/build/jwt-decode.esm.js";
import { toast } from "react-toastify";

const Booking = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    email: "",
    participants: 1,
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newFacility, setNewFacility] = useState({
    name: "",
    city: "",
    address: "",
    type: "",
    capacity: "",
    workinghours: "",
    amenities: [],
    price: "",
    image: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFacilityDetail, setSelectedFacilityDetail] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    timeSlot: "",
    duration: 1,
    players: 1,
  });
  const facilitiesPerPage = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [sportsData, setSportsData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/sportsData")
      .then((response) => {
        setSportsData(response.data);
      })
      .catch((error) => {
        console.error("Қате шықты:", error);
      });
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!selectedFacilityDetail?.id) return;

      try {
        const response = await axios.get(
          `http://localhost:3000/reviews/${selectedFacilityDetail.id}`
        );

        const fetchedReviews = response.data.reviews || [];

        // ground объектісін жаңарту
        setGround((prev) => ({
          ...prev,
          reviews: fetchedReviews,
        }));
      } catch (err) {
        console.error("Пікірлерді жүктеу қатесі:", err);
      }
    };

    fetchReviews();
  }, [selectedFacilityDetail?.id]);

  const [ground, setGround] = useState({
    reviews: [],
  });

  const [reviewUserName, setReviewUserName] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  const handleSave = async (sportId) => {
    try {
      const token = localStorage.getItem("token");
      const decoded = token ? jwt_decode(token) : null;
      const userId = decoded?.id;

      const response = await axios.post("http://localhost:3000/users/save", {
        userId,
        sportId,
      });

      toast.info("Спорт профильде сақталды! Бас тарту үшін профильге өтіңіз.");
    } catch (err) {
      console.error("Қате:", err.response?.data || err.message);
    }
  };

  const handleAddReview = async () => {
    if (
      reviewRating === 0 ||
      reviewComment.trim() === "" ||
      reviewUserName.trim() === ""
    ) {
      toast.error("Шолу жіберілмеді!!");
      return;
    }

    const newReview = {
      id: String(Date.now()),
      userName: reviewUserName,
      rating: reviewRating,
      comment: reviewComment,
      date: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:3000/reviews/add", {
        sportId: selectedFacilityDetail.id,
        review: newReview,
      });

      setGround((prev) => ({
        ...prev,
        reviews: [newReview, ...prev.reviews],
      }));

      toast.success("Шолу сәтті қосылды!");
      setReviewRating(0);
      setReviewComment("");
      setReviewUserName("");
    } catch (error) {
      console.error("Пікірді серверге қосу кезінде қате:", error);
      toast.error("Қате шықты! Кейінірек қайталап көріңіз!");
    }
  };

  const cities = [...new Set(sportsData.map((facility) => facility.city))];
  const timeSlots = [
    "08:00-10:00",
    "10:00-12:00",
    "12:00-14:00",
    "14:00-16:00",
    "16:00-18:00",
    "18:00-20:00",
    "20:00-22:00",
  ];

  useEffect(() => {
    let filtered = sportsData;

    // Қала бойынша сүзу
    if (selectedCity) {
      filtered = filtered.filter((facility) => facility.city === selectedCity);
    }

    // Атауы бойынша сүзу
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((facility) =>
        facility.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFacilities(filtered);
  }, [selectedCity, searchTerm, sportsData]);

  const handleBooking = (e) => {
    e.preventDefault();
    toast.success(
      `Брондау сәтті орындалды!\n\nОбъект: ${
        sportsData.find((f) => f.id === Number.parseInt(selectedFacility))?.name
      }\nКүні: ${selectedDate}\nУақыты: ${selectedTime}\nАты-жөні: ${
        bookingData.name
      }\nТелефон: ${bookingData.phone}`
    );
    setShowBookingForm(false);
    setSelectedCity("");
    setSelectedFacility("");
    setSelectedDate("");
    setSelectedTime("");
    setBookingData({ name: "", phone: "", email: "", participants: 1 });
  };

  const selectedFacilityData = sportsData.find(
    (f) => f.id === Number.parseInt(selectedFacility)
  );

  const indexOfLastFacility = currentPage * facilitiesPerPage;
  const indexOfFirstFacility = indexOfLastFacility - facilitiesPerPage;
  const currentFacilities = filteredFacilities.slice(
    indexOfFirstFacility,
    indexOfLastFacility
  );
  const totalPages = Math.ceil(filteredFacilities.length / facilitiesPerPage);

  const handleBook = async (sportId) => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const userId = decoded?.id;

      await axios.post("http://localhost:3000/users/book-sport", {
        userId,
        sportId,
      });

      toast.success("Сәтті брондалды!");
    } catch (error) {
      console.error("Брондау қатесі:", error);
      toast.error("Қате шықты!");
    }
  };

  return (
    <div className="booking-body">
      <Header />
      <div className="booking-container">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">🏟️ Қазақстанның спорт алаңдары</h1>
            <p className="hero-subtitle">
              Елдің кез келген нүктесінен спорт алаңдарын онлайн брондаңыз
            </p>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-container">
            <div className="filter-header">
              <h2>🔍 Іздеу және сүзгі</h2>
            </div>

            <div className="filter-tabs">
              <button
                className={`filter-tab ${selectedCity === "" ? "active" : ""}`}
                onClick={() => setSelectedCity("")}
              >
                Барлығы
              </button>
              {cities.map((city) => (
                <button
                  key={city}
                  className={`filter-tab ${
                    selectedCity === city ? "active" : ""
                  }`}
                  onClick={() => setSelectedCity(city)}
                >
                  {city}
                </button>
              ))}
            </div>
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Алаң атауы бойынша іздеу..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="quick-filters">
              <button className="quick-filter">⚽ Футбол</button>
              <button className="quick-filter">🏒 Хоккей</button>
              <button className="quick-filter">🏀 Баскетбол</button>
              <button className="quick-filter">🎾 Теннис</button>
            </div>
          </div>
        </div>

        <div className="facilities-grid">
          {showAddForm && (
            <div className="modal-overlay">
              <div className="booking-modal">
                <div className="modal-header">
                  <h2>🏟️ Жаңа спорт алаңын қосу</h2>
                  <button
                    className="close-button"
                    onClick={() => setShowAddForm(false)}
                  >
                    ✕
                  </button>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      const token = localStorage.getItem("token");
                      const decoded = jwt_decode(token);
                      const ownerId = decoded.id;

                      const response = await axios.post(
                        "http://localhost:3000/sportsData/add",
                        {
                          ...newFacility,
                          capacity: parseInt(newFacility.capacity),
                          price: parseInt(newFacility.price),
                          amenities: newFacility.amenities.filter(
                            (a) => a.trim() !== ""
                          ),
                          ownerId,
                        }
                      );

                      toast.success("Алаң сәтті қосылды!");
                      setSportsData([...sportsData, response.data]);
                      setShowAddForm(false);
                      setNewFacility({
                        name: "",
                        city: "",
                        address: "",
                        type: "",
                        capacity: "",
                        workinghours: "",
                        amenities: [],
                        price: "",
                        image: "",
                      });
                    } catch (error) {
                      console.error("Қосу қатесі:", error);
                      toast.error("Қателі корын алды!");
                    }
                  }}
                  className="booking-form"
                >
                  {[
                    { label: "Атауы", key: "name" },
                    { label: "Қала", key: "city" },
                    { label: "Мекен-жай", key: "address" },
                    { label: "Түрі", key: "type" },
                    { label: "Жұмыс уақыты", key: "workinghours" },
                    { label: "Сыйымдылық", key: "capacity", type: "number" },
                    { label: "Бағасы (₸)", key: "price", type: "number" },
                    { label: "Сурет сілтемесі", key: "image" },
                  ].map(({ label, key, type = "text" }) => (
                    <div key={key} className="form-group">
                      <label>{label}</label>
                      <input
                        type={type}
                        value={newFacility[key]}
                        onChange={(e) =>
                          setNewFacility({
                            ...newFacility,
                            [key]: e.target.value,
                          })
                        }
                        required
                        className="form-input"
                      />
                    </div>
                  ))}

                  <div className="form-group">
                    <label>Мүмкіндіктер (үтірмен бөліңіз)</label>
                    <input
                      type="text"
                      value={newFacility.amenities.join(", ")}
                      onChange={(e) =>
                        setNewFacility({
                          ...newFacility,
                          amenities: e.target.value.split(","),
                        })
                      }
                      className="form-input"
                    />
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="cancel-button"
                    >
                      Бас тарту
                    </button>
                    <button type="submit" className="confirm-button">
                      Қосу
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <button
            className="add-facility-btn"
            onClick={() => setShowAddForm(true)}
          >
            ➕ Өз алаңыңызды қосыңыз
          </button>

          {currentFacilities.map((facility) => (
            <div
              key={facility.id}
              className="facility-card"
              onClick={() => setSelectedFacilityDetail(facility)}
            >
              <div className="facility-image">
                <img
                  src={facility.image || "/placeholder.svg"}
                  alt={facility.name}
                />
                <div className="facility-rating">⭐ {facility.rating}</div>
              </div>

              <div className="facility-content">
                <div className="facility-header">
                  <h3 className="facility-name">{facility.name}</h3>
                  <span className="facility-type">{facility.type}</span>
                </div>

                <div className="facility-details">
                  <p className="facility-location">📍 {facility.address}</p>
                  <p className="facility-capacity">
                    👥 {facility.capacity} адам
                  </p>
                  <p className="facility-hours">🕐 {facility.workinghours}</p>
                </div>

                <div className="facility-amenities">
                  {facility.amenities.map((amenity) => (
                    <span key={amenity} className="amenity-tag">
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="facility-footer">
                  <div className="facility-price">
                    <h2>{facility.price.toLocaleString()} ₸</h2>{" "}
                    <span>/сағат</span>
                  </div>
                  <button
                    className="details-button"
                    onClick={() => setSelectedFacilityDetail(facility)}
                  >
                    Толық ақпарат
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ← Алдыңғы
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`pagination-number ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="pagination-btn"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Келесі →
            </button>
          </div>
        )}

        {selectedFacilityDetail && (
          <div className="detail-modal-overlay">
            <div className="detail-modal">
              <div className="detail-header">
                <h2>{selectedFacilityDetail.name}</h2>
                <button
                  className="close-detail"
                  onClick={() => setSelectedFacilityDetail(null)}
                >
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#000000"
                    strokeWidth="0.624"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                        fill="#0F0F0F"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
              </div>

              <div className="detail-content">
                <div className="detail-left">
                  <button
                    onClick={() => handleSave(selectedFacilityDetail.id)}
                    className="bookmarkBtn"
                  >
                    <span className="IconContainer">
                      <svg
                        viewBox="0 0 384 512"
                        height="0.9em"
                        className="icon"
                      >
                        <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                      </svg>
                    </span>
                    <p className="text">Сақтау</p>
                  </button>
                  <div className="detail-image">
                    <img
                      src={selectedFacilityDetail.image || "/placeholder.svg"}
                      alt={selectedFacilityDetail.name}
                    />
                  </div>

                  <div className="detail-info">
                    <h3>📍 Орналасқан жері</h3>
                    <p>{selectedFacilityDetail.address}</p>

                    <h3>🏟️ Алаң туралы</h3>
                    <p>Түрі: {selectedFacilityDetail.type}</p>
                    <p>Сыйымдылығы: {selectedFacilityDetail.capacity} адам</p>
                    <p>Жұмыс уақыты: {selectedFacilityDetail.workinghours}</p>
                    <p>Рейтинг: ⭐ {selectedFacilityDetail.rating}</p>

                    <h3>🎯 Мүмкіндіктер</h3>
                    <div className="detail-amenities">
                      {selectedFacilityDetail.amenities.map((amenity) => (
                        <span key={amenity} className="detail-amenity">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rev-section">
                    <h3 className="rev-title">Пайдаланушы шолулары</h3>
                    {ground.reviews.length > 0 ? (
                      <div className="rev-list">
                        {ground.reviews.map((review) => (
                          <div key={review.id} className="rev-card">
                            <div className="rev-inner">
                              <div className="rev-header">
                                <div className="rev-username">
                                  {review.userName}
                                </div>
                                <div className="rev-stars">
                                  {Array.from({ length: review.rating }).map(
                                    (_, i) => (
                                      <Star
                                        key={i}
                                        className="rev-star-filled"
                                      />
                                    )
                                  )}
                                  {Array.from({
                                    length: 5 - review.rating,
                                  }).map((_, i) => (
                                    <Star key={i} className="rev-star-empty" />
                                  ))}
                                </div>
                              </div>
                              <p className="rev-comment">{review.comment}</p>
                              <p className="rev-date">
                                {new Date(review.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="rev-empty">Бұл алаңға әлі шолулар жоқ.</p>
                    )}

                    <div className="rev-form-wrapper">
                      <h4 className="rev-form-title">Шолу қалдыру</h4>
                      <div className="rev-form">
                        <div>
                          <label
                            htmlFor="review-user-name"
                            className="rev-label"
                          >
                            Аты-жөніңіз
                          </label>
                          <input
                            id="review-user-name"
                            value={reviewUserName}
                            onChange={(e) => setReviewUserName(e.target.value)}
                            className="rev-input"
                            placeholder="Аты-жөніңізді енгізіңіз"
                          />
                        </div>
                        <div>
                          <label className="rev-label">Рейтинг</label>
                          <div className="rev-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => setReviewRating(star)}
                                className={`rev-star-button ${
                                  reviewRating >= star ? "rev-active" : ""
                                }`}
                              >
                                <Star className="rev-star-icon" />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label htmlFor="review-comment" className="rev-label">
                            Комментарий
                          </label>
                          <textarea
                            id="review-comment"
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                            className="rev-textarea"
                            placeholder="Пікіріңізді жазыңыз..."
                          />
                        </div>
                        <button
                          onClick={handleAddReview}
                          className="rev-submit"
                        >
                          Шолуды қосу
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="detail-right">
                  <div className="booking-widget">
                    <h3>🎯 Брондау</h3>

                    <div className="booking-form-group">
                      <label>📅 Күн таңдаңыз</label>
                      <input
                        type="date"
                        value={bookingDetails.date}
                        onChange={(e) =>
                          setBookingDetails({
                            ...bookingDetails,
                            date: e.target.value,
                          })
                        }
                        min={new Date().toISOString().split("T")[0]}
                        className="booking-input"
                      />
                    </div>

                    <div className="booking-form-group">
                      <label>⏰ Уақыт таңдаңыз</label>
                      <div className="time-slots">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            className={`time-slot ${
                              bookingDetails.timeSlot === time ? "selected" : ""
                            }`}
                            onClick={() =>
                              setBookingDetails({
                                ...bookingDetails,
                                timeSlot: time,
                              })
                            }
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="booking-form-group">
                      <label>⏱️ Ойын ұзақтығы (сағат)</label>
                      <div className="duration-selector">
                        {[1, 2, 3, 4].map((hour) => (
                          <button
                            key={hour}
                            className={`duration-btn ${
                              bookingDetails.duration === hour ? "selected" : ""
                            }`}
                            onClick={() =>
                              setBookingDetails({
                                ...bookingDetails,
                                duration: hour,
                              })
                            }
                          >
                            {hour} сағат
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="booking-form-group">
                      <label>👥 Ойыншылар саны</label>
                      <div className="players-selector">
                        <button
                          onClick={() =>
                            setBookingDetails({
                              ...bookingDetails,
                              players: Math.max(1, bookingDetails.players - 1),
                            })
                          }
                          className="player-btn"
                        >
                          -
                        </button>
                        <span className="player-count">
                          {bookingDetails.players}
                        </span>
                        <button
                          onClick={() =>
                            setBookingDetails({
                              ...bookingDetails,
                              players: Math.min(
                                selectedFacilityDetail.capacity,
                                bookingDetails.players + 1
                              ),
                            })
                          }
                          className="player-btn"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="price-calculation">
                      <div className="price-row">
                        <span>Сағаттық баға:</span>
                        <span>
                          {selectedFacilityDetail.price.toLocaleString()} ₸
                        </span>
                      </div>
                      <div className="price-row">
                        <span>Ұзақтығы:</span>
                        <span>{bookingDetails.duration} сағат</span>
                      </div>
                      <div className="price-total">
                        <span>Жалпы сома:</span>
                        <span>
                          {(
                            selectedFacilityDetail.price *
                            bookingDetails.duration
                          ).toLocaleString()}{" "}
                          ₸
                        </span>
                      </div>
                    </div>

                    <button
                      className="book-now-btn"
                      onClick={() => {
                        if (bookingDetails.date && bookingDetails.timeSlot) {
                          setShowBookingForm(true);
                          setSelectedFacility(
                            selectedFacilityDetail.id.toString()
                          );
                          setSelectedDate(bookingDetails.date);
                          setSelectedTime(bookingDetails.timeSlot);
                        } else {
                          toast.info("Күн мен уақытты таңдаңыз");
                        }
                      }}
                      disabled={
                        !bookingDetails.date || !bookingDetails.timeSlot
                      }
                    >
                      💳 Сатып алу
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showBookingForm && selectedFacilityData && (
          <div className="modal-overlay">
            <div className="booking-modal">
              <div className="modal-header">
                <h2>🎯 Брондау растау</h2>
                <button
                  className="close-button"
                  onClick={() => setShowBookingForm(false)}
                >
                  ✕
                </button>
              </div>

              <div className="booking-summary">
                <h3>{selectedFacilityData.name}</h3>
                <p>📍 {selectedFacilityData.address}</p>
                <p>📅 {selectedDate}</p>
                <p>⏰ {selectedTime}</p>
                <p className="total-price">
                  💰 {selectedFacilityData.price.toLocaleString()} ₸
                </p>
              </div>

              <form onSubmit={handleBooking} className="booking-form">
                <div className="form-group">
                  <label>👤 Аты-жөні *</label>
                  <input
                    type="text"
                    value={bookingData.name}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, name: e.target.value })
                    }
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>📱 Телефон *</label>
                  <input
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, phone: e.target.value })
                    }
                    required
                    className="form-input"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>

                <div className="form-group">
                  <label>📧 Email</label>
                  <input
                    type="email"
                    value={bookingData.email}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, email: e.target.value })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>👥 Қатысушылар саны</label>
                  <input
                    type="number"
                    value={bookingData.participants}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        participants: e.target.value,
                      })
                    }
                    min="1"
                    max={selectedFacilityData.capacity}
                    className="form-input"
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setShowBookingForm(false)}
                  >
                    Бас тарту
                  </button>
                  <button
                    type="submit"
                    className="confirm-button"
                    onClick={() => handleBook(selectedFacilityData.id)}
                  >
                    Растау
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <section className="hiw-container">
          <h2 className="hiw-title">Қалай жұмыс істейді?</h2>
          <div className="hiw-steps-wrapper">
            <div className="hiw-step">
              <div className="hiw-step-number">1</div>
              <h3 className="hiw-step-title">Алаңды табыңыз</h3>
              <p className="hiw-step-description">
                Қала, спорт түрі және басқа сүзгілер арқылы қажетті алаңды
                іздеңіз. Біздің кең базамыздан таңдаңыз.
              </p>
            </div>
            <div className="hiw-step">
              <div className="hiw-step-number">2</div>
              <h3 className="hiw-step-title">Брондауды растаңыз</h3>
              <p className="hiw-step-description">
                Қажетті күн мен уақытты таңдап, брондауды растаңыз. Барлық
                мәліметтерді тексеріп, төлем жасаңыз.
              </p>
            </div>
            <div className="hiw-step">
              <div className="hiw-step-number">3</div>
              <h3 className="hiw-step-title">Ойнауға барыңыз!</h3>
              <p className="hiw-step-description">
                Брондалған уақытта алаңға барып, спорттан ләззат алыңыз. Біз
                сізге ең жақсы тәжірибені ұсынамыз.
              </p>
            </div>
          </div>
        </section>

        <img
          onClick={() => {
            toast.info("Өтінім жіберілді, біз сізге хабарласамыз!");
          }}
          className="tournir-sec"
          width={"100%"}
          src={tournir}
          alt=""
        />

        <section className="zhai-section">
          <img src={group1} alt="" />
          <img src={group2} alt="" />
          <img src={group3} alt="" />
        </section>

        <section className="the-end-section">
          <img width={"100%"} src={theEnd} alt="" />
        </section>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Booking;
