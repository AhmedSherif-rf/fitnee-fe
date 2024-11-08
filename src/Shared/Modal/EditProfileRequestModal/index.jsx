import PropTypes from "prop-types";
import React, { memo } from "react";
import { Formik, Field } from "formik";
import { RxCross2 } from "react-icons/rx";
import InputField from "../../InputField";
import FillBtn from "../../Buttons/FillBtn";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import functions from "../../../utils/functions";
import PhoneInputField from "../../PhoneInputField";
import { useDispatch, useSelector } from "react-redux";
import Images from "../../../HelperMethods/Constants/ImgConstants";
import { Modal, ModalBody, ModalHeader, Label, Row, Col } from "reactstrap";
import { sendEditProfileRequest } from "../../../Redux/features/User/userApi";
import {
  TRAINER_TYPE,
  NUTRITIONIST_TYPE,
  SEND_UPDATE_PROFILE_URL,
} from "../../../utils/constants";
import {
  TRAINER_EDIT_PROFILE_REQUEST_SCHEMA,
  NUTRITIONIST_EDIT_PROFILE_REQUEST_SCHEMA,
} from "../../ValidationData/validation";
import {
  TRAINER_EDIT_PROFILE_REQUEST_INITIAL_VALUES,
  NUTRITIONIST_EDIT_PROFILE_REQUEST_INITIAL_VALUES,
} from "../../ValidationData/initialValue";

