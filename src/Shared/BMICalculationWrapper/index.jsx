import { Formik } from "formik";
import InputField from "../InputField";
import FillBtn from "../Buttons/FillBtn";
import React, { memo, useState } from "react";
import OutlineBtn from "../Buttons/OutlineBtn";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PhoneInputField from "../PhoneInputField";
import PageHeading from "../Headings/PageHeading";
import { SEND_HEALTH_RESULT } from "../../utils/constants";
import { BMI_INITIAL_VALUES } from "../ValidationData/initialValue";
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
import InformationModal from "../Modal/InformationModal";
import { BMI_SCHEMA } from "../ValidationData/validation";
import LoadingScreen from "../../HelperMethods/LoadingScreen";
import { sendHealthCheckEmail } from "../../Redux/features/User/userApi";

const BMICalculationWrapper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("");

  const { loading } = useSelector((state) => state.user);
  const { lang: currentLanguage } = useSelector((state) => state.language);

  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleCloseInfoModal = () => setShowInfoModal(false);

  const handleBMISubmit = (values, resetForm) => {
    const heightInMeters = values.height / 100;
    const bmi = (values.weight / (heightInMeters * heightInMeters)).toFixed(2);
    let result = "";

    if (bmi < 18.5) {
      result = "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      result = "Normal weight";
    } else if (bmi >= 25.0 && bmi <= 29.9) {
      result = "Overweight";
    } else {
      result = "Obese";
    }

    const data = {
      apiEndpoint: SEND_HEALTH_RESULT,
      requestData: JSON.stringify({
        ...values,
        type: "bmi",
        value: bmi,
        result,
        lang: currentLanguage,
      }),
    };

    dispatch(sendHealthCheckEmail(data)).then((res) => {
      if (res.type === "sendHealthCheckEmail/fulfilled") {
        resetForm(true);
        setShowInfoModal(true);
      }
    });
  };

  return (
    <Container className={`text-black-custom py-4`}>
      <Row
        className={`justify-content-center text-black-custom`}
        style={{ minHeight: "100vh", maxHeight: "auto" }}
      >
        {loading === "pending" && <LoadingScreen />}
        <Col md={10} className={`d-flex`}>
          <Card className="px-md-4 px-1 py-md-5 py-4 mb-2 onlyBorderRadius d-flex justify-content-center w-100">
            <CardHeader className="bg-transparent text-center border-0 p-0 my-md-3 my-1">
              <PageHeading
                headingText={t("calculation.isYourWeightRangeText")}
              />
            </CardHeader>
            <CardBody className="w-100">
              <Formik
                initialValues={{ ...BMI_INITIAL_VALUES }}
                validationSchema={BMI_SCHEMA}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  handleBMISubmit(values, resetForm);
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
                    <Card
                      className={`border-0 bg-white onlyBorderRadius mb-2 ${i18n.dir()}`}
                    >
                      <CardBody className="p-md-2 p-0">
                        <Row>
                          <Col md={6} className="mt-1">
                            <div>{t("calculation.weightText")}</div>
                            <InputField
                              type="number"
                              name="weight"
                              onChangeHandle={handleChange}
                              onBlurHandle={handleBlur}
                              value={values.weight}
                              className={
                                "form-control-lg BorderRadiusInput py-3 px-3 mb-1"
                              }
                            />
                            <p className="errorField">
                              {t(errors.weight) &&
                                touched.weight &&
                                t(errors.weight)}
                            </p>
                          </Col>
                          <Col md={6} className="mt-1">
                            <div>{t("calculation.heightText")}</div>
                            <InputField
                              type="number"
                              name="height"
                              onChangeHandle={handleChange}
                              onBlurHandle={handleBlur}
                              value={values.height}
                              className={
                                "form-control-lg BorderRadiusInput py-3 px-3 mb-1"
                              }
                            />
                            <p className="errorField">
                              {t(errors.height) &&
                                touched.height &&
                                t(errors.height)}
                            </p>
                          </Col>
                          <Col md={6} className="mt-1">
                            <div>{t("calculation.emailText")}</div>
                            <InputField
                              type="email"
                              name="email"
                              onChangeHandle={handleChange}
                              onBlurHandle={handleBlur}
                              value={values.email}
                              className={
                                "form-control-lg BorderRadiusInput py-3 px-3 mb-1"
                              }
                            />
                            <p className="errorField">
                              {t(errors.email) &&
                                touched.email &&
                                t(errors.email)}
                            </p>
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col md={6} className="mt-1">
                            <div>{t("calculation.nameText")}</div>
                            <InputField
                              type="text"
                              name="name"
                              onChangeHandle={handleChange}
                              onBlurHandle={handleBlur}
                              value={values.name}
                              className={
                                "form-control-lg BorderRadiusInput py-3 px-3"
                              }
                            />
                            <p className="errorField">
                              {t(errors.name) && touched.name && t(errors.name)}
                            </p>
                          </Col>
                          <Col lg={6} md={6} className="mt-1">
                            <div>{t("calculation.phoneNumberText")}</div>
                            <PhoneInputField
                              inputProps={{
                                name: "phone_number",
                                required: true,
                                className:
                                  "form-control-lg w-100 py-3 px-4 customPhoneInput border",
                              }}
                              defaultCountry={"sa"}
                              value={values.phone_number}
                              setFieldValue={setFieldValue}
                            />
                            <p className="errorField">
                              {t(errors.phone_number) &&
                                touched.phone_number &&
                                t(errors.phone_number)}
                            </p>
                          </Col>
                        </Row>
                        <div className="text-center">
                          <FillBtn
                            className="w-50 py-2 mt-5 mb-2 text-center mx-2"
                            text={t("calculation.submitText")}
                            disabled={loading === "pending" ? true : false}
                            type={"submit"}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  </Form>
                )}
              </Formik>
              <div className="text-center">
                <OutlineBtn
                  className="w-50 py-2"
                  text={t("calculation.backText")}
                  handleOnClick={() => navigate("/selectTool")}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <InformationModal
        size={"md"}
        TOneClassName={"mb-4 fs-5 text-center"}
        className={"p-4"}
        isOpen={showInfoModal}
        onClose={handleCloseInfoModal}
        ModalTextOne={t("guest.resultSendText")}
        ButtonOne={
          <FillBtn
            text={t("otpVerification.okayText")}
            className="py-2 px-5"
            handleOnClick={handleCloseInfoModal}
          />
        }
      />
    </Container>
  );
};

export default memo(BMICalculationWrapper);
