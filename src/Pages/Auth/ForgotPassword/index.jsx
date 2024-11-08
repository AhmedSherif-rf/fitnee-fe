import React from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Images from "../../../HelperMethods/Constants/ImgConstants";
import ForgotPasswordWrapper from "../../../Shared/ForgotPassword/ForgotPasswordWrapper";

const ForgotPassword = () => {
  const { i18n, t } = useTranslation("");

  const ForgotPasswordData = {
    CompStyle: { backgroundImage: `url(${Images.LOGIN_BG_IMG})` },
    text1: (
      <div className="text-center">
        <Link to="/">
          <img className="img-fluid m-3" src={Images.SMALL_LOGO_IMG} alt={""} />
        </Link>
      </div>
    ),
    text2: (
      <div className="text-center">
        <h1 className="fw-bold text-white customLetterSpacing">
          {t("contactUs.unlockYourPotentialText")}
        </h1>
        <span className="fs-4 text-white fst-italic">
          & {t("contactUs.transformYourBodyText")}
        </span>
      </div>
    ),
    text3: <h6 className="small text-center text-white">www.fitnee.com</h6>,
  };

  return (
    <Container fluid className={`vh-100 ${i18n.dir()}`}>
      <ForgotPasswordWrapper
        CompStyle={ForgotPasswordData.CompStyle}
        text1={ForgotPasswordData.text1}
        text2={ForgotPasswordData.text2}
        text3={ForgotPasswordData.text3}
      />
    </Container>
  );
};

export default ForgotPassword;