const EditProfileRequestModal = (props) => {
  const {
    onClose,
    isOpen,
    className,
    size,
    heading,
    setShowEditProfileRequestSentModal,
  } = props;

  const dispatch = useDispatch();
  const { roleType } = useParams();
  const { t, i18n } = useTranslation("");
  const { user, loading } = useSelector((state) => state.user);

  const handleEditRequestSubmit = (values) => {
    values.certificates = values.certificates.map((item) => ({
      title: item,
      is_image_compressed: false,
    }));

    const formData = functions.createFormData(values);

    const data = {
      apiEndpoint: SEND_UPDATE_PROFILE_URL,
      requestData: formData,
    };
    dispatch(sendEditProfileRequest(data)).then((res) => {
      if (res.type === "sendEditProfileRequest/fulfilled") {
        onClose();
        setShowEditProfileRequestSentModal(true);
      }
    });
  };

  const getSchemaValidation = () => {
    switch (roleType) {
      case TRAINER_TYPE:
        return TRAINER_EDIT_PROFILE_REQUEST_SCHEMA;
      case NUTRITIONIST_TYPE:
        return NUTRITIONIST_EDIT_PROFILE_REQUEST_SCHEMA;
      default:
        return {};
    }
  };

  const getInitialValues = () => {
    switch (roleType) {
      case TRAINER_TYPE:
        return functions.setTrainerEditRequestInitialValues(
          TRAINER_EDIT_PROFILE_REQUEST_INITIAL_VALUES,
          user
        );
      case NUTRITIONIST_TYPE:
        return functions.setNutritionistEditRequestInitialValues(
          NUTRITIONIST_EDIT_PROFILE_REQUEST_INITIAL_VALUES,
          user
        );

      default:
        return {};
    }
  };

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size={size}
      isOpen={isOpen}
      onClosed={onClose}
      toggle={onClose}
      className={`${className} ${i18n.dir()}`}
    >
      <ModalHeader className="border-0">
        <b>{heading}</b>
      </ModalHeader>
      <ModalBody className="p-4">
        <Formik
          initialValues={getInitialValues()}
          validationSchema={getSchemaValidation()}
          onSubmit={(values) => {
            handleEditRequestSubmit(values);
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
            <form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <div className="py-2">
                  <>
                    <Col md={12}>
                      <h6 className="fw-bold">
                        {t("signup.attachCertificateText")}{" "}
                      </h6>
                    </Col>
                    <Col>
                      <div className="form-group multi-preview d-flex flex-wrap align-items-center mb-4">
                        {values.certificate_files.map((image, index) => (
                          <div
                            key={index}
                            className="col-sm-12 col-md-2 col-lg-3 col-xl-3 mx-2 position-relative BorderRadius"
                          >
                            <Field
                              name={`certificates.${index}`}
                              type="text"
                              className="form-control-lg certificationTitle bgBlur"
                              placeholder="Add title"
                            />
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`${index + 1}`}
                              className="uploaded-image BorderRadius bgProperties w-100"
                              style={{
                                height: "170px",
                              }}
                            />
                            <button
                              type="button"
                              className="deleteButton"
                              onClick={() => {
                                const updatedImages = [
                                  ...values.certificate_files,
                                ];
                                updatedImages.splice(index, 1);
                                setFieldValue(
                                  "certificate_files",
                                  updatedImages
                                );

                                const updatedCertificateTitles = [
                                  ...values.certificates,
                                ];
                                updatedCertificateTitles.splice(index, 1);
                                setFieldValue(
                                  "certificates",
                                  updatedCertificateTitles
                                );
                              }}
                            >
                              <RxCross2 size={15} color="red" />
                            </button>
                          </div>
                        ))}
                        <Label
                          id="UploadImgLabel"
                          className="BorderRadius text-center mb-0 my-2"
                          style={{
                            minWidth: "220px",
                            maxHeight: "170px",
                          }}
                        >
                          <img src={Images.UPLOAD_ICON} alt="" />
                          <input
                            id="file-upload"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={(event) => {
                              const files = event.currentTarget.files;
                              if (files.length > 0) {
                                const uploadedImages = Array.from(files);
                                setFieldValue("certificate_files", [
                                  ...values.certificate_files,
                                  ...uploadedImages,
                                ]);
                              }
                            }}
                            multiple
                            style={{ display: "none" }}
                          />
                          <h6>{t("signup.uploadImageText")}</h6>
                        </Label>
                      </div>
                    </Col>
                  </>
                  <p className="errorField">
                    {t(errors.certificate_files) &&
                      touched.certificate_files &&
                      t(errors.certificate_files)}
                  </p>
                  <p className="errorField">
                    {t(errors.certificates) &&
                      touched.certificates &&
                      t(errors.certificates)}
                  </p>

                  <Row>
                    {roleType === TRAINER_TYPE && (
                      <Col md={12} className="mb-2">
                        <h6 className="fw-bold">
                          {t("signup.saudiRepsNumberText")}
                        </h6>
                        <InputField
                          className="py-3 px-4"
                          type="number"
                          placeholder={t("signup.saudiRepsNumberText")}
                          name="saudireps_number"
                          onChangeHandle={handleChange}
                          onBlurHandle={handleBlur}
                          value={values.saudireps_number}
                        />
                        <p className="errorField">
                          {t(errors.saudireps_number) &&
                            touched.saudireps_number &&
                            t(errors.saudireps_number)}
                        </p>
                      </Col>
                    )}

                    {roleType === NUTRITIONIST_TYPE && (
                      <Col md={12} className="mb-2">
                        <h6 className="fw-bold">
                          {t("signup.enterYourProfessionalText")}
                        </h6>
                        <InputField
                          className="py-3 px-4"
                          type="number"
                          placeholder={t("signup.enterYourProfessionalText")}
                          name="license"
                          onChangeHandle={handleChange}
                          onBlurHandle={handleBlur}
                          value={values.license}
                        />
                        <p className="errorField">
                          {t(errors.license) &&
                            touched.license &&
                            t(errors.license)}
                        </p>
                      </Col>
                    )}

                    <Col md={12} className="mb-2">
                      <h6 className="fw-bold">
                        {t("signup.enterStcPayAccountText")}
                      </h6>
                      <PhoneInputField
                        inputProps={{
                          name: "stc_pay",
                          required: true,
                          className:
                            "form-control-lg w-100  py-3 px-4 customPhoneInput border",
                        }}
                        defaultCountry={"sa"}
                        value={values.stc_pay}
                        setFieldValue={setFieldValue}
                      />
                      <p className="errorField">
                        {t(errors.stc_pay) &&
                          touched.stc_pay &&
                          t(errors.stc_pay)}
                      </p>
                    </Col>
                  </Row>
                </div>
              </Row>

              <Row className="pb-1">
                <Col md={12}>
                  <FillBtn
                    type={"submit"}
                    text={user ? t("signup.saveText") : t("signup.nextText")}
                    className="w-100 py-2"
                    disabled={loading === "pending" ? true : false}
                  />
                </Col>
              </Row>
            </form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};
EditProfileRequestModal.propTypes = {
  children: PropTypes.node,
  size: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
};
EditProfileRequestModal.defaultProps = {
  className: "",
  size: "lg",
  isOpen: false,
  onClose: () => {},
  setShowEditProfileRequestSentModal: () => {},
};

export default memo(EditProfileRequestModal);
