import "./styles.scss";
import { Formik } from "formik";
import { Form } from "reactstrap";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import InputField from "../../InputField";
import FillBtn from "../../Buttons/FillBtn";
import { useTranslation } from "react-i18next";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { REVIEW_REQUEST_REJECTION_SCHEMA } from "../../ValidationData/validation";
import { REVIEW_REQUEST_REJECTION_INITIAL_VALUES } from "../../ValidationData/initialValue";

const RejectionReasonModal = (props) => {
  const { onClose, isOpen, className, size, heading, handleSubmit } = props;

  const { t } = useTranslation("");
  const { loading } = useSelector((state) => state.reviewRequest);

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size={size}
      isOpen={isOpen}
      toggle={onClose}
      className={`${className}`}
      backdrop={"static"}
    >
      <ModalHeader toggle={() => onClose(false)} className="border-0 pt-3 pb-0">
        <b>{heading}</b>
      </ModalHeader>

      <ModalBody className="text-start text-black-custom">
        <div>
          <Formik
            initialValues={{ ...REVIEW_REQUEST_REJECTION_INITIAL_VALUES }}
            validationSchema={REVIEW_REQUEST_REJECTION_SCHEMA}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              handleSubmit(values);
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
                <div className="py-2">
                  <InputField
                    type="textarea"
                    name="reject_message"
                    placeholder={"Write rejection reason..."}
                    onChangeHandle={handleChange}
                    onBlurHandle={handleBlur}
                    value={values.reject_message}
                    className={"form-control-lg BorderRadiusInput py-3 px-3"}
                  />
                  <p className="errorField">
                    {t(errors.reject_message) &&
                      touched.reject_message &&
                      t(errors.reject_message)}
                  </p>
                  <div className="w-100 d-flex align-items-center justify-content-center gap-3 modalButtons">
                    <FillBtn
                      className="w-50 py-2 mt-3"
                      text={"Done"}
                      disabled={loading === "pending" ? true : false}
                      type={"submit"}
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </ModalBody>
    </Modal>
  );
};

RejectionReasonModal.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  size: PropTypes.string,
};

RejectionReasonModal.defaultProps = {
  className: "",
  size: "sm",
  isOpen: false,
  onClose: () => {},
};

export default memo(RejectionReasonModal);
