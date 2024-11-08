import { motion } from "framer-motion";
import styles from "./style.module.scss";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import Images from "../../HelperMethods/Constants/ImgConstants";

const AboutSection = () => {
  const { t, i18n } = useTranslation("");
  const [isTextVisible, setIsTextVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const textSection = document.getElementById("textSection");

      if (textSection && scrollPosition > textSection.offsetTop) {
        setIsTextVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, scale: 0.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  return (
    <Container
      fluid
      className={`overflow-hidden position-relative ${styles.aboutContainer}`}
    >
      <Row className="h-100">
        <Col
          md={6}
          className={`p-0 bgProperties h-100 ${styles.aboutImg}`}
          style={{
            backgroundImage: `url(${Images.ABOUT_US_IMG})`,
          }}
        >
          <div className="d-flex align-items-center justify-content-center h-100 d-md-none d-block">
            <div
              className={`${styles.aboutTextDiv} pt-4 text-center h-50  px-4 mt-5`}
            >
              <span className="mb-5 w-100 d-md-block d-none">
                <span
                  className={`text-white display-5 fw-bold arabicBorderHover`}
                >
                  {t("landing.whatIsText")}
                  <span className="textYellow">
                    {" "}
                    {t("landing.fitneeText")}{" "}
                  </span>
                </span>
              </span>
              <h5 className="mb-5 text-center d-md-none d-block">
                <span
                  className={`fw-bold display-5 arabicBorderHover text-white`}
                >
                  {t("landing.whatIsText")}
                  <span className="textYellow">
                    {" "}
                    {t("landing.fitneeText")}{" "}
                  </span>
                </span>
              </h5>
              <p
                className={`fs-4 lh-1 text-white text-center customSpacing pb-4 ${i18n.dir()}`}
              >
                {t("landing.firstHeroSectionText")}
              </p>
            </div>
          </div>
        </Col>
        <Col md={6} className="p-0 h-100">
          <motion.div
            initial="hidden"
            animate={isTextVisible ? "visible" : "hidden"}
            variants={textVariants}
            className="w-100 h-100"
          >
            <div
              id="textSection"
              className="d-flex align-items-center justify-content-center h-100"
            >
              <div
                className={`${styles.aboutTextDiv} pt-4 text-center h-50  px-4 `}
              >
                <span className="mb-5 w-100 d-md-block d-none">
                  <span
                    className={`text-white display-5 fw-bold arabicBorderHover`}
                  >
                    {t("landing.whatIsText")}
                    <span className="textYellow">
                      {" "}
                      {t("landing.fitneeText")}{" "}
                    </span>
                  </span>
                </span>
                <h5 className="mb-5 text-center d-md-none d-block">
                  <span
                    className={`fw-bold display-5 arabicBorderHover text-white`}
                  >
                    {t("landing.whatIsText")}
                    <span className="textYellow">
                      {" "}
                      {t("landing.fitneeText")}{" "}
                    </span>
                  </span>
                </h5>
                <p
                  className={`fs-4 lh-1 text-white text-center customSpacing pb-4 ${i18n.dir()}`}
                >
                  {t("landing.firstHeroSectionText")}
                </p>
              </div>
            </div>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutSection;
