import "./styleExercise.scss";
import { Form } from "reactstrap";
import classnames from "classnames";
import { useParams } from "react-router-dom";
import React, { useState, memo } from "react";
import FillBtn from "../../../Buttons/FillBtn";
import { useTranslation } from "react-i18next";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Formik, FieldArray, Field } from "formik";
import functions from "../../../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../../../Shared/InputField";
import ToggleSwitch from "../../../../Shared/ToggleSwitch";
import { ADMIN_EXERCISE_URL } from "../../../../utils/constants";
import LoadingScreen from "../../../../HelperMethods/LoadingScreen";
import { ADD_EXERCISE_SCHEMA } from "../../../ValidationData/validation";
import { addExercise } from "../../../../Redux/features/Exercise/exerciseApi";
import { ADD_EXERCISE_INITIAL_VALUES } from "../../../ValidationData/initialValue";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";

const AddExerciseForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("");
  const { subCategoryId } = useParams();
  const { loading } = useSelector((state) => state.exercise);

  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handleAddExercise = (values, resetForm) => {
    const formData = functions.createFormData({
      ...values,
      warm_up: values.warm_up ? "Yes" : "No",
      exercise: subCategoryId,
    });
    const data = {
      apiEndpoint: ADMIN_EXERCISE_URL,
      requestData: formData,
    };
    dispatch(addExercise(data)).then((res) => {
      if (res.type === "addExercise/fulfilled") {
        resetForm();
      }
    });
  };

  return (
    <div className="tableBodyWrapperPagination">
      {loading === "pending" && <LoadingScreen />}
      <Formik
        initialValues={ADD_EXERCISE_INITIAL_VALUES}
        validationSchema={ADD_EXERCISE_SCHEMA}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          handleAddExercise(values, resetForm);
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
            <div className="navTab">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={`${classnames({
                      active: activeTab === "1",
                    })}`}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    العربي
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={`${classnames({
                      active: activeTab === "2",
                    })}`}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    English
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row className="m-3 rtl">
                    <Col md="6" className="mb-2">
                      <InputField
                        type="text"
                        name="title_ar"
                        placeholder={"Type exercise title"}
                        onChangeHandle={handleChange}
                        onBlurHandle={handleBlur}
                        value={values.title_ar}
                        className={
                          "form-control-lg BorderRadiusInput py-3 px-3 rtl"
                        }
                      />
                      <p className="errorField text-end">
                        {t(errors.title_ar) &&
                          touched.title_ar &&
                          t(errors.title_ar)}
                      </p>
                    </Col>
                    <Col md="12" className="mb-2">
                      <FieldArray
                        name="exercise_part_text_ar"
                        render={(arrayHelpers) => (
                          <div className="text-end">
                            {values.exercise_part_text_ar.map((item, index) => (
                              <Row key={index} className="mb-1">
                                <Col md={6} className="mb-2">
                                  <Field
                                    name={`exercise_part_text_ar.${index}`}
                                    type="text"
                                    placeholder="Add exercise text"
                                    className="customDropdownRadius form-control select-field py-3 px-4 border"
                                  />
                                  <p className="errorField">
                                    {t(errors.exercise_part_text_ar?.[index]) &&
                                      touched.exercise_part_text_ar?.[index] &&
                                      t(errors.exercise_part_text_ar?.[index])}
                                  </p>
                                </Col>

                                <Col md={1} className="mb-2">
                                  <div className="d-flex align-items-center justify-content-end h-100">
                                    <RiDeleteBin6Line
                                      className="cursorPointer"
                                      size={18}
                                      onClick={() => arrayHelpers.remove(index)}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            ))}
                            <span
                              onClick={() => arrayHelpers.push("")}
                              className="textYellow cursorPointer"
                            >
                              Add More
                            </span>
                          </div>
                        )}
                      />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row className="m-3">
                    <Col md="6" className="mb-2">
                      <InputField
                        type="text"
                        name="title"
                        placeholder={"Type exercise title"}
                        onChangeHandle={handleChange}
                        onBlurHandle={handleBlur}
                        value={values.title}
                        className={
                          "form-control-lg BorderRadiusInput py-3 px-3"
                        }
                      />
                      <p className="errorField text-start">
                        {t(errors.title) && touched.title && t(errors.title)}
                      </p>
                    </Col>
                    <Col md="12" className="mb-2">
                      <FieldArray
                        name="exercise_part_text"
                        render={(arrayHelpers) => (
                          <div className="text-start">
                            {values.exercise_part_text.map((item, index) => (
                              <Row key={index} className="mb-1">
                                <Col md={6} className="mb-2">
                                  <Field
                                    name={`exercise_part_text.${index}`}
                                    type="text"
                                    placeholder="Add exercise text"
                                    className="customDropdownRadius form-control select-field py-3 px-4 border"
                                  />
                                  <p className="errorField">
                                    {t(errors.exercise_part_text?.[index]) &&
                                      touched.exercise_part_text?.[index] &&
                                      t(errors.exercise_part_text?.[index])}
                                  </p>
                                </Col>

                                <Col md={1} className="mb-2">
                                  <div className="d-flex align-items-center justify-content-end h-100">
                                    <RiDeleteBin6Line
                                      className="cursorPointer"
                                      size={18}
                                      onClick={() => arrayHelpers.remove(index)}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            ))}
                            <span
                              onClick={() => arrayHelpers.push("")}
                              className="textYellow cursorPointer"
                            >
                              Add More
                            </span>
                          </div>
                        )}
                      />
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
            <Row>
              <Col md={6} className="mb-3">
                <label htmlFor="" className="fw-bold w-100 text-start">
                  Add Exercise Video
                </label>

                <div className="exercise-upload-image"></div>
                <InputField
                  className="form-control-lg"
                  type="file"
                  placeholder="Add videos"
                  name="exercise_videos"
                  onChangeHandle={(event) => {
                    setFieldValue(
                      "exercise_videos",
                      event.currentTarget.files[0]
                    );
                  }}
                  onBlurHandle={handleBlur}
                />
                <p className="errorField text-start">
                  {t(errors.exercise_videos) &&
                    touched.exercise_videos &&
                    t(errors.exercise_videos)}
                </p>
              </Col>
              <Col md={6}>
                <div className="CreditCard d-flex justify-content-between align-items-center">
                  <div className=" me-2">
                    <p className="mb-0 fw-bold">Warm Up</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <ToggleSwitch
                      id="warm_up"
                      isOn={values.warm_up}
                      handleToggle={() => {
                        setFieldValue("warm_up", !values.warm_up);
                      }}
                    />
                  </div>
                </div>
                <div className="CreditCard d-flex justify-content-between align-items-center">
                  <div className=" me-2">
                    <p className="mb-0 fw-bold">Stretching</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <ToggleSwitch
                      id="stretching"
                      isOn={values.stretching}
                      handleToggle={() => {
                        setFieldValue("stretching", !values.stretching);
                      }}
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="my-4 justify-content-center">
              <Col md="4">
                <FillBtn text="Submit" type="submit" className="w-100 py-2" />
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default memo(AddExerciseForm);
