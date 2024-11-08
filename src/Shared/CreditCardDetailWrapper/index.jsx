import { Formik } from "formik";
import "./CreditCardStyle.scss";
import Toaster from "../Toaster";
import InputField from "../InputField";
import FillBtn from "../Buttons/FillBtn";
import ToggleSwitch from "../ToggleSwitch";
import functions from "../../utils/functions";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
// import SubHeading from "../Headings/SubHeading";
import PageHeading from "../Headings/PageHeading";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Container, Row, Form } from "reactstrap";
import { CardBody, CardFooter, CardHeader } from "reactstrap";
import LoadingScreen from "../../HelperMethods/LoadingScreen";
import Images from "../../HelperMethods/Constants/ImgConstants";
import "react-country-state-city/dist/react-country-state-city.css";
import { CURRENCY, WALLET_AMOUNT_URL } from "../../utils/constants";
import React, { memo, useCallback, useState, useEffect } from "react";
import { PAYMENT_METHOD_DETAIL_SCHEMA } from "../ValidationData/validation";
// import {
//   CitySelect,
//   CountrySelect,
//   StateSelect,
// } from "react-country-state-city";
import {
  PREPARE_CHECKOUT_URL,
  USE_PROMO_CODE_URL,
} from "../../utils/constants";
import { PAYMENT_METHOD_DETAIL_INITIAL_VALUES } from "../ValidationData/initialValue";
import {
  getCheckoutId,
  applyPromoCode,
  getWalletAmount,
} from "../../Redux/features/Subscription/subscriptionApi";

