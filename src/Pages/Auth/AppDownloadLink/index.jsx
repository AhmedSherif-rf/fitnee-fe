import "./DownloadLinkStyle.scss";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MdContentCopy } from "react-icons/md";
import functions from "../../../utils/functions";
import { Col, Container, Row, Card } from "reactstrap";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Images from "../../../HelperMethods/Constants/ImgConstants";

const AppDownloadLink = () => {
  const { t, i18n } = useTranslation("");
  const { requestId } = useParams();
  const [isRequestIdCopied, setIsRequestIdCopied] = useState(false);

  return (
    <Container fluid className={i18n.dir()}>
      <Row className="">
        <Col md="12">
          <Card className="BorderRadius contentCard px-3">
            <Row className="vh-100">
              <Col md="6" className="text-center">
                <div className=" pt-2">
                  <h3 className="py-2 fw-bold">
                    {t("appLink.congratulationsText")}
                  </h3>
                  <p className="px-md-2 mx-md-2">
                    {t("appLink.adminReviewFirstText")}
                  </p>
                  <p className="px-md-2 mx-md-2">
                    {t("appLink.adminReviewSecondText")}
                  </p>
                  <p className="py-2 fw-bold">
                    {t("appLink.ticketIdText")}
                    <div
                      className="text-center fw-bold mb-2 fs-4 cursorPointer"
                      onClick={() => {
                        functions.copyToClipboard(requestId);
                        setIsRequestIdCopied(true);
                        setTimeout(() => {
                          setIsRequestIdCopied(false);
                        }, 1000);
                      }}
                    >
                      {requestId}
                      <span>
                        {isRequestIdCopied ? (
                          <IoMdCheckmarkCircleOutline color="#F6E709" />
                        ) : (
                          <MdContentCopy />
                        )}
                      </span>
                    </div>
                  </p>
                </div>
                <div className="text-center d-flex align-items-center justify-content-center">
                  <img
                    className={`CreditCardImg`}
                    src={Images.CREDIT_CARD_IMG}
                    alt=""
                  />
                </div>
              </Col>
              <Col md="6">
                <div className="d-flex justify-content-center mb-md-4 mb-0">
                  <div className="QRcodeDiv p-5 text-center">
                    <img
                      className="mb-3"
                      style={{ width: "90%" }}
                      src={Images.QR_CODE_IMG}
                      alt=""
                    />
                    <h6 className="text-black-custom fw-bold text-center">
                      {t("appLink.getAppText")}
                    </h6>
                  </div>
                </div>
                <Row className="justify-content-center">
                  <Col md={5} className="mb-3 text-md-block text-center">
                    <div className="w-100">
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
                  <Col md={5} className="mb-3 text-md-block text-center">
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
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AppDownloadLink;
