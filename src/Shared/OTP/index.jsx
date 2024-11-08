import OTPInput from "otp-input-react";
import FillBtn from "../Buttons/FillBtn";
import styles from "./style.module.scss";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../HelperMethods/LoadingScreen";
import { setPhoneNumber } from "../../Redux/features/User/userSlice";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import {
  resendOtp,
  verifyOtp,
} from "../../Redux/features/ForgotPassword/forgotPasswordApi";
import {
  FORGOT_PASSWORD_VERIFY_URL,
  FORGOT_PASSWORD_RESEND_OTP_URL,
} from "../../utils/constants";

const OTPVerification = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const { t, i18n } = useTranslation("");
  const [timer, setTimer] = useState({ minutes: 1, seconds: 59 });
  const { phone_number: userPhoneNumber } = useSelector((state) => state.user);
  const { phone_number: forgotPasswordPhoneNumber, loading } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    const otpTimeInterval = setInterval(() => {
      if (timer.seconds > 0) {
        setTimer({ ...timer, seconds: timer.seconds - 1 });
      }
      if (timer.seconds === 0) {
        if (timer.minutes === 0) {
          clearInterval(otpTimeInterval);
        } else {
          setTimer({ minutes: timer.minutes - 1, seconds: 59 });
        }
      }
    }, 1000);

    return () => {
      clearInterval(otpTimeInterval);
    };
  }, [timer]);

  const handleNextClick = () => {
    let phone_number = "";
    if (type === "forgotPassword" || type === "signUp") {
      phone_number =
        type === "forgotPassword" ? forgotPasswordPhoneNumber : userPhoneNumber;
    }
    const data = {
      apiEndpoint: FORGOT_PASSWORD_VERIFY_URL,
      requestData: JSON.stringify({ phone_number, otp }),
    };
    dispatch(verifyOtp(data)).then((res) => {
      if (res.type === "verifyOtp/fulfilled") {
        if (type === "forgotPassword") {
          navigate("/changePassword");
        } else {
          dispatch(setPhoneNumber(""));
          if (res?.payload?.data?.request_id) {
            navigate(
              `/serviceProvider/appDownloadLink/${res.payload.data.request_id}`
            );
          } else {
            navigate("/signIn");
          }
        }
      }
    });
  };

  const handleResendClick = () => {
    let phone_number = "";
    if (type === "forgotPassword" || type === "signUp") {
      phone_number =
        type === "forgotPassword" ? forgotPasswordPhoneNumber : userPhoneNumber;
    }
    if (timer.seconds === 0 && timer.minutes === 0) {
      if (type === "forgotPassword" || type === "signUp") {
        const data = {
          apiEndpoint: FORGOT_PASSWORD_RESEND_OTP_URL,
          requestData: JSON.stringify({ phone_number, type }),
        };
        dispatch(resendOtp(data)).then((res) => {
          if (res.type === "resendOtp/fulfilled") {
            setOtp("");
            setTimer({ minutes: 1, seconds: 59 });
          }
        });
      }
    }
  };

  return (
    <Container
      className={`vh-100 text-black-custom ${
        styles.otpContainer
      } ${i18n.dir()}`}
    >
      <Row
        className={`justify-content-center text-black-custom align-items-md-center align-items-end vh-100  ${styles.otpWrapper}`}
      >
        {loading === "pending" && <LoadingScreen />}
        <Col
          lg={5}
          md={6}
          sm={10}
          className={`text-center d-flex align-items-center justify-content-center`}
        >
          <Card className="px-4 py-md-5 py-4 mb-2 onlyBorderRadius d-flex align-items-center justify-content-center w-100">
            <CardHeader className="bg-transparent border-0 p-0 my-md-3 my-1">
              <h1 className="mb-4 fw-400 fw-bold">
                {t("otpVerification.verificationText")}
              </h1>
              <p className="fs-4 lh-1 w-100 mb-0">
                {t("otpVerification.openYourEmailText")}
              </p>
            </CardHeader>
            <CardBody className={`${styles.cardBodyCustom}`}>
              <div
                className={`d-flex align-items-center justify-content-center ${
                  i18n.dir() === "rtl" ? "optWidthForArb" : "optWidthForEng"
                } ${styles.otpDiv} `}
              >
                <OTPInput
                  className={`${styles.otpInputs} ltr`}
                  value={otp}
                  onChange={setOtp}
                  autoFocus={true}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                />
              </div>
              <p className="text-black-custom mb-3">
                {t("otpVerification.resendCodeInText")}{" "}
                <span className="textYellow fw-bold">
                  {timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}:
                  {timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
                </span>
              </p>
              <p
                className={`pb-2 fw-bold mb-3 ${
                  timer.seconds !== 0 || timer.minutes !== 0
                    ? "text-muted"
                    : "cursorPointer textYellow"
                }`}
                onClick={() => handleResendClick()}
              >
                {t("otpVerification.resendCodeText")}
              </p>
              <FillBtn
                text={t("otpVerification.nextText")}
                className="w-75 py-2"
                disabled={otp.length < 6 ? true : false}
                handleOnClick={handleNextClick}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OTPVerification;
