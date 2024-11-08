import styles from "./style.module.scss";
import {
  maleBodyFrontMuscles,
  maleBodyBackMuscles,
  femaleBodyFrontMuscles,
  femaleBodyBackMuscles,
} from "./BodyMap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FillBtn from "../../../Shared/Buttons/FillBtn";
import { Container, Row, Col, Card } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import OutlineBtn from "../../../Shared/Buttons/OutlineBtn";
import React, { useState, useCallback, useEffect } from "react";
import { IoFemaleOutline, IoMaleOutline } from "react-icons/io5";
import LoadingScreen from "../../../HelperMethods/LoadingScreen";
import InformationModal from "../../../Shared/Modal/InformationModal";
import { getAllCategoryForGuest } from "../../../Redux/features/Exercise/exerciseApi";
import {
  MALE_BODY,
  FEMALE_BODY,
  EXERCISE_CATEGORIES_URL,
} from "../../../utils/constants";

const Services = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("");
  const { loading } = useSelector((state) => state.exercise);

  const [categoriesData, setCategoriesData] = useState([]);
  const [currentBody, setCurrentBody] = useState(MALE_BODY);
  const [currentActivePart, setCurrentActivePart] = useState("");
  const [
    showSubscriptionInformationModal,
    setShowSubscriptionInformationModal,
  ] = useState(false);
  const activeBodyParts = [
    "maleChest",
    "maleBackArm",
    "femaleAbdominal",
    "femaleBackThigh",
  ];

  useEffect(() => {
    fetchExerciseCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchExerciseCategories = () => {
    const data = {
      apiEndpoint: EXERCISE_CATEGORIES_URL,
    };

    dispatch(getAllCategoryForGuest(data)).then((res) => {
      if (res.type === "getAllCategoryForGuest/fulfilled") {
        setCategoriesData(res.payload.data);
      }
    });
  };

  const handleChangeBodyClick = (body) => {
    if (currentBody !== body) {
      if (currentBody === MALE_BODY) {
        setCurrentBody(FEMALE_BODY);
      } else {
        setCurrentBody(MALE_BODY);
      }
    }
  };

  const handleSubscriptionInformationModalClose = useCallback(() => {
    setShowSubscriptionInformationModal(false);
  }, []);

  const handleNotNowClick = useCallback(() => {
    setShowSubscriptionInformationModal(false);
  }, []);

  const handleSignInClick = useCallback(() => {
    setShowSubscriptionInformationModal(false);
    navigate("/signIn");
  }, [navigate]);

  const handleMouseEnter = (e) => {
    setCurrentActivePart(e.target.id);
  };

  return (
    <Container fluid className={`pt-4 ${styles.servicesWrapper} ${i18n.dir()}`}>
      {loading === "pending" && <LoadingScreen />}
      <Card className="bg-transparent contentCard mt-5 px-3 pt-1">
        <Row>
          <Col md={2} sm={6} xs={6}>
            <div
              className={`${styles.customBodySelect} ${
                currentBody === MALE_BODY ? styles.activeBody : ""
              } mx-md-3 mx-0`}
              onClick={() => handleChangeBodyClick(MALE_BODY)}
            >
              <IoMaleOutline />
              <div className="checkbox-text">{t("guest.maleText")}</div>
            </div>
          </Col>
          <Col md={2} sm={6} xs={6}>
            <div
              className={`${styles.customBodySelect} ${
                currentBody === FEMALE_BODY ? styles.activeBody : ""
              } mx-md-3 mx-0`}
              onClick={() => handleChangeBodyClick(FEMALE_BODY)}
            >
              <IoFemaleOutline />
              <div className="checkbox-text">{t("guest.femaleText")}</div>
            </div>
          </Col>
        </Row>
        <Row
          className={`gap-md-0 gap-lg-0 gap-5 justify-content-center align-items-center ${styles.servicesRow}`}
        >
          {currentBody === MALE_BODY && (
            <>
              <Col md={4} className={`${styles.servicesCol} text-center`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="298"
                  height="592"
                  viewBox="0 0 298 592"
                  fill="none"
                  className={`${styles.humanBody}`}
                >
                  {maleBodyFrontMuscles.map((muscle, index) => {
                    return (
                      <path
                        className={`${
                          muscle.fill === "#EBEBEB"
                            ? activeBodyParts.includes(muscle.id)
                              ? styles.activeBodyMuscle
                              : styles.inActiveBodyMuscle
                            : ""
                        }`}
                        key={index}
                        onClick={() => {
                          if (muscle.id === "maleChest") {
                            var filterCategory = categoriesData
                              .filter((data) => {
                                return data.title
                                  .toLowerCase()
                                  .includes("chest");
                              })
                              .reduce((acc, curr) => {
                                acc = curr;
                                return acc;
                              }, {});
                            if (filterCategory?.uuid) {
                              navigate(
                                `/guest/exercises/${filterCategory.uuid}`
                              );
                            }
                          } else {
                            setShowSubscriptionInformationModal(true);
                          }
                        }}
                        d={muscle.d}
                        onMouseEnter={handleMouseEnter}
                        id={muscle?.id}
                        fill={
                          currentActivePart === muscle?.id
                            ? activeBodyParts.includes(muscle.id)
                              ? "#F5E74C"
                              : "rgb(255, 0, 0)"
                            : muscle.fill
                        }
                      />
                    );
                  })}
                </svg>
              </Col>
              <Col md={4} className={`${styles.servicesCol} text-center`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="298"
                  height="592"
                  viewBox="0 0 298 592"
                  fill="none"
                  className={`${styles.humanBody}`}
                >
                  {maleBodyBackMuscles.map((muscle, index) => {
                    return (
                      <path
                        className={`${
                          muscle.fill === "#EBEBEB"
                            ? activeBodyParts.includes(muscle.id)
                              ? styles.activeBodyMuscle
                              : styles.inActiveBodyMuscle
                            : ""
                        }`}
                        key={index}
                        onClick={() => {
                          if (muscle.id === "maleBackArm") {
                            var filterCategory = categoriesData
                              .filter((data) => {
                                return data.title
                                  .toLowerCase()
                                  .includes("forearm");
                              })
                              .reduce((acc, curr) => {
                                acc = curr;
                                return acc;
                              }, {});
                            if (filterCategory?.uuid) {
                              navigate(
                                `/guest/exercises/${filterCategory.uuid}`
                              );
                            }
                          } else {
                            setShowSubscriptionInformationModal(true);
                          }
                        }}
                        onMouseEnter={handleMouseEnter}
                        id={muscle?.id}
                        d={muscle.d}
                        fill={
                          currentActivePart === muscle?.id
                            ? activeBodyParts.includes(muscle.id)
                              ? "#F5E74C"
                              : "rgb(255, 0, 0)"
                            : muscle.fill
                        }
                      />
                    );
                  })}
                </svg>
              </Col>
            </>
          )}
          {currentBody === FEMALE_BODY && (
            <>
              <Col md={4} className={`${styles.servicesCol} text-center`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="298"
                  height="592"
                  viewBox="0 0 298 592"
                  fill="none"
                  className={`${styles.humanBody}`}
                >
                  {femaleBodyFrontMuscles.map((muscle, index) => {
                    return (
                      <path
                        className={`${
                          muscle.fill === "#EBEBEB"
                            ? activeBodyParts.includes(muscle.id)
                              ? styles.activeBodyMuscle
                              : styles.inActiveBodyMuscle
                            : ""
                        }`}
                        key={index}
                        onClick={() => {
                          if (muscle.id === "femaleAbdominal") {
                            var filterCategory = categoriesData
                              .filter((data) => {
                                return data.title.toLowerCase().includes("abs");
                              })
                              .reduce((acc, curr) => {
                                acc = curr;
                                return acc;
                              }, {});
                            if (filterCategory?.uuid) {
                              navigate(
                                `/guest/exercises/${filterCategory.uuid}`
                              );
                            }
                          } else {
                            setShowSubscriptionInformationModal(true);
                          }
                        }}
                        onMouseEnter={handleMouseEnter}
                        id={muscle?.id}
                        d={muscle.d}
                        fill={
                          currentActivePart === muscle?.id
                            ? activeBodyParts.includes(muscle.id)
                              ? "#F5E74C"
                              : "rgb(255, 0, 0)"
                            : muscle.fill
                        }
                      />
                    );
                  })}
                </svg>
              </Col>
              <Col md={4} className={`${styles.servicesCol} text-center`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="298"
                  height="592"
                  viewBox="0 0 298 592"
                  fill="none"
                  className={`${styles.humanBody}`}
                >
                  {femaleBodyBackMuscles.map((muscle, index) => {
                    return (
                      <path
                        className={`${
                          muscle.fill === "#EBEBEB"
                            ? activeBodyParts.includes(muscle.id)
                              ? styles.activeBodyMuscle
                              : styles.inActiveBodyMuscle
                            : ""
                        }`}
                        key={index}
                        onClick={() => {
                          if (muscle.id === "femaleBackThigh") {
                            var filterCategory = categoriesData
                              .filter((data) => {
                                return data.title
                                  .toLowerCase()
                                  .includes("thigh");
                              })
                              .reduce((acc, curr) => {
                                acc = curr;
                                return acc;
                              }, {});
                            if (filterCategory?.uuid) {
                              navigate(
                                `/guest/exercises/${filterCategory.uuid}`
                              );
                            }
                          } else {
                            setShowSubscriptionInformationModal(true);
                          }
                        }}
                        onMouseEnter={handleMouseEnter}
                        id={muscle?.id}
                        d={muscle.d}
                        fill={
                          currentActivePart === muscle?.id
                            ? activeBodyParts.includes(muscle.id)
                              ? "#F5E74C"
                              : "rgb(255, 0, 0)"
                            : muscle.fill
                        }
                      />
                    );
                  })}
                </svg>
              </Col>
            </>
          )}
        </Row>
        <InformationModal
          size={"md"}
          TOneClassName={"mb-4 fs-5 text-center"}
          className={"p-4"}
          isOpen={showSubscriptionInformationModal}
          onClose={handleSubscriptionInformationModalClose}
          ModalTextOne={t("guest.exerciseSubscriptionModalText")}
          ButtonOne={
            <FillBtn
              text={t("login.signInText")}
              className="py-2 px-5"
              handleOnClick={handleSignInClick}
            />
          }
          ButtonTwo={
            <OutlineBtn
              text={t("guest.notNowText")}
              className="py-2 px-5"
              handleOnClick={handleNotNowClick}
            />
          }
        />
      </Card>
    </Container>
  );
};

export default Services;
