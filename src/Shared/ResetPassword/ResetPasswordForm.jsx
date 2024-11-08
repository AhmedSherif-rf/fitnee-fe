import { Formik } from "formik";
import React, { memo } from "react";
import InputField from "../InputField";
import FillBtn from "../Buttons/FillBtn";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Col, Container, Form, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../HelperMethods/LoadingScreen";
import Images from "../../HelperMethods/Constants/ImgConstants";
import { customLogout } from "../../Redux/features/User/userSlice";
import { changePassword } from "../../Redux/features/User/userApi";
import { TRAINEE_CHANGE_PASSWORD_URL } from "../../utils/constants";
import { CHANGE_PASSWORD_SCHEMA } from "../ValidationData/validation";
import { CHANGE_PASSWORD_INITIAL_VALUES } from "../ValidationData/initialValue";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("");
  const { loading } = useSelector((state) => state.user);

  const handleChangePasswordSubmit = (values, resetForm) => {
    const data = {
      apiEndpoint: TRAINEE_CHANGE_PASSWORD_URL,
      requestData: JSON.stringify(values),
      navigate,
    };
    dispatch(changePassword(data)).then((res) => {
      if (res.type === "changePassword/fulfilled") {
        resetForm();
        dispatch(customLogout());
      }
    });
  };

  return (
    <Container>
      <Row
        className={`justify-content-center text-black-custom align-items-md-center align-items-end ${i18n.dir()}`}
      >
        {loading === "pending" && <LoadingScreen />}
        <Col lg={5} md={12} sm={10}>
          <h1 className="text-center mb-5">
            {t("trainer.changePasswordText")}
          </h1>
          <Formik
            initialValues={{ ...CHANGE_PASSWORD_INITIAL_VALUES }}
            validationSchema={CHANGE_PASSWORD_SCHEMA}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              handleChangePasswordSubmit(values, resetForm);
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
                <InputField
                  type="password"
                  name="previous_password"
                  placeholder={t("changePassword.previousPasswordText")}
                  onChangeHandle={handleChange}
                  onBlurHandle={handleBlur}
                  value={values.previous_password}
                  icon={
                    <img src={Images.PASSWORD_ICON_IMG} alt="password-icon" />
                  }
                  className={
                    "form-control-lg BorderRadiusInput py-3 px-5 mb-1 mt-1"
                  }
                />
                <p className="errorField">
                  {t(errors.previous_password) &&
                    touched.previous_password &&
                    t(errors.previous_password)}
                </p>

                <InputField
                  type="password"
                  name="new_password"
                  placeholder={t("changePassword.newPasswordText")}
                  onChangeHandle={handleChange}
                  onBlurHandle={handleBlur}
                  value={values.new_password}
                  icon={
                    <img src={Images.PASSWORD_ICON_IMG} alt="password-icon" />
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
                    <img src={Images.PASSWORD_ICON_IMG} alt="password-icon" />
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
                  text={t("trainer.confirmText")}
                  type={t("trainer.submitText")}
                  handleOnClick={handleSubmit}
                  disabled={loading === "pending" ? true : false}
                />
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(ResetPasswordForm);
