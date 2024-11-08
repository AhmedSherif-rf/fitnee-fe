import React, { memo } from "react";
import { CardBody } from "reactstrap";
import FillBtn from "../Buttons/FillBtn";
import styles from "./style.module.scss";
import { Card, Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";

const ExerciseSection = (props) => {
  const { exercisesData } = props;
  const { i18n } = useTranslation("");

  return (
    <Row>
      <Col md={12} className="mb-3 text-black-custom">
        <div className="mt-3">
          <Row>
            {exercisesData?.sub_categories?.map((subCategory, index) => {
              return (
                <div className="mb-3" key={index}>
                  <Col md={12}>
                    <FillBtn
                      className="py-1 fs-5"
                      text={
                        i18n.dir() === "ltr"
                          ? ` ${subCategory?.title}`
                          : ` ${subCategory?.title_ar}`
                      }
                      handleOnClick={() => {}}
                    />
                    <div
                      className={`pt-2 pb-1 fw-bold fs-6 ${styles.workoutVideosHeader}`}
                    >
                      {i18n.dir() === "ltr"
                        ? `${subCategory?.exercise[0]?.title}`
                        : `${subCategory?.exercise[0]?.title_ar}`}
                    </div>
                  </Col>
                  <Col md={12} className="mb-2">
                    <div className="d-flex justify-content-center">
                      <div className="video-container">
                        <video
                          playsInline
                          preload="metadata"
                          muted
                          autoPlay
                          loop
                          controls={false}
                          className={`${styles.workoutVideos} w-100`}
                          src={subCategory?.exercise[0]?.exercise_media[0].file}
                        ></video>
                      </div>
                    </div>
                  </Col>
                  <Col md={12} className="mb-2">
                    <Card className="BorderRadius">
                      <CardBody className="p-2 lh-2">
                        {i18n.dir() === "ltr" &&
                          subCategory?.exercise[0]?.exercise_part_text?.map(
                            (desc, index) => {
                              return (
                                <div
                                  className="p-1 d-flex align-items-center"
                                  key={index}
                                >
                                  <div>
                                    <FaAngleDoubleRight
                                      className={`textYellow fs-2 me-2 ${
                                        i18n.dir() === "ltr"
                                          ? styles.descriptionItemLeft
                                          : styles.descriptionItemRight
                                      }`}
                                    />
                                    <span className="px-2">{desc}</span>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        {i18n.dir() === "rtl" &&
                          subCategory?.exercise[0]?.exercise_part_text_ar?.map(
                            (desc, index) => {
                              return (
                                <div
                                  className="p-1 d-flex align-items-center rtl"
                                  key={index}
                                >
                                  <div>
                                    <FaAngleDoubleLeft
                                      className={`textYellow fs-2 me-2 ${
                                        i18n.dir() === "ltr"
                                          ? styles.descriptionItemLeft
                                          : styles.descriptionItemRight
                                      }`}
                                    />
                                    <span className="px-2">{desc}</span>
                                  </div>
                                </div>
                              );
                            }
                          )}
                      </CardBody>
                    </Card>
                  </Col>
                </div>
              );
            })}
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default memo(ExerciseSection);
