import React from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Images from "../../../HelperMethods/Constants/ImgConstants";
import NewPasswordWrapper from "../../../Shared/NewPassword/NewPasswordWrapper";

const ChangePassword = () => {
  const { t, i18n } = useTranslation("");

  const ChangePasswordData = {
    CompStyle: { backgroundImage: `url(${Images.LOGIN_BG_IMG})` },
    text1: (
      <div className="text-center">
        <Link to="/">
          <img
            className="img-fluid  m-3"
            src={Images.SMALL_LOGO_IMG}
            alt={""}
          />
        </Link>
      </div>
    ),
    text2: (
      <div className="text-center lh-1">
        <h1 className="fw-bold fs-1 text-white">
          {t("changePassword.unlockYourPotentialText")}
        </h1>
        <span className="fs-2 text-white fst-italic">
          {t("changePassword.transformYourBodyText")}
        </span>
      </div>
    ),
    text3: (
      <Link className="text-white" to="/">
        <h6 className="small text-center text-white">www.fitnee.fit</h6>
      </Link>
    ),
  };

  return (
    <Container fluid className={`vh-100 ${i18n.dir()}`}>
      <NewPasswordWrapper
        CompStyle={ChangePasswordData.CompStyle}
        text1={ChangePasswordData.text1}
        text2={ChangePasswordData.text2}
        text3={ChangePasswordData.text3}
      />
    </Container>
  );
};

export default ChangePassword;
