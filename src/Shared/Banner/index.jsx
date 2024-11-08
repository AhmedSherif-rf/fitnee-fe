import { motion } from "framer-motion";
import styles from "./style.module.scss";
import FillBtn from "../Buttons/FillBtn";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CounterUp from "../../Shared/CounterUp/";
import React, { memo, useCallback } from "react";
import { Col, Container, Row } from "reactstrap";

const HomeBanner = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("");
  const { userCount } = useSelector((state) => state.guest);

  const bannerText = [
    { type: "heading1", text: t("landing.embraceAText") },
    {
      type: "heading1",
      text: t("landing.healthierYouText"),
    },
  ];

  const handleGetStartedClick = useCallback(() => {
    navigate("/registerAs");
  }, [navigate]);

  const fadeInVariants = {
    hidden: { x: -100 },
    visible: { x: 0 },
  };

  const spring = {
    type: "spring",
    stiffness: 100,
    duration: 2.5,
  };

  return (
    <Container fluid className={`${styles.bannerImg}`}>
      <Row className="h-100">
        <Col md={6} className="d-flex align-items-center">
          <div style={{ zIndex: "1", marginLeft: "10px", marginRight: "10px" }}>
            {i18n.dir() === "ltr" && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={{ type: "spring", stiffness: 100, duration: 2.5 }}
                className={`mb-3 ms-3 ${styles.bannerTextWrapper}`}
              >
                {bannerText.map((item, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: index / 10,
                    }}
                    className="text-white"
                  >
                    {item.text}
                  </motion.p>
                ))}
              </motion.div>
            )}
            {i18n.dir() === "rtl" && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={{ type: "spring", stiffness: 100, duration: 2.5 }}
                className={`mb-3 ms-3 ${styles.bannerTextWrapper}`}
              >
                {bannerText.map((item, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.25,
                      delay: index / 10,
                    }}
                    className="text-white"
                  >
                    {item.text}
                  </motion.p>
                ))}
              </motion.div>
            )}

            <motion.div
              transition={spring}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1.1 }}
              exit={{ scale: 0.9 }}
              className="mx-3"
            >
              <FillBtn
                className="ms-3 px-4"
                text={t("landing.getStartedText")}
                handleOnClick={handleGetStartedClick}
              />
            </motion.div>
          </div>
        </Col>
        <Col md={6}>
          <div className="h-100 position-relative px-5">
            <div
              className="d-flex align-items-center justify-content-end w-100 position-absolute"
              style={{ bottom: 0, right: 0 }}
            >
              <div className={"p-sm-2 mx-4 text-center lh-2 mb-2"}>
                <CounterUp
                  start={0}
                  end={userCount?.trainerCount}
                  duration={2}
                />
                <p className="text-secondary fw-bold fs-md-5 fs-sm-3">
                  {t("landing.trainersText")}
                </p>
              </div>
              <span className={"fs-1 text-secondary"}>|</span>
              <div className={"p-sm-2 mx-4 text-center lh-2 mb-2"}>
                <CounterUp
                  start={0}
                  end={userCount?.traineeCount}
                  duration={4}
                />
                <p className="text-secondary fw-bold fs-md-5 fs-sm-3">
                  {t("landing.traineesText")}
                </p>
              </div>
              <span className={"fs-1 text-secondary"}>|</span>
              <div className="p-sm-2 mx-2 text-center lh-2 mb-2">
                <CounterUp
                  start={0}
                  end={userCount?.nutritionistCount}
                  duration={5}
                />
                <p className="text-secondary fw-bold fs-md-5 fs-sm-3">
                  {t("landing.nutritionistsText")}
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default memo(HomeBanner);
