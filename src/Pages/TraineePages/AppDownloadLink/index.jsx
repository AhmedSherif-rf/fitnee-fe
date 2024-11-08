import "./DownloadLinkStyle.scss";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RxCrossCircled } from "react-icons/rx";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../../HelperMethods/LoadingScreen";
import Images from "../../../HelperMethods/Constants/ImgConstants";
import {
  CHECK_PAYMENT_STATUS_URL,
  NUTRITIONIST_ROLE,
  TRAINER_ROLE,
} from "../../../utils/constants";
import { checkPaymentStatus } from "../../../Redux/features/Subscription/subscriptionApi";

const AppDownloadLink = () => {
  const dispatch = useDispatch();
  const { hyperPayStatus } = useParams();
  const { t, i18n } = useTranslation("");
  const {
    entity,
    checkoutId,
    loading,
    serviceProvider,
    subscriptionPlan,
  } = useSelector((state) => state.subscription);
  const [isPaymentSucceed, setIsPaymentSucceed] = useState("");

  useEffect(() => {
    if (hyperPayStatus === "false") {
      const data = {
        apiEndpoint: CHECK_PAYMENT_STATUS_URL,
        requestData: JSON.stringify({
          id: checkoutId,
          entity: entity,
        }),
      };
      dispatch(checkPaymentStatus(data)).then((res) => {
        if (res.type === "checkPaymentStatus/fulfilled") {
          setIsPaymentSucceed(true);
        } else if (res.type === "checkPaymentStatus/rejected") {
          setIsPaymentSucceed(false);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fluid className={i18n.dir()}>
      {loading === "pending" && (
        <LoadingScreen text="Checking Payment Status" />
      )}
      <Row>
        <Col md="12">
          <Card className="BorderRadius contentCard px-3">
            {(isPaymentSucceed || hyperPayStatus === "true") && (
              <Row>
                <Col md="6" className="text-center">
                  <div className=" pt-3">
                    <h3 className="py-3 fw-bold">
                      {t("appLink.congratulationsText")}
                    </h3>
                    {subscriptionPlan?.type !== "Exercise" && (
                      <>
                        <p className="px-md-5">
                          {t("appLink.youHaveSubscribedWithText")}{" "}
                          <span className="fw-bold">
                            {serviceProvider?.full_name}
                          </span>
                          {serviceProvider?.role === TRAINER_ROLE &&
                            t("appLink.downloadAppTrainerText")}
                          {serviceProvider?.role === NUTRITIONIST_ROLE &&
                            t("appLink.downloadAppNutritionistText")}
                        </p>
                        <p>{t("appLink.downloadAppSecondText")}</p>
                      </>
                    )}
                    {subscriptionPlan?.type === "Exercise" && (
                      <p className="px-md-5">
                        {t("appLink.exerciseDownloadText")}
                      </p>
                    )}
                  </div>
                  <div className="text-center">
                    <img className="w-75" src={Images.CREDIT_CARD_IMG} alt="" />
                  </div>
                </Col>
                <Col md="6">
                  <div className="d-flex justify-content-center mb-md-4 mb-0">
                    <div className="QRcodeDiv p-5 text-center">
                      <img
                        className="mb-3"
                        style={{ width: "85%" }}
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
            )}
            {isPaymentSucceed === false && (
              <Row className="h-100 justify-content-center align-items-center text-center mx-5">
                <div className="w-50">
                  <RxCrossCircled className="mb-2" color="red" size={70} />
                  <p className="fw-bold">{t("messages.paymentFailedText")}</p>
                </div>
              </Row>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AppDownloadLink;
