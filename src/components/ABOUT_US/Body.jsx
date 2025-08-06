import "../../styles/About.css";
import Header from "./Header";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import arrow from "../../assets/arrow.png";
import element from "../../assets/element.png";
import list from "../../assets/about-listt.png";
import Footer from "@/components/HOME/Footer";
import { Link } from "react-router-dom";

export default function Component() {
  return (
    <div className="about-container">
      <Header></Header>
      <div className="xenoContainer">
        <section className="crystalHeader">
          <div className="quantumFlex">
            <h1 className="metaTitle">БІЗ ТУРАЛЫ</h1>
            <p className="etherealSub">МАҚСАТ • БІЗ ТУРАЛЫ</p>
          </div>

          <div className="prismOverlay"></div>
          <div className="prismOverlay"></div>
        </section>

        <section className="holoMatrix">
          <div className="maxWidth7xl">
            <div className="gridTwo relative">
              <div className="cosmicText">
                <h2 className="transHeading">БІЗ КІМБІЗ?</h2>
                <div className="multiPara">
                  <p>
                    Біз - инновациялық технологиялар мен креативті шешімдерді
                    ұсынатын команда. Біздің мақсатымыз - клиенттеріміздің
                    бизнесін дамытуға көмектесу және олардың армандарын шындыққа
                    айналдыру. Біздің тәжірибелі мамандар тобы әртүрлі салаларда
                    жұмыс істейді: веб-дамыту, дизайн, маркетинг және
                    бизнес-консалтинг. Біз әрбір жобаға жеке көзқарас
                    қолданамыз.
                  </p>
                </div>

                <div className="about-buttons ortaq-btns">
                  <Link to={"/booking"} className="outline about">Қазір брондау</Link>
                  <Link to={"/booking"} className="filled">
                    <img width={"30px"} src={arrow} alt="" />
                  </Link>
                </div>
              </div>

              <img width={"100%"} src={img1} alt="" />
            </div>
          </div>

          <div className="quantumBg"></div>
        </section>

        <section className="nebularExpanse">
          <div className="maxWidth7xl">
            <div className="gridTwo">
              <img src={img2} alt="" />

              <div className="galacticMission">
                <h2 className="cosmicHeading">МИССИЯМЫЗ</h2>
                <div className="interText">
                  <p>
                    Біз клиенттеріміздің бизнесін цифрлық дәуірге бейімдеуге
                    көмектесеміз. Біздің миссиямыз - инновациялық технологиялар
                    арқылы компаниялардың өсуіне ықпал ету және олардың бәсекеге
                    қабілеттілігін арттыру. Біз сапалы қызмет көрсету, уақытылы
                    жеткізу және ұзақ мерзімді серіктестік құру принциптерін
                    ұстанамыз. Әрбір жоба біз үшін жаңа мүмкіндік пен шабыт
                    көзі.
                  </p>
                </div>

                <div className="about-buttons ortaq-btns">
                  <Link to={"/booking"} className="outline about">Қазір брондау</Link>
                  <Link to={"/booking"} className="filled">
                    <img width={"30px"} src={arrow} alt="" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="nebularDiag"></div>
        </section>

        <section className="omniRealm">
          <div className="maxWidth7xl">
            <div className="gridTwo">
              <div className="supremeMatrix">
                <h2 className="ultimateHeading">НЕГЕ БІЗ?</h2>
                <div className="philoCluster">
                  <p>
                    Біздің артықшылығымыз - тәжірибе мен жаңашылдықтың үйлесімі.
                    Біз нарықтағы соңғы трендтерді қадағалап, клиенттеріміздің
                    қажеттіліктеріне сәйкес шешімдер ұсынамыз. Біздің командада
                    жоғары білікті мамандар жұмыс істейді, олар әрбір жобаға
                    шығармашылық көзқараспен қарайды. Біз тек сапалы нәтиже
                    беруге бағытталғанбыз.
                  </p>
                </div>

                <div className="about-buttons ortaq-btns">
                  <Link to={"/booking"} className="outline about">Қазір брондау</Link>
                  <Link to={"/booking"} className="filled">
                    <img width={"30px"} src={arrow} alt="" />
                  </Link>
                </div>
              </div>
              <img src={img3} alt="" />
            </div>
          </div>
        </section>

        <section className="element-section">
          <img src={element} alt="" />
        </section>

        <section className="about-list-section">
          <img className="about-list" src={list} alt="" />
        </section>
      </div>
      <Footer />
    </div>
  );
}
