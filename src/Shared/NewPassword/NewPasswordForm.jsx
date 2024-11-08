import { Formik } from "formik";
import InputField from "../InputField";
import FillBtn from "../Buttons/FillBtn";
import { useNavigate } from "react-router-dom";
import OutlineBtn from "../Buttons/OutlineBtn";
import { useTranslation } from "react-i18next";
import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NEW_PASSWORD_URL } from "../../utils/constants";
import LoadingScreen from "../../HelperMethods/LoadingScreen";
import Images from "../../HelperMethods/Constants/ImgConstants";
import { NEW_PASSWORD_SCHEMA } from "../ValidationData/validation";
import { NEW_PASSWORD_INITIAL_VALUES } from "../ValidationData/initialValue";
import { newPassword } from "../../Redux/features/ForgotPassword/forgotPasswordApi";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Row,
} from "reactstrap";

const NewPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation("");
  const { loading, email } = useSelector((state) => state.forgotPassword);

  const handleCancelClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleNewPasswordSubmit = (values) => {
    const data = {
      apiEndpoint: NEW_PASSWORD_URL,
      requestData: JSON.stringify({ ...values, email }),
    };
    dispatch(newPassword(data)).then((res) => {
      if (res.type === "newPassword/fulfilled") {
        navigate("/signIn");
      }
    });
  };

  return (
    <Container>
      <Row className="justify-content-center text-black-custom align-items-md-center align-items-end vh-100">
        {loading === "pending" && <LoadingScreen />}
        <Col lg={8} md={10} sm={8}>
          <Formik
            initialValues={{ ...NEW_PASSWORD_INITIAL_VALUES }}
            validationSchema={NEW_PASSWORD_SCHEMA}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              handleNewPasswordSubmit(values);
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
                <Card className="px-3 py-5 border-0 bg-white onlyBorderRadius ">
                  <CardHeader className="border-0 bg-transparent mb-4">
                    <h1 className="text-center fs-1 fw-bold">
                      {t("changePassword.newPasswordText")}
                    </h1>
                  </CardHeader>
                  <CardBody className="customPadding">
                    <InputField
                      type="password"
                      name="new_password"
                      placeholder={t("changePassword.newPasswordText")}
                      onChangeHandle={handleChange}
                      onBlurHandle={handleBlur}
                      value={values.new_password}
                      icon={
                        <img
                          src={Images.PASSWORD_ICON_IMG}
                          alt="password-icon"
                        />
                      }
                      className={
                        "form-control-lg BorderRadiusInput py-3 px-5 mb-1 mt-1"
                      }
                    />
                    <p className="errorField">
                      {t(errors.new_password) &&
                        touched.new_password &&
                        t(errors.new_password)}
                    </p>
                    <InputField
                      type="password"
                      name="confirm_password"
                      placeholder={t("changePassword.confirmPasswordText")}
                      onChangeHandle={handleChange}
                      onBlurHandle={handleBlur}
                      value={values.confirm_password}
                      icon={
                        <img
                          src={Images.PASSWORD_ICON_IMG}
                          alt="password-icon"
                        />
                      }
                      className={
                        "form-control-lg BorderRadiusInput py-3 px-5 mb-1 mt-1"
                      }
                    />
                    <p className="errorField">
                      {t(errors.confirm_password) &&
                        touched.confirm_password &&
                        t(errors.confirm_password)}
                    </p>
                    <FillBtn
                      className="w-100 py-3 mb-3 mt-5"
                      text={t("changePassword.confirmText")}
                      type={"submit"}
                      handleOnClick={handleSubmit}
                      disabled={loading === "pending" ? true : false}
                    />
                    <OutlineBtn
                      className="w-100 py-3"
                      text={t("changePassword.cancelText")}
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

export default memo(NewPasswordForm);
