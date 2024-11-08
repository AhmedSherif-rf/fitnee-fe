import "./style.scss";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FillBtn from "../../../Shared/Buttons/FillBtn";
import { useDispatch, useSelector } from "react-redux";
import { LineChart } from "../../../Shared/Chart/LineChart";
import PageHeading from "../../../Shared/Headings/PageHeading";
import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Container, Card, CardBody } from "reactstrap";
import LoadingScreen from "../../../HelperMethods/LoadingScreen";
import Images from "../../../HelperMethods/Constants/ImgConstants";
import ProfileProgressBar from "../../../Shared/ProfileProgressBar";
import AddProgressModal from "../../../Shared/Modal/AddProgressModal";
import InformationModal from "../../../Shared/Modal/InformationModal";
import { setShownAppModal } from "../../../Redux/features/User/userSlice";
import ProgressHistoryWrapper from "../../../Shared/ProgressHistoryWrapper";
import ProfileInformationCard from "../../../Shared/ProfileInformationCard";
import {
  USER_PROFILE_URL,
  TRAINEE_PROGRESS_URL,
  USER_NOTIFICATIONS_URL,
} from "../../../utils/constants";
import {
  getUserProfile,
  getUserNotifications,
  getTraineeProgressHistory,
} from "../../../Redux/features/User/userApi";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("");

  const { user, loading, shownAppModal } = useSelector((state) => state.user);

  const [showHistory, setShowHistory] = useState(true);
  const [progressHistoryData, setProgressHistoryData] = useState([]);
  const [showDownloadAppPopup, setShowDownloadAppPopup] = useState(false);
  const [showAddProgressModal, setShowAddProgressModal] = useState(false);
  const [myProgressGrapghData, setMyProgressGrapghData] = useState({
    labels: [],
    datasets: [],
  });

  const myProgressGrapghOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: t("traineeDashboard.traineeProgressGraph"),
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: window.innerWidth > 500,
    redraw: true,
    interaction: {
      intersect: false,
    },
  };

  useEffect(() => {
    if (
      !shownAppModal &&
      (user?.has_exercise_subscription ||
        user?.has_service_provider_subscription)
    ) {
      setShowDownloadAppPopup(true);
      dispatch(setShownAppModal(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchTraineeProgressHistory();
    fetchUserProfile();
    fetchUserNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.dir()]);

  const fetchUserProfile = () => {
    const data = {
      apiEndpoint: USER_PROFILE_URL,
    };

    dispatch(getUserProfile(data));
  };

  const fetchUserNotifications = () => {
    const data = {
      apiEndpoint: USER_NOTIFICATIONS_URL,
    };

    dispatch(getUserNotifications(data));
  };

  const fetchTraineeProgressHistory = () => {
    const data = {
      apiEndpoint: TRAINEE_PROGRESS_URL,
    };

    dispatch(getTraineeProgressHistory(data)).then((res) => {
      if (res.type === "getTraineeProgressHistory/fulfilled") {
        setProgressHistoryData(res.payload.data);
        populateGraphData(res.payload.data);
      }
    });
  };

  const handleDownloadAppModalClose = useCallback(() => {
    setShowDownloadAppPopup(false);
  }, []);

  const populateGraphData = (history) => {
    const labels = history.map(
      (item) =>
        `${moment(item.date_recorded).format("DD")} ${
          i18n.dir() === "ltr" ? item?.month_en : item?.month_ar
        }`
    );
    const weightData = history.map((item) => item.weight);
    const bfmData = history.map((item) => item.body_fat_mass);
    const smmData = history.map((item) => item.skeletal_muscel_mass);
    const protienData = history.map((item) => item.protien);

    setMyProgressGrapghData({
      labels,
      datasets: [
        {
          label: t("traineeDashboard.weightText"),
          borderDash: [5, 5],
          data: weightData,
          borderColor: "#67165A",
          backgroundColor: "rgba(103, 22, 90, 0.40)",
          pointStyle: "circle",
          pointRadius: 5,
          pointHoverRadius: 6,
        },
        {
          label: t("traineeDashboard.smmText"),
          data: smmData,
          borderColor: "#F67109",
          backgroundColor: "rgba(246, 113, 9, 0.40)",
          pointStyle: "circle",
          pointRadius: 5,
          pointHoverRadius: 6,
        },
        {
          label: t("traineeDashboard.bfmText"),
          data: bfmData,
          borderColor: "#F6E709",
          backgroundColor: "rgba(246, 231, 9, 0.40)",
          pointStyle: "circle",
          pointRadius: 5,
          pointHoverRadius: 6,
        },
        {
          label: t("traineeDashboard.proteinText"),
          data: protienData,
          borderColor: "#8EF609",
          backgroundColor: "rgba(142, 246, 9, 0.40)",
          pointStyle: "circle",
          pointRadius: 5,
          pointHoverRadius: 6,
        },
      ],
    });
  };

  const toggleHistory = useCallback(() => {
    setShowHistory(!showHistory);
  }, [showHistory]);

  const handleExerciseSubscriptionClick = useCallback(() => {
    navigate("/trainee/exerciseSubscription");
  }, [navigate]);

  const handleCurrentTrainerClick = useCallback(() => {
    navigate("/trainee/trainerList");
  }, [navigate]);

  const handleCurrentNutritionistClick = useCallback(() => {
    navigate("/trainee/nutritionistList");
  }, [navigate]);

  const handleAddProgressClick = useCallback(() => {
    setShowAddProgressModal(true);
  }, []);

  return (
    <Container fluid>
      {loading === "pending" && <LoadingScreen />}
      <Row className={`${i18n.dir()}`}>
        <Card className="px-3 contentCard bg-transparent">
          <Row>
            <Col lg={3} md={4} className="mb-2">
              <div className="mb-2">
                <ProfileInformationCard providerProfile={user} />
              </div>
              <Row className="my-3">
                <Col md={12}>
                  <FillBtn
                    className="w-100 mb-2 py-2"
                    text={t("traineeDashboard.myCurrentTrainerText")}
                    handleOnClick={handleCurrentTrainerClick}
                  />
                  <FillBtn
                    className="w-100 mb-2 py-2"
                    text={t("traineeDashboard.myCurrentNutritionistText")}
                    handleOnClick={handleCurrentNutritionistClick}
                  />
                  <FillBtn
                    className="w-100 mb-2 py-2"
                    text={t("traineeDashboard.subscribeForExerciseText")}
                    handleOnClick={handleExerciseSubscriptionClick}
                    disabled={
                      user?.has_service_provider_subscription ||
                      user?.has_exercise_subscription
                        ? true
                        : false
                    }
                  />
                </Col>
              </Row>
            </Col>
            <Col lg={9} md={8}>
              <Card className="BorderRadius border-0">
                <CardBody>
                  <Row>
                    <Col md={12}>
                      <div className="d-flex align-items-center justify-content-between">
                        <PageHeading
                          headingText={t("traineeDashboard.myProgressText")}
                          categoryText=""
                        />
                        <div className="">
                          <FillBtn
                            text={t("traineeDashboard.addProgressText")}
                            handleOnClick={handleAddProgressClick}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} className="mb-2">
                      <div className="p-2 ltr">
                        <ProfileProgressBar
                          value={user?.get_trainee_progress}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} className="mb-2">
                      {showHistory ? (
                        <>
                          <div className="py-2 d-flex justify-content-center chart-container">
                            <LineChart
                              options={myProgressGrapghOptions}
                              data={myProgressGrapghData}
                            />
                          </div>
                          <div className="text-center my-4">
                            <FillBtn
                              text={t("traineeDashboard.viewHistoryText")}
                              className="customLetterSpacing"
                              handleOnClick={toggleHistory}
                            />
                          </div>
                        </>
                      ) : (
                        <div className="">
                          <Row
                            className="overflowScroll p-3"
                            style={{ maxHeight: "65vh", overflowY: "auto" }}
                          >
                            {progressHistoryData.map((item, index) => {
                              return (
                                <Col
                                  md={3}
                                  className={`mb-2 ${i18n.dir()}`}
                                  key={index}
                                >
                                  <ProgressHistoryWrapper data={item} />
                                </Col>
                              );
                            })}
                          </Row>
                          <div className="text-center pt-3">
                            <FillBtn
                              text={t("traineeDashboard.viewGraphText")}
                              className="customLetterSpacing"
                              handleOnClick={toggleHistory}
                            />
                          </div>
                        </div>
                      )}

                      <AddProgressModal
                        heading={t("traineeDashboard.addYourProgressText")}
                        size={"md"}
                        isOpen={showAddProgressModal}
                        onClose={useCallback(() => {
                          setShowAddProgressModal(false);
                        }, [])}
                        handleRefetchHistory={useCallback(() => {
                          fetchTraineeProgressHistory();
                          setShowAddProgressModal(false);
                          // eslint-disable-next-line react-hooks/exhaustive-deps
                        }, [])}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Card>
        <InformationModal
          size={"md"}
          TOneClassName={"s"}
          isOpen={showDownloadAppPopup}
          onClose={handleDownloadAppModalClose}
          ModalTextOne={
            <div className="w-100 text-center mt-1 mb-4">
              <img src={Images.QR_CODE_IMG} alt="qrAppImage" />
            </div>
          }
          ModalTextTwo={
            <Row className=" justify-content-center align-content-center h-100 m-0">
              <Col md={6} className="text-center">
                <div className="w-100 mb-2">
                  <a
                    href="https://apps.apple.com/us/app/fitnee/id6473802571"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={Images.APP_STORE_IMG}
                      className="img-fluid "
                      alt=""
                    />
                  </a>
                </div>
              </Col>
              <Col md={6} className="text-center mb-3">
                <div className="w-100">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.fitneeapplication"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={Images.GOOGLE_PLAY_IMG}
                      className="img-fluid"
                      alt=""
                    />
                  </a>
                </div>
              </Col>
              <div className="text-center w-100 mb-2">
                <p>
                  {user?.has_service_provider_subscription
                    ? t("traineeDashboard.DownloadAppTraineeText")
                    : t("traineeDashboard.DownloadAppTraineeExerciseText")}
                </p>
              </div>
            </Row>
          }
          ButtonThree={
            <FillBtn
              className="w-100"
              text={t("otpVerification.okayText")}
              handleOnClick={handleDownloadAppModalClose}
            />
          }
        />
      </Row>
    </Container>
  );
};

export default Dashboard;
