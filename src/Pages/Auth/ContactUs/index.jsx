import React from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Images from "../../../HelperMethods/Constants/ImgConstants";
import ContactUsWrapper from "../../../Shared/ContactUs/ContactUsWrapper";

const ContactUs = () => {
  const { t, i18n } = useTranslation("");

  const ContactUsData = [
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
        <div className="text-center">
          <h1 className="fw-bold text-white customLetterSpacing">
            {t("contactUs.unlockYourPotentialText")}
          </h1>
          <span className="fs-4 text-white fst-italic">
            & {t("contactUs.transformYourBodyText")}
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
    <Container fluid className={`vh-100 ${i18n.dir()}`}>
      {ContactUsData?.map((item, index) => (
        <ContactUsWrapper
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

export default ContactUs;
