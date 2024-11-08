import React from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SignInWrapper from "../../../Shared/SignIn/SignInWrapper";
import Images from "../../../HelperMethods/Constants/ImgConstants";

const SignIn = () => {
  const { t, i18n } = useTranslation("");

  const SingInData = [
    {
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
          <h1 className="fw-bold fs-1 text-white customLetterSpacing">
            {t("login.unlockYourPotentialText")}
          </h1>
          <span className="fs-2 text-white fst-italic">
            {t("login.transformYourBodyText")}
          </span>
        </div>
      ),
      text3: (
        <Link className="text-white" to="/">
          <h6 className="small text-center text-white">www.fitnee.fit</h6>
        </Link>
      ),
    },
  ];
  return (
    <Container fluid className={`${i18n.dir()} vh-100`}>
      {SingInData?.map((item, index) => (
        <SignInWrapper
          CompStyle={item.CompStyle}
          text1={item.text1}
          text2={item.text2}
          text3={item.text3}
          index={index}
          key={index}
        />
      ))}
    </Container>
  );
};

export default SignIn;
