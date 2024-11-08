import moment from "moment";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "reactstrap";
import Image from "../../HelperMethods/Constants/ImgConstants";

const Footer = () => {
  const { t } = useTranslation("");
  const currentYear = moment().year();

  return (
    <Container fluid>
      <Row className="customBgDark py-3">
        <Col md={4}>
          <div className="d-flex align-items-center justify-content-center mx-3 h-100 py-3">
            <Link to={"/"}>
              <img src={Image.SMALL_LOGO_IMG} alt="logo" />
            </Link>
          </div>
        </Col>
        <Col md={4}>
          <div className="d-flex h-100  align-items-center  justify-content-center p-3">
            <p className="text-white mb-0 small">
              {t("landing.copyrightText")} {currentYear}{" "}
              {t("landing.fitneeText")}
            </p>
          </div>
        </Col>
        <Col md={4} className="lh-1">
          <div className="d-flex gap-3 mx-4 mb-1 align-items-center justify-content-center p-2">
            <Link to="https://www.instagram.com/fitnee.app" target="_blank">
              <img src={Image.INSTA_IMG} alt="logo" />
            </Link>
            <Link to="https://twitter.com/Fitnee_fit" target="_blank">
              <img src={Image.TWITTER_IMG} alt="logo" />
            </Link>
            <Link to="https://wa.me/+966549836605" target="_blank">
              <img src={Image.WHATSAPP_IMG} alt="logo" />
            </Link>
            {/* <Link to="" target="_blank">
              <img src={Image.YOUTUBE_IMG} alt="logo" />
            </Link>
            <Link to="" target="_blank">
              <img src={Image.TIKTOK_IMG} alt="logo" />
            </Link> */}
          </div>
          <div className="d-flex mx-4 align-items-start justify-content-center gap-2">
            <Link to={`termAndCondition/general/home`}>
              <h6 className="text-white mb-0">
                {t("landing.termsAndConditionsText")}
              </h6>
            </Link>
            <Link to={`/privacyPolicy`}>
              <h6 className="text-white mb-0">
                {t("privacyPolicy.privacyPolicyHeadingText")}
              </h6>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(Footer);
