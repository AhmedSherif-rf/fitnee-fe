import styles from "./style.module.scss";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import FillBtn from "../../../Shared/Buttons/FillBtn";
import Images from "../../../HelperMethods/Constants/ImgConstants";

const SelectTool = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation("");

  const handleBMIClick = useCallback(() => {
    navigate("/bmi");
  }, [navigate]);

  const handleBMRClick = useCallback(() => {
    navigate("/bmr");
  }, [navigate]);

  return (
    <Container fluid className={`vh-100 ${styles.selectToolContainer}`}>
      <Row
        className={`justify-content-center vh-100 bgProperties ${styles.selectToolWrapper}`}
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url(${Images.REGISTER_AS_BG})`,
        }}
      >
        <Col md={4} className={`${styles.selectToolContent} px-2`}>
          <h2 className="mb-5 text-center fs-1 text-white fw-bold">
            {t("calculation.toolText")}
          </h2>
          <div className="pt-3">
            <FillBtn
              className="w-100 mb-3 customPaddingY"
              text={t("calculation.bodyMassIndexText")}
              handleOnClick={handleBMIClick}
            />
            <FillBtn
              className="w-100 mb-3 customPaddingY"
              text={t("calculation.basalMetabolicRateText")}
              handleOnClick={handleBMRClick}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SelectTool;
