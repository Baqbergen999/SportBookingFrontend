import React from "react";
import '../../styles/Home.css';
import heroImage from "../../assets/icons.png";
import arrow from "../../assets/arrow.png";
import Uilesim from "../../assets/Uylesyim.png";
import { useState } from "react";
import send from "../../assets/send.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import yellowline1 from "../../assets/yellowline1.png"
import line2 from "../../assets/line2.png"

export default function Body() {
  const sports = [
    {
      title: "Футбол алаңы",
      rating: 8.2,
      image:
        "https://images.unsplash.com/photo-1724178447894-2b8d8d41f4c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cols: 3,
      rows: 1,
    },
    {
      title: "Гольф алаңы",
      rating: 10.0,
      image:
        "https://images.unsplash.com/photo-1583400317946-46e8e2c72205?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cols: 3,
      rows: 1,
    },
    {
      title: "Футбол алқабы",
      rating: 9.5,
      image:
        "https://images.unsplash.com/photo-1747423514926-5e368319effb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cols: 2,
      rows: 1,
    },
    {
      title: "Баскетбол алаңы",
      rating: 7.9,
      image:
        "https://images.unsplash.com/photo-1659869590085-57efda46f48e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cols: 2,
      rows: 1,
    },
    {
      title: "Теннис алаңы",
      rating: 8.7,
      image:
        "https://images.unsplash.com/photo-1611630483685-472d017cbb4f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cols: 2,
      rows: 1,
    },
  ];

  const [index, setIndex] = useState(0);
  const cardWidth = 650; // 600px + 50px gap

  const nextSlide = () => {
    if (index < 2) setIndex(index + 1);
  };

  const prevSlide = () => {
    if (index > 0) setIndex(index - 1);
  };
  return (
    <main>
      <img className="lines line1" src={yellowline1} alt="" />
      <img className="lines line2" src={line2} alt="" />
      <section className="hero">
        <div className="hero-left">
          <h1>
            СПОРТ АЛАҢЫН <br />
            ЖЕҢІЛ ТАҢДА <br />
            ЖӘНЕ АЛ
          </h1>

          <p className="subheading">
            Спорт алаңдарын брондаудың ең оңай жолы біз. Қалаған уақытыңызда,
            қалаған жерде ойнаңыз. Алаңдарды көру үшін және брондау үшін
            батырманы бас!
          </p>

          <div className="hero-buttons">
            <Link to={"/booking"} className="outline">Қазір брондау</Link>
            <Link to={"/booking"} className="filled">
              <img width={"30px"} src={arrow} alt="" />
            </Link>
          </div>

          <p className="hero-desc">
            Сізді спорт брондау әлеміне қош келдіңіз. Жақын жерден алаңдар мен
            спортзалдар табыңыз. Ұнаған орныңызды бірнеше секундта брондаңыз.
            Енді қоңырау шалу мен күтудің қажеті жоқ. Қалаған уақытыңызда,
            қалаған жерде ойнаңыз. Футболдан бастап тенниске дейін — бәрі бар.
            Орныңызды бірден бекітіңіз, достарыңызды шақырыңыз, бірге ойнаңыз.
            Арнайы ұсыныстар мен жеңілдіктерді пайдаланыңыз. Брондауыңызды оңай
            бақылаңыз. Қаз келген құрылғыдан 24/7 қолжетімді. Келесі ойыныңыз —
            бір ғана басуда.
          </p>
        </div>

        <div className="hero-right">
          <img src={heroImage} alt="" />
        </div>
      </section>

      <section className="about-us">
        <div className="text-content">
          <h4>БІЗ ТУРАЛЫ</h4>
          <h1 className="text-content-h1">
            СПОРТ ПЕН <br /> ЖЕҢІЛДІК ҮЙЛЕСІМІ
          </h1>
          <p>
            Біз сізге спорт орындарын брондаудың ақылды да оңай жолын ұсынамыз —
            артық әуре де, күту де жоқ. Жай ғана қарап шығыңыз, таңданыңыз да,
            бірнеше секундта брондаңыз. Расталған орындар, нақты уақыттағы бос
            уақыттар мен бірден растау – спорт брондау ешқашан бұлай жеңіл
            болмаған.
          </p>
          <div className="about-buttons ortaq-btns">
            <Link to={"/aboutus"} className="outline about">Толығырақ</Link>
            <Link to={"/aboutus"} className="filled">
              <img width={"30px"} src={arrow} alt="" />
            </Link>
          </div>
        </div>
        <div className="about-img">
          <img src={Uilesim} alt="field" className="field-img" />
        </div>
      </section>

      <section className="best-ones">
        <h1>
          БІЗДІҢ ҮЗДІК <br /> СПОРТ АЛАҢДАРЫМЫЗ
        </h1>
        <div className="sports-wrapper">
          <div className="sports-grid">
            {sports.map((sport, index) => (
              <div
                key={index}
                className={`card col-span-${sport.cols} row-span-${sport.rows}`}
              >
                <img src={sport.image} alt={sport.title} className="card-img" />
                <div className="card-info">
                  <span className="card-title">{sport.title}</span>
                  <span className="card-rating">{sport.rating} ★</span>
                </div>
              </div>
            ))}
          </div>
          <div className="best-buttons ortaq-btns">
            <Link to={"/booking"} className="outline about">Барлығы</Link>
            <Link to={"/booking"} className="filled">
              <img width={"30px"} src={arrow} alt="" />
            </Link>
          </div>
        </div>
      </section>

      <section className="first-booking">
        <h1>АЛҒАШҚЫ БРОН</h1>
        <p>30% ЖЕҢІЛДІК СЕНІ КҮТУДЕ</p>
        <div className="discount-btn ortaq-btns">
          <Link to={"/booking"} className="outline about">Қазір Брондау</Link>
          <Link to={"/booking"} className="filled">
            <img width={"30px"} src={arrow} alt="" />
          </Link>
        </div>
      </section>

      <section className="informations">
        <div className="data-card">
          <h2>Тез брондау</h2>
          <p>
            Ұзақ қоңырауларды, ретсіз жоспарлауды және ескі жүйелерді ұмытыңыз.
            Біздің платформамызбен алаңды брондау бір минуттан аз уақыт алады.
            Спорт түрін таңдаңыз, орынды белгілеңіз, уақытты таңдаңыз — бар
            болғаны осы. Барлығы жылдамдық үшін оңтайландырылған.
          </p>
        </div>
        <div className="data-card">
          <h2>Таза алаң</h2>
          <p>
            Біздің платформада көрсетілген әрбір орын мұқият тексеріліп,
            сыналып, мақұлданған. Біз тек сенімді мекемелермен жұмыс істейміз,
            сіз үшін ең жақсы ойын жағдайын қамтамасыз ету үшін. Мұнда сіз таза
            алаңдарды, және бос уақыттар туралы таба аласыз.
          </p>
        </div>
        <div className="data-card">
          <h2>Икемді уақыт</h2>
          <p>
            Сіздің кестеңіз — сіздің ережеңіз. Таңғы ерте тұратын жан болсаңыз
            да, кеш ойнағанды ұнатсаңыз да — өмір салтыңызға сай алаңдарды таба
            аласыз. достарыңызбен команда құрыңыз немесе жергілікті ойындарға
            қосылыңыз — бәрі өз еркіңізде.
          </p>
        </div>
      </section>

      <section className="comment-wrapper">
        <div className="carousel-container">
          <div
            className="comment-slider"
            style={{ transform: `translateX(-${index * cardWidth}px)` }}
          >
            <div className="comment-card">
              
              
              <img src="https://i.pravatar.cc/200?u=1" alt="user" />
              
              
              <div className="comment-info">
                <p className="ratings">⭐️⭐️⭐️⭐️⭐️</p>
                <h2>John Doee</h2>
                <h3>Жарияланды: 13:49</h3>
                <p>
                  Барлығына алғыс айтамын, менің спорт алаңымды брондағаныңыз
                  үшін! қызметкерлер өте мейірімді және көмектесуге дайын.
                  Алаңдар әрқашан таза және жақсы күтімде. Менің достарыммен
                  бірге ойнау үшін тамаша орын!
                </p>
              </div>
              
            </div>

            <div className="comment-card">
              <img src="https://i.pravatar.cc/200?u=2" alt="user" />
              
              
              <div className="comment-info">
              <p className="ratings">⭐️⭐️⭐️⭐️⭐️</p>
              
                <h2>Esen Moldir</h2>
                <h3>Жарияланды: 14:45</h3>

                <p>
                  Сайт толығымен қанағаттандырды. Алаңдарды брондау өте оңай
                  және жылдам. Менің ойыным үшін тамаша орын таптым. Алаңдары
                  керемет екен, ал сайтта таңдау болса көп, бірақ кіру аздап
                  қиыншылық туғызады екен, содада рахмет!
                </p>
              </div>
              
            </div>

            <div className="comment-card">
              
              
              <img src="https://i.pravatar.cc/200?u=3" alt="user" />
              
              
              <div className="comment-info">
                <p className="ratings">⭐️⭐️⭐️⭐️⭐️</p>
                <h2>Talgat Gulmira</h2>
                <h3>Жарияланды: 18:58</h3>
                <p>
                  Керемет жоба! Қолдану өте оңай. Рахмет жасағандарыңа!
                  Достарымызбер от души көңіл көтеріп теннис ойнадық! Бір
                  байқағаным мұндағы алаңдар өте ыңғайлы алаңдар екен,
                  спортзалдар да өте тамаша, әрқашан қолданамын! Бәріне рахмет!
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      <div className="arrows">
        <button className="arrow-left" onClick={prevSlide}>
          <img src={arrow} alt="" />
        </button>
        <button className="arrow-right" onClick={nextSlide}>
          <img src={arrow} alt="" />
        </button>
      </div>

      <section className="message">
        <div className="feedback-container">
          <div className="questions">
            <h3>Сұрақтар</h3>
            <button>Біздің қандай ерекшелігіміз бар?</button>
            <button>Қандай кемшіліктерімізді байқадыңыз?</button>
            <button>Бізге не істеуді ұсынасыз?</button>
            <button>Біздің қызметіміз көңіліңізден шықты ма?</button>
          </div>

          <div className="form-area">
            <h3>Жауаптар</h3>
            <input type="email" id="email" placeholder="Email" />

            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star">
                  ★
                </span>
              ))}
            </div>

            <textarea
              rows="5"
              placeholder=""
            ></textarea>

            <button className="send-btn">
              <img src={send} alt="" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
