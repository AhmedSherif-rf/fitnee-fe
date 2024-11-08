import { Formik } from "formik";
import FillBtn from "../Buttons/FillBtn";
import OutlineBtn from "../Buttons/OutlineBtn";
import { useTranslation } from "react-i18next";
import PhoneInputField from "../PhoneInputField";
import React, { memo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Row,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../HelperMethods/LoadingScreen";
import { FORGOT_PASSWORD_OTP_URL } from "../../utils/constants";
import { FORGOT_PASSWORD_SCHEMA } from "../ValidationData/validation";
import { FORGOT_PASSWORD_INITIAL_VALUES } from "../ValidationData/initialValue";
import { forgotPassword } from "../../Redux/features/ForgotPassword/forgotPasswordApi";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation("");
  const { loading } = useSelector((state) => state.forgotPassword);

  const handleCancelClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleForgotPasswordSubmit = (values) => {
    const data = {
      apiEndpoint: FORGOT_PASSWORD_OTP_URL,
      requestData: JSON.stringify(values),
      phone_number: values.phone_number,
    };
    dispatch(forgotPassword(data)).then((res) => {
      if (res.type === "forgotPassword/fulfilled") {
        navigate("/verifyOTP/forgotPassword");
      }
    });
  };

  return (
    <Container>
      <Row className="justify-content-center text-black-custom align-items-md-center align-items-end vh-100">
        {loading === "pending" && <LoadingScreen />}
        <Col lg={9} md={12} sm={10}>
          <Formik
            initialValues={{ ...FORGOT_PASSWORD_INITIAL_VALUES }}
            validationSchema={FORGOT_PASSWORD_SCHEMA}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              handleForgotPasswordSubmit(values);
            }}
          >
            {({ values, errors, touched, handleSubmit, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <Card className="py-md-5 py-2 px-3 border-0 bg-white onlyBorderRadius mb-2 ">
                  <CardHeader className="border-0 bg-transparent my-md-3">
                    <h1 className="text-center fs-1 fw-bold">
                      {t("forgotPassword.forgotPasswordText")}
                    </h1>
                  </CardHeader>
                  <CardBody className="customPadding">
                    <PhoneInputField
                      inputProps={{
                        name: "phone_number",
                        required: true,
                        className:
                          "form-control-lg w-100  py-3 px-4 customPhoneInput border",
                      }}
                      defaultCountry={"sa"}
                      value={values.stc_pay}
                      setFieldValue={setFieldValue}
                    />
                    <p className="errorField">
                      {t(errors.phone_number) &&
                        touched.phone_number &&
                        t(errors.phone_number)}
                    </p>
                    <div className="my-3">
                      <Link
                        to="/signIn"
                        className="text-black-custom fw-bolder"
                      >
                        {t("forgotPassword.knowMyPasswordText")}
                      </Link>
                    </div>
                    <FillBtn
                      className="w-100 py-3 mb-3"
                      type="submit"
                      disabled={loading === "pending" ? true : false}
                      text={t("forgotPassword.sendText")}
                    />
                    <OutlineBtn
                      className="w-100 py-3 mb-5"
                      text={t("forgotPassword.cancelText")}
                      handleOnClick={handleCancelClick}
                    />
                  </CardBody>
                </Card>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(ForgotPasswordForm);
