import { useTranslation } from "react-i18next";
import FillBtn from "../../../Shared/Buttons/FillBtn";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card } from "reactstrap";
import { EXERCISE_URL } from "../../../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import OutlineBtn from "../../../Shared/Buttons/OutlineBtn";
import ExerciseSection from "../../../Shared/ExerciseSection";
import PageHeading from "../../../Shared/Headings/PageHeading";
import React, { useCallback, useState, useEffect } from "react";
import LoadingScreen from "../../../HelperMethods/LoadingScreen";
import Images from "../../../HelperMethods/Constants/ImgConstants";
import InformationModal from "../../../Shared/Modal/InformationModal";
import { getExercisesForGuest } from "../../../Redux/features/Exercise/exerciseApi";

const Exercise = (props) => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("");
  const { loading } = useSelector((state) => state.exercise);
  const [
    showSubscriptionInformatoinModal,
    setShowSubscriptionInformatoinModal,
  ] = useState(false);
  const [exercisesData, setExercisesData] = useState(null);

  useEffect(() => {
    fetchGuestExercises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchGuestExercises = () => {
    const data = {
      apiEndpoint: `${EXERCISE_URL}${uuid}`,
    };

    dispatch(getExercisesForGuest(data)).then((res) => {
      if (res.type === "getExercisesForGuest/fulfilled") {
        setExercisesData(res.payload.data);
      }
    });
  };

  const handleSubscriptionInformationModalClose = useCallback(() => {
    setShowSubscriptionInformatoinModal(false);
  }, []);

  const handleNotNowClick = useCallback(() => {
    setShowSubscriptionInformatoinModal(false);
  }, []);

  const handleSignInClick = useCallback(() => {
    setShowSubscriptionInformatoinModal(false);
    navigate("/signIn");
  }, [navigate]);

  const handleSeeMoreClick = useCallback(() => {
    setShowSubscriptionInformatoinModal(true);
  }, []);

  return (
    <Container fluid className="contentCardPadding">
      {loading === "pending" && <LoadingScreen />}
      <Row className={`text-black-custom ${i18n.dir()}`}>
        {exercisesData ? (
          <Col md="12">
            <Card className="BorderRadius contentCard mt-0 px-3">
              <Col md={12}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="w-50">
                    <PageHeading
                      className="fs-1 px-0 py-3"
                      headingText={
                        i18n.dir() === "ltr"
                          ? exercisesData?.title
                          : exercisesData?.title_ar
                      }
                    />
                  </div>
                </div>
              </Col>
              <Col md={12} className="mb-3">
                <ExerciseSection exercisesData={exercisesData} />
              </Col>
              <Col md={12} className="mb-3">
                <div className="text-center w-100">
                  <FillBtn
                    className="py-2"
                    text={t("guest.seeMoreText")}
                    handleOnClick={handleSeeMoreClick}
                  />
                </div>
              </Col>
            </Card>
          </Col>
        ) : (
          <div className="d-flex vh-100 justify-content-center align-items-center">
            {loading !== "pending" && exercisesData?.length <= 0 && (
              <img src={Images.NO_DATA_FOUND_IMG} alt="no-data-found" />
            )}
          </div>
        )}
      </Row>

      <InformationModal
        size={"md"}
        TOneClassName={"mb-4 fs-5 text-center"}
        className={"p-4"}
        isOpen={showSubscriptionInformatoinModal}
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
    </Container>
  );
};

export default Exercise;