const CreditCardDetailWrapper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("");
  const { user } = useSelector((state) => state.user);
  const { loading, subscriptionPlan, checkoutId, entity } = useSelector(
    (state) => state.subscription
  );
  const [summaryData, setSummaryData] = useState({
    discount: 0,
    grandTotal: 0,
    walletAmount: 0,
    vat: functions.calculateVat(subscriptionPlan.price),
  });
  const [walletBalance, setWalletBalance] = useState(0);
  // const [countryData, setCountryData] = useState({
  //   countryId: "",
  //   stateId: "",
  // });

  useEffect(() => {
    const script = document.createElement("script");

    script.innerHTML = `
      var wpwlOptions = {
        locale: "${localStorage.getItem("Website_Language__fitnee").toString()}"
      };
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (checkoutId) {
      // const scriptUrl = `https://eu-prod.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
      const scriptUrl = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;

      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [checkoutId]);

  useEffect(() => {
    const data = {
      apiEndpoint: WALLET_AMOUNT_URL,
    };
    dispatch(getWalletAmount(data)).then((res) => {
      if (res.type === "getWalletAmount/fulfilled") {
        setWalletBalance(res.payload.data.balance);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApplePromoCodeClick = useCallback(
    (promoCode) => {
      const data = {
        apiEndpoint: `${USE_PROMO_CODE_URL}?code=${promoCode}`,
      };
      dispatch(applyPromoCode(data)).then((res) => {
        if (res.type === "applyPromoCode/fulfilled") {
          if (res.payload.data.type === "flat") {
            const updatedGrandPrice = functions.getSummary(
              res.payload.data.value,
              summaryData.walletAmount,
              subscriptionPlan.price,
              summaryData.vat
            );
            if (updatedGrandPrice > 0) {
              setSummaryData({
                ...summaryData,
                discount: res.payload.data.value,
              });
            } else {
              Toaster.error(t("messages.cannotUserPromoCode"));
            }
          } else {
            const totalAmount = functions.getSummary(
              0,
              summaryData.walletAmount,
              subscriptionPlan.price,
              summaryData.vat
            );

            const calculatedDiscount = functions.calculatePercentage(
              totalAmount,
              res.payload.data.value
            );

            const updatedGrandPrice = functions.getSummary(
              calculatedDiscount,
              summaryData.walletAmount,
              subscriptionPlan.price,
              summaryData.vat
            );

            if (updatedGrandPrice > 0) {
              setSummaryData({
                ...summaryData,
                discount: functions.calculatePercentage(
                  totalAmount,
                  res.payload.data.value
                ),
              });
            } else {
              Toaster.error(t("messages.cannotUserPromoCode"));
            }
          }
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, subscriptionPlan, summaryData]
  );

  const handlePayClick = useCallback(
    (values) => {
      const data = {
        apiEndpoint: PREPARE_CHECKOUT_URL,
        requestData: JSON.stringify({
          ...values,
          amount: functions.getSummary(
            summaryData.discount,
            summaryData.walletAmount,
            subscriptionPlan.price,
            summaryData.vat
          ),
          subscription_amount: subscriptionPlan.price,
          vat: summaryData.vat,
          email: user?.email,
          discounted_amount: summaryData?.discount,
          subscription_id: subscriptionPlan.id,
          wallet_amount: calculateWalletAmountUsed(),
        }),
        entity: values.entity,
      };
      dispatch(getCheckoutId(data)).then((res) => {
        if (res.type === "getCheckoutId/fulfilled") {
          if (res.payload.is_hyper_pay) {
            navigate("/trainee/appDownloadLink/true");
          }
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, subscriptionPlan, summaryData, user]
  );

  const calculateWalletAmountUsed = () => {
    if (
      parseFloat(walletBalance) >=
      (
        parseFloat(subscriptionPlan.price) +
        parseFloat(summaryData.vat) -
        parseFloat(summaryData.discount)
      ).toFixed(2)
    ) {
      return (
        parseFloat(subscriptionPlan.price) +
        parseFloat(summaryData.vat) -
        parseFloat(summaryData.discount)
      ).toFixed(2);
    } else {
      return walletBalance;
    }
  };

  return (
    <Container fluid className={`h-100 ${i18n.dir()}`}>
      {loading === "pending" && <LoadingScreen />}
      <Row className="h-100 CardDetails">
        <Col md={12}>
          <PageHeading
            headingText={t("cardDetails.PaymentMethodText")}
            className="mb-0"
            categoryText=""
          />
        </Col>
        <Col md={6}>
          {checkoutId && (
            <div className="text-center mt-4">
              {checkoutId && (
                <form
                  action={process.env.REACT_APP_HYPERPAY_REDIRECT_URL}
                  className="paymentWidgets"
                  data-brands={
                    entity === "VISA" || entity === "STC_PAY"
                      ? "MASTER VISA STC_PAY"
                      : entity === "MADA"
                      ? "MADA"
                      : entity === "APPLE_PAY"
                      ? "APPLEPAY"
                      : ""
                  }
                ></form>
              )}
            </div>
          )}
          {!checkoutId && (
            <Formik
              initialValues={{
                ...PAYMENT_METHOD_DETAIL_INITIAL_VALUES,
                surname: `${user?.first_name} ${user?.last_name}`,
                givenName: `${user?.first_name} ${user?.last_name}`,
              }}
              validationSchema={PAYMENT_METHOD_DETAIL_SCHEMA}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                handlePayClick(values);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Container>
                    <Row className="paymentMethodBtn pb-4">
                      <Col md={4} className="mb-1">
                        <div
                          className={`d-flex align-items-center justify-content-between form-control-lg py-2 customDropdownRadius border bg-white cursorPointer ${
                            values.entity === "VISA" ? "selected" : ""
                          }`}
                          onClick={() => setFieldValue("entity", "VISA")}
                        >
                          <h6 className="mb-0 font14">
                            {t("cardDetails.visaMasterText")}
                          </h6>
                          <img src={Images.VISA_ICON} alt="visa-icon" />
                        </div>
                      </Col>
                      <Col md={4} className="mb-1">
                        <div
                          className={`d-flex align-items-center justify-content-between form-control-lg py-2 customDropdownRadius border w-100 bg-white cursorPointer ${
                            values.entity === "MADA" ? "selected" : ""
                          }`}
                          onClick={() => setFieldValue("entity", "MADA")}
                        >
                          <h6 className="mb-0 font14">
                            {t("cardDetails.madaText")}
                          </h6>
                          <img src={Images.MADA_ICON} alt="mada-icon" />
                        </div>
                      </Col>
                      <Col md={4} className="mb-1">
                        <div
                          className={`d-flex align-items-center justify-content-between form-control-lg py-2 customDropdownRadius border w-100 bg-white cursorPointer ${
                            values.entity === "APPLE_PAY" ? "selected" : ""
                          }`}
                          onClick={() => setFieldValue("entity", "APPLE_PAY")}
                        >
                          <h6 className="mb-0 font14">
                            {t("cardDetails.applePayText")}
                          </h6>
                          <img src={Images.APPLE_PAY_ICON} alt="mada-icon" />
                        </div>
                      </Col>
                      <Col md={4} className="mb-1">
                        <div
                          className={`d-flex align-items-center justify-content-between form-control-lg py-2 customDropdownRadius border w-100 bg-white cursorPointer ${
                            values.entity === "STC_PAY" ? "selected" : ""
                          }`}
                          onClick={() => setFieldValue("entity", "STC_PAY")}
                        >
                          <h6 className="mb-0 font14">
                            {t("cardDetails.stcPayText")}
                          </h6>
                          <img src={Images.STC_PAY_ICON} alt="mada-icon" />
                        </div>
                      </Col>
                      <p className="errorField">
                        {t(errors.entity) && touched.entity && t(errors.entity)}
                      </p>
                    </Row>
                    <Row>
                      {/* <Col md={12}>
                        <SubHeading
                          headingText={t("cardDetails.billingAddressText")}
                          className="mb-0"
                          categoryText=""
                        />
                      </Col>
                      <Col md={6} className="mb-2">
                        <InputField
                          type="text"
                          name="surname"
                          placeholder={t("cardDetails.surnameText")}
                          onChangeHandle={handleChange}
                          onBlurHandle={handleBlur}
                          value={values.surname}
                          icon={
                            <img src={Images.PERSON_ICON} alt="email-icon" />
                          }
                          className={
                            "form-control-lg BorderRadiusInput py-3 px-5"
                          }
                        />
                        <p className="errorField">
                          {t(errors.surname) &&
                            touched.surname &&
                            t(errors.surname)}
                        </p>
                      </Col>
                      <Col md={6} className="mb-2">
                        <InputField
                          type="text"
                          name="givenName"
                          placeholder={t("cardDetails.givenNameText")}
                          onChangeHandle={handleChange}
                          onBlurHandle={handleBlur}
                          value={values.givenName}
                          icon={
                            <img src={Images.PERSON_ICON} alt="email-icon" />
                          }
                          className={
                            "form-control-lg BorderRadiusInput py-3 px-5"
                          }
                        />
                        <p className="errorField">
                          {t(errors.givenName) &&
                            touched.givenName &&
                            t(errors.givenName)}
                        </p>
                      </Col>
                      <Col md={6} className="mb-2">
                        <InputField
                          type="text"
                          name="postcode"
                          placeholder={t("cardDetails.postCodeText")}
                          onChangeHandle={handleChange}
                          onBlurHandle={handleBlur}
                          value={values.postcode}
                          icon={
                            <img src={Images.PERSON_ICON} alt="email-icon" />
                          }
                          className={
                            "form-control-lg BorderRadiusInput py-3 px-5"
                          }
                        />
                        <p className="errorField">
                          {t(errors.postcode) &&
                            touched.postcode &&
                            t(errors.postcode)}
                        </p>
                      </Col>
                      <Col md={6} className="mb-2">
                        <CountrySelect
                          def
                          onChange={(e) => {
                            setCountryData({ ...countryData, countryId: e.id });
                            setFieldValue("country", e.iso2);
                          }}
                          containerClassName={"countryContainerClass"}
                          placeHolder={t("cardDetails.selectCountryText")}
                        />
                        <p className="errorField">
                          {t(errors.country) &&
                            touched.country &&
                            t(errors.country)}
                        </p>
                      </Col>

                      <Col md={6} className="mb-2">
                        <StateSelect
                          countryid={countryData.countryId}
                          onChange={(e) => {
                            setCountryData({ ...countryData, stateId: e.id });
                            setFieldValue("state", e.name);
                          }}
                          containerClassName={"countryContainerClass"}
                          placeHolder={t("cardDetails.selectStateText")}
                        />
                        <p className="errorField">
                          {t(errors.state) && touched.state && t(errors.state)}
                        </p>
                      </Col>
                      <Col md={6} className="mb-2">
                        <CitySelect
                          countryid={countryData.countryId}
                          onChange={(e) => {
                            setFieldValue("city", e.name);
                          }}
                          containerClassName={"countryContainerClass"}
                          stateid={countryData.stateId}
                          placeHolder={t("cardDetails.selectCityText")}
                        />
                        <p className="errorField">
                          {t(errors.city) && touched.city && t(errors.city)}
                        </p>
                      </Col>
                      <Col md={12} className="mb-2">
                        <InputField
                          type="text"
                          name="street1"
                          placeholder={t("cardDetails.addressText")}
                          onChangeHandle={handleChange}
                          onBlurHandle={handleBlur}
                          value={values.street1}
                          icon={
                            <img src={Images.PERSON_ICON} alt="email-icon" />
                          }
                          className={
                            "form-control-lg BorderRadiusInput py-3 px-5"
                          }
                        />
                        <p className="errorField">
                          {t(errors.street1) &&
                            touched.street1 &&
                            t(errors.street1)}
                        </p>
                      </Col> */}
                      <Col md={12}>
                        <div className="CreditCard d-flex justify-content-between align-items-center">
                          <div className=" me-2">
                            <p className="mb-0 fw-bold">
                              {t("cardDetails.useFitNeeWalletText")}
                            </p>
                          </div>
                          <div className="d-flex align-items-center">
                            <ToggleSwitch
                              id="use_wallet"
                              isOn={values.use_wallet}
                              handleToggle={() => {
                                if (
                                  walletBalance !== "0.00" &&
                                  summaryData.discount === 0
                                ) {
                                  setFieldValue(
                                    "use_wallet",
                                    !values.use_wallet
                                  );
                                  if (!values.use_wallet === true) {
                                    const updatedGrandPrice = functions.getSummary(
                                      summaryData.discount,
                                      walletBalance,
                                      subscriptionPlan.price,
                                      summaryData.vat
                                    );

                                    setSummaryData({
                                      ...summaryData,
                                      grandTotal: updatedGrandPrice,
                                      walletAmount: walletBalance,
                                    });
                                  } else {
                                    const updatedGrandPrice = functions.getSummary(
                                      summaryData.discount,
                                      0,
                                      subscriptionPlan.price,
                                      summaryData.vat
                                    );

                                    setSummaryData({
                                      ...summaryData,
                                      grandTotal: updatedGrandPrice,
                                      walletAmount: 0,
                                    });
                                  }
                                }
                              }}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col md={12}>
                        <Row className="d-flex my-4 align-items-center">
                          <Col md={4}>
                            <p className="mb-0 fw-bold">
                              {t("cardDetails.promoCodeText")}
                            </p>
                          </Col>
                          <Col
                            md={8}
                            className="d-flex gap-2 justify-content-end"
                          >
                            <InputField
                              type="text"
                              name="promo_code"
                              placeholder={"Free20"}
                              onChangeHandle={handleChange}
                              onBlurHandle={handleBlur}
                              value={values.promo_code}
                              className={
                                "form-control-lg BorderRadiusInput py-3 px-3 fs-6"
                              }
                            />
                            <FillBtn
                              text={t("cardDetails.applyText")}
                              className="px-4 py-3 customDropdownRadius"
                              handleOnClick={() => {
                                if (values.promo_code !== "") {
                                  handleApplePromoCodeClick(values.promo_code);
                                }
                              }}
                              disabled={values.use_wallet}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <div className="w-100 bg-transparent border-0 customDropdownRadius">
                        <FillBtn
                          type="submit"
                          text={t("cardDetails.payText")}
                          className="w-100 py-3 mb-4"
                        />
                      </div>
                    </Row>
                  </Container>
                </Form>
              )}
            </Formik>
          )}
        </Col>
        <Col md={6}>
          <Card className="BorderRadius my-2">
            <CardHeader className="bg-transparent py-4 fw-bold">
              <h6 className="mb-0 fw-bold">
                {t("cardDetails.paymentSummaryText")}
              </h6>
            </CardHeader>
            <CardBody>
              <div className="d-flex align-items-center justify-content-between">
                <div className="">
                  <h6>{t("cardDetails.priceText")}</h6>
                </div>
                <div style={{ width: "25%" }}>
                  <h6>
                    {CURRENCY} {subscriptionPlan.price}
                  </h6>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div className="">
                  <h6>{t("cardDetails.vatText")}</h6>
                </div>
                <div style={{ width: "25%" }}>
                  <h6>
                    {CURRENCY} {summaryData.vat}
                  </h6>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div className="">
                  <h6>{t("cardDetails.discountText")}</h6>
                </div>
                <div style={{ width: "25%" }}>
                  <h6>
                    {CURRENCY} {summaryData.discount}
                  </h6>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div className="">
                  <h6>{t("cardDetails.fitneeWalletText")}</h6>
                </div>
                <div style={{ width: "25%" }}>
                  <h6>
                    {CURRENCY} {calculateWalletAmountUsed()}
                  </h6>
                </div>
              </div>
            </CardBody>
            <CardFooter className="bg-transparent">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="mb-0 py-3 fw-bold">
                    {t("cardDetails.totalPayText")}
                  </h6>
                </div>
                <div style={{ width: "25%" }}>
                  <h6 className="mb-0">
                    {CURRENCY}{" "}
                    {functions.getSummary(
                      summaryData.discount,
                      summaryData.walletAmount,
                      subscriptionPlan.price,
                      summaryData.vat
                    )}
                  </h6>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(CreditCardDetailWrapper);
