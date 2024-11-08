import { Formik } from "formik";
import Toaster from "../Toaster";
import Checkbox from "../Checkbox";
import InputField from "../InputField";
import FillBtn from "../Buttons/FillBtn";
import { useTranslation } from "react-i18next";
import OutlineBtn from "../Buttons/OutlineBtn";
import { useDispatch, useSelector } from "react-redux";
import InformationModal from "../Modal/InformationModal";
import { login } from "../../Redux/features/User/userApi";
import React, { memo, useCallback, useState } from "react";
import { SIGNIN_SCHEMA } from "../ValidationData/validation";
import LoadingScreen from "../../HelperMethods/LoadingScreen";
import Images from "../../HelperMethods/Constants/ImgConstants";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setPhoneNumber } from "../../Redux/features/User/userSlice";
import { SIGNIN_INITIAL_VALUES } from "../ValidationData/initialValue";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Row,
} from "reactstrap";
import {
  LOGIN_URL,
  ADMIN_EMAIL,
  FORBIDDEN_CODE,
  ADMIN_INITIAL_URL,
  PRECONDITION_REQUIRED_CODE,
  UNAVAILABLE_FOR_LEGAL_REASONS_CODE,
} from "../../utils/constants";

const SignInForm = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation("");
  const { loading, fcmToken } = useSelector((state) => state.user);

  const [showAccountRequestModal, setShowAccountRequestModal] = useState(false);
  const [
    accountRequestModalErrorText,
    setAccountRequestModalErrorText,
  ] = useState("");

  const handleAccountRequestModalClose = useCallback(() => {
    setShowAccountRequestModal(false);
  }, []);

  const handleLoginSubmit = (values) => {
    const data = {
      apiEndpoint: LOGIN_URL,
      requestData: JSON.stringify({ ...values, fcm_web: fcmToken }),
    };
    dispatch(login(data)).then((res) => {
      if (res.type === "login/fulfilled") {
        if (res.payload.data.email === ADMIN_EMAIL) {
          navigate(ADMIN_INITIAL_URL);
        } else {
          import("../../../src/utils/constants").then((item) => {
            switch (res?.payload?.data?.role) {
              case item.TRAINEE_ROLE:
                navigate(item.TRAINEE_INITIAL_URL);
                break;
              case item.TRAINER_ROLE:
                navigate(item.SERVICE_PROVIDER_INITIAL_URL);
                break;
              case item.NUTRITIONIST_ROLE:
                navigate(item.SERVICE_PROVIDER_INITIAL_URL);
                break;
              case item.TRAINER_NUTRITIONIST_ROLE:
                navigate(item.SERVICE_PROVIDER_INITIAL_URL);
                break;
              default:
            }
          });
        }
        Toaster.success(t("messages.loggedInText"));
      } else if (res.type === "login/rejected") {
        if (res?.payload?.statusCode === FORBIDDEN_CODE) {
          dispatch(setPhoneNumber(res?.payload?.phone_number));
          navigate("/verifyOtp/signUp");
        } else if (res?.payload?.statusCode === PRECONDITION_REQUIRED_CODE) {
          setAccountRequestModalErrorText(t("login.requestUnderProcessText"));
          setShowAccountRequestModal(true);
        } else if (
          res?.payload?.statusCode === UNAVAILABLE_FOR_LEGAL_REASONS_CODE
        ) {
          setAccountRequestModalErrorText(t("login.accountRejectText"));
          setShowAccountRequestModal(true);
        }
      }
    });
  };

  const handleCancelClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <Container>
      <Row
        className="justify-content-center text-black-custom align-items-md-center align-items-end vh-100"
        style={{ overflow: "hidden" }}
      >
        {loading === "pending" && <LoadingScreen />}
        <Col lg={9} md={12} sm={10}>
          <Formik
            initialValues={{ ...SIGNIN_INITIAL_VALUES }}
            validationSchema={SIGNIN_SCHEMA}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              handleLoginSubmit(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Card className="py-5 px-4 border-0 bg-white onlyBorderRadius mb-2">
                  <CardHeader className="border-0 bg-transparent mb-2">
                    <h1 className="text-center fs-1 fw-bold ">
                      {t("login.loginText")}
                    </h1>
                  </CardHeader>
                  <CardBody className="customPadding">
                    <InputField
                      type="email"
                      name="email"
                      placeholder={t("login.emailText")}
                      onChangeHandle={handleChange}
                      onBlurHandle={handleBlur}
                      value={values.email}
                      icon={<img src={Images.EMAIL_ICON} alt="email-icon" />}
                      className={"form-control-lg BorderRadiusInput py-3 px-5"}
                    />
                    <p className="errorField">
                      {t(errors.email) && touched.email && t(errors.email)}
                    </p>
                    <InputField
                      type="password"
                      name="password"
                      placeholder={t("login.passwordText")}
                      onChangeHandle={handleChange}
                      onBlurHandle={handleBlur}
                      value={values.password}
                      icon={
                        <img
                          src={Images.PASSWORD_ICON_IMG}
                          alt="password-icon"
                        />
                      }
                      className={
                        "form-control-lg BorderRadiusInput py-3 px-5 my-2"
                      }
                    />
                    <p className="errorField">
                      {t(errors.password) &&
                        touched.password &&
                        t(errors.password)}
                    </p>

                    <Link to="/forgotPassword">
                      <p className="text-end textYellow">
                        {t("login.forgotPasswordText")}
                      </p>
                    </Link>
                    <div className="d-flex mb-1">
                      <Checkbox
                        label={
                          <p className="mb-0 fs-6 px-2">
                            {t("login.agreeOnFitneeText")}{" "}
                            <Link to={`/termAndCondition/general${pathname}`}>
                              <span className="text-dark fw-bolder">
                                {t("login.termsAndConditionsText")}
                              </span>
                            </Link>
                          </p>
                        }
                        name={"termAndConditionCheck"}
                        onChangeHandle={handleChange}
                        onBlurHandle={handleBlur}
                        checked={values.termAndConditionCheck}
                      />
                    </div>
                    <p className="errorField mb-2">
                      {t(errors.termAndConditionCheck) &&
                        touched.termAndConditionCheck &&
                        t(errors.termAndConditionCheck)}
                    </p>
                    <FillBtn
                      className="w-100 py-3 mb-2"
                      text={t("login.signInText")}
                      disabled={loading === "pending" ? true : false}
                      type={"submit"}
                    />
                    <OutlineBtn
                      className="w-100 py-3"
                      text={t("login.cancelText")}
                      handleOnClick={handleCancelClick}
                    />
                    <p className="pt-3 text-center">
                      {t("login.newHereText")}{" "}
                      <Link to="/registerAs" className="textYellow">
                        {t("login.createAccountText")}
                      </Link>
                    </p>
                  </CardBody>
                </Card>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
      <InformationModal
        size={"md"}
        TOneClassName={"mb-2 fs-5 text-center"}
        className={"p-4"}
        isOpen={showAccountRequestModal}
        onClose={handleAccountRequestModalClose}
        ModalTextOne={accountRequestModalErrorText}
        ButtonOne={
          <FillBtn
            text={t("otpVerification.okayText")}
            className="py-2 px-5"
            handleOnClick={handleAccountRequestModalClose}
          />
        }
      />
    </Container>
  );
};

export default memo(SignInForm);
