import { Formik } from "formik";
import PropTypes from "prop-types";
import React, { memo } from "react";
import InputField from "../../InputField";
import FillBtn from "../../Buttons/FillBtn";
import OutlineBtn from "../../Buttons/OutlineBtn";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { TRAINEE_PROGRESS_URL } from "../../../utils/constants";
import { ADD_PROGRESS_SCHEMA } from "../../ValidationData/validation";
import { addTraineeProgress } from "../../../Redux/features/User/userApi";
import { Modal, ModalBody, ModalHeader, Label, Form } from "reactstrap";
import { ADD_PROGRESS_INITIAL_VALUES } from "../../ValidationData/initialValue";

const AddProgressModal = (props) => {
  const { onClose, isOpen, className, size, handleRefetchHistory } = props;
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation("");

  const handleAddProgressSubmit = (values) => {
    const data = {
      apiEndpoint: TRAINEE_PROGRESS_URL,
      requestData: JSON.stringify(values),
    };
    dispatch(addTraineeProgress(data)).then((res) => {
      if (res.type === "addTraineeProgress/fulfilled") {
        handleRefetchHistory();
      }
    });
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
        <b>{t("traineeDashboard.addYourProgressText")}</b>
      </ModalHeader>
      <ModalBody className="p-4">
        <Formik
          initialValues={{ ...ADD_PROGRESS_INITIAL_VALUES }}
          validationSchema={ADD_PROGRESS_SCHEMA}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            handleAddProgressSubmit(values);
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
              <div className="mb-2">
                <Label className="fw-normal small mb-0">
                  {`${t("traineeDashboard.weightText")} (kg)`}
                </Label>
                <InputField
                  type="number"
                  name="weight"
                  placeholder={t("traineeDashboard.weightText")}
                  onChangeHandle={handleChange}
                  onBlurHandle={handleBlur}
                  value={values.weight}
                  className={"form-control-lg BorderRadiusInput py-3 px-2"}
                />
                <p className="errorField">
                  {t(errors.weight) && touched.weight && t(errors.weight)}
                </p>
              </div>
              <div className="mb-2">
                <Label className="fw-normal small mb-0">
                  {`${t("traineeDashboard.skeletalMuscleMassText")} (kg)`}
                </Label>
                <InputField
                  type="number"
                  name="skeletal_muscel_mass"
                  placeholder={t("traineeDashboard.skeletalMuscleMassText")}
                  onChangeHandle={handleChange}
                  onBlurHandle={handleBlur}
                  value={values.skeletal_muscel_mass}
                  className={"form-control-lg BorderRadiusInput py-3 px-2"}
                />
                <p className="errorField">
                  {t(errors.skeletal_muscel_mass) &&
                    touched.skeletal_muscel_mass &&
                    t(errors.skeletal_muscel_mass)}
                </p>
              </div>
              <div className="mb-2">
                <Label className="fw-normal small mb-0">
                  {`${t("traineeDashboard.bodyFatMassText")} (kg)`}
                </Label>
                <InputField
                  type="number"
                  name="body_fat_mass"
                  placeholder={t("traineeDashboard.bodyFatMassText")}
                  onChangeHandle={handleChange}
                  onBlurHandle={handleBlur}
                  value={values.body_fat_mass}
                  className={"form-control-lg BorderRadiusInput py-3 px-2"}
                />
                <p className="errorField">
                  {t(errors.body_fat_mass) &&
                    touched.body_fat_mass &&
                    t(errors.body_fat_mass)}
                </p>
              </div>
              <div className="mb-2">
                <Label className="fw-normal small mb-0">
                  {`${t("traineeDashboard.proteinText")}  (g / kg)`}
                </Label>
                <InputField
                  type="number"
                  name="protien"
                  placeholder={t("traineeDashboard.proteinText")}
                  onChangeHandle={handleChange}
                  onBlurHandle={handleBlur}
                  value={values.protien}
                  className={"form-control-lg BorderRadiusInput py-3 px-2"}
                />
                <p className="errorField">
                  {t(errors.protien) && touched.protien && t(errors.protien)}
                </p>
              </div>
              <div className="w-100 d-flex align-items-center justify-content-center gap-3">
                <FillBtn
                  className="w-100 py-2"
                  text={t("traineeDashboard.saveText")}
                  disabled={loading === "pending" ? true : false}
                  type={"submit"}
                />
                <OutlineBtn
                  className="w-100 py-2"
                  text={t("login.cancelText")}
                  handleOnClick={() => onClose()}
                />
              </div>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};
AddProgressModal.propTypes = {
  children: PropTypes.node,
  size: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
};
AddProgressModal.defaultProps = {
  className: "",
  size: "sm",
  isOpen: false,
  onClose: () => {},
};

export default memo(AddProgressModal);
