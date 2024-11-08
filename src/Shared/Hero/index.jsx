import React, { memo } from "react";
import { Col, Row } from "reactstrap";
import { motion } from "framer-motion";
import styles from "./style.module.scss";
import { useInView } from "react-intersection-observer";

const Hero = (props) => {
  const { heading, text, image, type, textBackgroundImage } = props;

  const [textRef, textInView] = useInView({
    triggerOnce: true,
  });

  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
  });

  const textVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "anticipate" },
    },
  };

  const animationVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
  };
  const animationVariantsRightToLeft = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
  };

  return (
    <Row
      className={`${styles.heroSectionWrapper} ${
        type === "textRight" ? "flex-row-reverse" : ""
      }`}
    >
      <Col
        xs={12}
        md={6}
        className={`p-0 d-flex align-items-center ${styles.heroSectionLeftContent}`}
      >
        {type === "textRight" ? (
          <div className="h-100 w-100">
            <div
              className={`${
                textBackgroundImage ? styles.heroTextBackground : ""
              } w-100 px-md-4 px-2 pt-4 d-flex align-items-center`}
            >
              <motion.div
                initial="hidden"
                ref={textRef}
                animate={textInView ? "visible" : "hidden"}
                variants={textVariants}
                className="w-100"
              >
                <div
                  className={`mb-md-5 mb-2 pb-4 ${styles.heroHeading} hoverWrapper text-center`}
                >
                  {heading}
                </div>
                <div className="text-center  px-md-3 px-0 fs-4">{text}</div>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="h-100 w-100">
            <div
              className={`${
                textBackgroundImage ? styles.heroTextBackground : ""
              } w-100 px-4 pt-4 d-flex align-items-center`}
            >
              <motion.div
                initial="hidden"
                ref={textRef}
                animate={textInView ? "visible" : "hidden"}
                variants={textVariants}
                className="w-100"
              >
                <div
                  className={`mb-md-5 mb-2 pb-4 ${styles.heroHeading} hoverWrapper text-center`}
                >
                  {heading}
                </div>
                <div className="text-center mx-md-5 mx-0 px-3 fs-4">{text}</div>
              </motion.div>
            </div>
          </div>
        )}
      </Col>
      <Col
        xs={12}
        md={6}
        className={`overflow-hidden p-0 ${styles.heroSectionRightContent}`}
      >
        {type === "textRight" ? (
          <motion.div
            ref={imageRef}
            initial="hidden"
            animate={imageInView ? "visible" : "hidden"}
            variants={animationVariants}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {image}
          </motion.div>
        ) : (
          <motion.div
            ref={imageRef}
            initial="hidden"
            animate={imageInView ? "visible" : "hidden"}
            variants={animationVariantsRightToLeft}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {image}
          </motion.div>
        )}
      </Col>
    </Row>
  );
};

export default memo(Hero);
