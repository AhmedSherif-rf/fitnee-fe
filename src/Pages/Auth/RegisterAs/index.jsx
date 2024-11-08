import styles from "./style.module.scss";
import { useDispatch } from "react-redux";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import FillBtn from "../../../Shared/Buttons/FillBtn";
import { setGuest } from "../../../Redux/features/User/userSlice";
import Images from "../../../HelperMethods/Constants/ImgConstants";

const RegisterAs = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("");

  const handleAsTraineeClick = useCallback(() => {
    dispatch(setGuest(false));
    navigate("/signUp/trainee");
  }, [dispatch, navigate]);

  const handleAsTrainerClick = useCallback(() => {
    navigate("/signUp/trainer");
  }, [navigate]);

  const handleAsNutritionistClick = useCallback(() => {
    navigate("/signUp/nutritionist");
  }, [navigate]);

  return (
    <Container fluid className={`vh-100 ${styles.registerAsContainer}`}>
      <Row
        className={`justify-content-center vh-100 bgProperties ${styles.registerAsWrapper}`}
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url(${Images.REGISTER_AS_BG})`,
        }}
      >
        <Col md={4} className={`${styles.registerAsContent} px-2`}>
          <h2 className="mb-5 text-center fs-1 text-white fw-bold">
            {t("registerAs.registerAsText")}
          </h2>
          <div className="pt-3">
            <FillBtn
              className="w-100 mb-3 customPaddingY"
              text={t("registerAs.traineeText")}
              handleOnClick={handleAsTraineeClick}
            />
            <FillBtn
              className="w-100 mb-3 customPaddingY"
              text={t("registerAs.trainerText")}
              handleOnClick={handleAsTrainerClick}
            />
            <FillBtn
              className="w-100 customPaddingY"
              text={t("registerAs.nutritionistText")}
              handleOnClick={handleAsNutritionistClick}
            />
            <div>
              <Link to={"/signIn"} className="text-white">
                {t("registerAs.alreadyAccountText")}
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterAs;
