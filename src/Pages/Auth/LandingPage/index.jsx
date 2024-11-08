import { Container } from "reactstrap";
import Hero from "../../../Shared/Hero";
import styles from "./style.module.scss";
import Footer from "../../../Shared/Footer";
import Feature from "../../../Shared/Feature";
import { useTranslation } from "react-i18next";
import HomeBanner from "../../../Shared/Banner";
import CardSwiper from "../../../Shared/CardSwiper";
import { GET_STATS } from "../../../utils/constants";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AboutSection from "../../../Shared/AboutSection";
import { getStats } from "../../../Redux/features/Guest/guestApi";
import Images from "../../../HelperMethods/Constants/ImgConstants";

const LandingPage = (props) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("");
  const { feedbacks } = useSelector((state) => state.guest);

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStats = () => {
    const data = {
      apiEndpoint: GET_STATS,
    };

    dispatch(getStats(data));
  };

  const FeaturesTextData = useCallback(() => {
    return [
      {
        heading: t("landing.firstFeaturesHeadingText"),
        text: t("landing.firstFeaturesText"),
      },
      {
        heading: t("landing.secondFeaturesHeadingText"),
        text: t("landing.secondFeaturesText"),
      },
      {
        heading: t("landing.thirdFeaturesHeadingText"),
        text: t("landing.thirdFeaturesText"),
      },
      {
        heading: t("landing.fourthFeaturesHeadingText"),
        text: t("landing.fourthFeaturesText"),
      },
    ];
  }, [t]);

  const FeaturesImageData = useCallback(() => {
    return [
      {
        image: Images.FEATURE_ONE,
      },
      {
        image: Images.FEATURE_TWO,
      },
      {
        image: Images.FEATURE_THREE,
      },
      {
        image: Images.FEATURE_FOUR,
      },
    ];
  }, []);

  const HeroData = [
    {
      heading: (
        <span className="fw-bold text-white display-5 arabicBorderHover">
          {t("landing.ourText")}
          <span className="textYellow"> {t("landing.goalText")}</span>
        </span>
      ),
      text: (
        <div className="customSpacing text-center pb-4">
          <p className={"fs-4 lh-2 text-white"}>
            {t("landing.secondHeroSectionTextOne")}
          </p>

          <p className={"fs-4 lh-2 text-white"}>
            {t("landing.secondHeroSectionTextTwo")}
          </p>
        </div>
      ),
      type: "textLeft",
      textBackgroundImage: true,
      image: (
        <img
          className={`img-fluid w-100 ${styles.heroImg}`}
          src={Images.GOAL_IMG}
          alt="hero3"
        />
      ),
    },
    {
      heading: (
        <span className="fw-bold text-white display-5 arabicBorderHover">
          {t("landing.ourText")}
          <span className="textYellow"> {t("landing.visionText")} </span>
        </span>
      ),
      text: (
        <p className="text-white fs-4 lh-2 text-center customSpacing pb-4">
          {t("landing.thirdHeroSectionTextOne")}
        </p>
      ),
      type: "textRight",
      textBackgroundImage: true,
      image: (
        <img
          className={`img-fluid w-100 ${styles.heroImg}`}
          src={Images.VISION_IMG}
          alt="hero4"
        />
      ),
    },
  ];

  return (
    <div className="bg-black">
      <section id="bannerSection" style={{ direction: i18n.dir() }}>
        <HomeBanner />
      </section>

      <section>
        <AboutSection />
      </section>

      <section id="featureSection" className="100-vh">
        <Feature
          textData={FeaturesTextData()}
          imageData={FeaturesImageData()}
          type={"textRight"}
        />
      </section>

      <section id="heroSection" style={{ direction: i18n.dir() }}>
        <Container fluid>
          {HeroData?.map((item, index) => (
            <Hero
              key={item.heading + "_" + index}
              heading={item.heading}
              text={item.text}
              image={item.image}
              type={item.type}
              textBackgroundImage={item.textBackgroundImage}
            />
          ))}
        </Container>
      </section>

      {feedbacks && feedbacks.length > 0 && (
        <>
          <br />
          <section id="swiperSection">
            <CardSwiper data={feedbacks} heading={t("landing.feedbackText")} />
          </section>
        </>
      )}

      <Footer />
    </div>
  );
};

export default LandingPage;
