import "./style.scss";
import Checkbox from "../Checkbox";
import MyDropdown from "../MyDropdown";
import InputField from "../InputField";
import { Link } from "react-router-dom";
import FillBtn from "../Buttons/FillBtn";
import { RxCross2 } from "react-icons/rx";
import DocumentCard from "../DocumentCard";
import MultiSelector from "../MultiSelector";
import functions from "../../utils/functions";
import { useTranslation } from "react-i18next";
import { FaCircleXmark } from "react-icons/fa6";
import PhoneInputField from "../PhoneInputField";
import { Formik, Field, FieldArray } from "formik";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ConnectedFocusError } from "focus-formik-error";
import InformationModal from "../Modal/InformationModal";
import LoadingScreen from "../../HelperMethods/LoadingScreen";
import Images from "../../HelperMethods/Constants/ImgConstants";
import React, { memo, useState, useEffect, useCallback } from "react";
import EditProfileRequestModal from "../Modal/EditProfileRequestModal";
import { FaBirthdayCake, FaVenus, FaMars, FaEdit } from "react-icons/fa";
import {
  signUp,
  editProfile,
  getPreferences,
  getSpecialities,
} from "../../Redux/features/User/userApi";
import {
  TRAINEE_SIGNUP_SCHEMA,
  TRAINEE_EDIT_PROFILE_SCHEMA,
  TRAINER_SIGNUP_SCHEMA,
  TRAINER_EDIT_PROFILE_SCHEMA,
  NUTRITIONIST_SIGNUP_SCHEMA,
  NUTRITIONIST_EDIT_PROFILE_SCHEMA,
  TRAINER_NUTRITIONIST_SIGNUP_SCHEMA,
  TRAINER_NUTRITIONIST_EDIT_PROFILE_SCHEMA,
} from "../ValidationData/validation";
import {
  TRAINEE_SIGNUP_INITIAL_VALUES,
  TRAINER_SIGNUP_INITIAL_VALUES,
  TRAINER_EDIT_PROFILE_INITIAL_VALUES,
  NUTRITIONIST_SIGNUP_INITIAL_VALUES,
  NUTRITIONIST_EDIT_PROFILE_INITIAL_VALUES,
  TRAINER_NUTRITIONIST_SIGNUP_INITIAL_VALUES,
} from "../ValidationData/initialValue";
import {
  roleOptions,
  REGISTER_URL,
  TRAINEE_TYPE,
  TRAINER_TYPE,
  TRAINEE_ROLE,
  weekDaysOptions,
  EDIT_PROFILE_URL,
  NUTRITIONIST_TYPE,
  roleOptionsArabic,
  GET_SPECIALITIES_URL,
  weekDaysOptionsArabic,
  TRAINER_NUTRITIONIST_TYPE,
  GET_LEVEL_PREFERENCES_URL,
  GET_TRAINING_GOAL_PREFERENCES_URL,
} from "../../utils/constants";
import {
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupText,
  Input,
  Label,
} from "reactstrap";

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { roleType } = useParams();
  const { t, i18n } = useTranslation("");
  const { loading, user } = useSelector((state) => state.user);
  const filterFields = functions.filterSignUpFields(roleType, user);

  const [levelOptions, setLevelOptions] = useState([]);
  const [showPreviousImg, setShowPreviousImg] = useState(true);
  const [specialityOptions, setSpecialityOptions] = useState([]);
  const [trainingGoalOptions, setTrainingGoalOptions] = useState([]);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [
    showEditProfileRequestSentModal,
    setShowEditProfileRequestSentModal,
  ] = useState(false);

  useEffect(() => {
    if (roleType === TRAINER_TYPE || roleType === TRAINER_NUTRITIONIST_TYPE) {
      setSpecialityOptions([]);
      const data = {
        apiEndpoint: GET_SPECIALITIES_URL,
      };
      dispatch(getSpecialities(data)).then((res) => {
        if (res.type === "getSpecialities/fulfilled") {
          let specialities = [];
          if (i18n.dir() === "ltr") {
            specialities = res.payload.data.en;
          } else {
            specialities = res.payload.data.ar;
          }
          specialities = specialities.map(({ id, name }) => ({
            label: name,
            value: id,
          }));
          setSpecialityOptions(specialities);
        }
      });
    } else if (roleType === TRAINEE_TYPE) {
      const data = {
        apiEndpoint: GET_TRAINING_GOAL_PREFERENCES_URL,
      };
      dispatch(getPreferences(data)).then((res) => {
        if (res.type === "getPreferences/fulfilled") {
          let trainingGoals = [];
          if (i18n.dir() === "ltr") {
            trainingGoals = res.payload.data.en;
          } else {
            trainingGoals = res.payload.data.ar;
          }
          trainingGoals = trainingGoals.map(({ id, name }) => ({
            label: name,
            value: id,
          }));
          setTrainingGoalOptions(trainingGoals);
        }
      });

      const payload = {
        apiEndpoint: GET_LEVEL_PREFERENCES_URL,
      };
      dispatch(getPreferences(payload)).then((res) => {
        if (res.type === "getPreferences/fulfilled") {
          let levels = [];
          if (i18n.dir() === "ltr") {
            levels = res.payload.data.en;
          } else {
            levels = res.payload.data.ar;
          }
          levels = levels.map(({ id, name }) => ({
            label: name,
            value: id,
          }));
          setLevelOptions(levels);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.dir()]);

  const getInitialValues = () => {
    if (user) {
      switch (roleType) {
        case TRAINEE_TYPE:
          return functions.setTraineeInitialValues(
            TRAINEE_SIGNUP_INITIAL_VALUES,
            user
          );
        case TRAINER_TYPE:
          return functions.setTrainerInitialValues(
            TRAINER_EDIT_PROFILE_INITIAL_VALUES,
            user,
            i18n.dir()
          );
        case NUTRITIONIST_TYPE:
          return functions.setNutritionistInitialValues(
            NUTRITIONIST_EDIT_PROFILE_INITIAL_VALUES,
            user
          );
        case TRAINER_NUTRITIONIST_TYPE:
          return functions.setTrainerNutritionistInitialValues(
            TRAINER_NUTRITIONIST_SIGNUP_INITIAL_VALUES,
            user
          );

        default:
          return [];
      }
    } else {
      switch (roleType) {
        case TRAINEE_TYPE:
          return TRAINEE_SIGNUP_INITIAL_VALUES;
        case TRAINER_TYPE:
          return TRAINER_SIGNUP_INITIAL_VALUES;
        case NUTRITIONIST_TYPE:
          return NUTRITIONIST_SIGNUP_INITIAL_VALUES;
        case TRAINER_NUTRITIONIST_TYPE:
          return TRAINER_NUTRITIONIST_SIGNUP_INITIAL_VALUES;

        default:
          return [];
      }
    }
  };

  const getSchemaValidation = () => {
    if (user) {
      switch (roleType) {
        case TRAINEE_TYPE:
          return TRAINEE_EDIT_PROFILE_SCHEMA;
        case TRAINER_TYPE:
          return TRAINER_EDIT_PROFILE_SCHEMA;
        case NUTRITIONIST_TYPE:
          return NUTRITIONIST_EDIT_PROFILE_SCHEMA;
        case TRAINER_NUTRITIONIST_TYPE:
          return TRAINER_NUTRITIONIST_EDIT_PROFILE_SCHEMA;
        default:
          return [];
      }
    } else {
      switch (roleType) {
        case TRAINEE_TYPE:
          return TRAINEE_SIGNUP_SCHEMA;
        case TRAINER_TYPE:
          return TRAINER_SIGNUP_SCHEMA;
        case NUTRITIONIST_TYPE:
          return NUTRITIONIST_SIGNUP_SCHEMA;
        case TRAINER_NUTRITIONIST_TYPE:
          return TRAINER_NUTRITIONIST_SIGNUP_SCHEMA;

        default:
          return [];
      }
    }
  };

  const handleSignUpSubmit = (values) => {
    if (user === null) {
      values.lang = localStorage.getItem("Website_Language__fitnee");
      let formData = functions.createFormData(values);
      const data = {
        apiEndpoint: REGISTER_URL,
        requestData: formData,
      };
      dispatch(signUp(data)).then((res) => {
        if (res.type === "signUp/fulfilled") {
          navigate("/verifyOtp/signUp");
        }
      });
    } else {
      console.log(values);
      if (values?.profile_availability) {
        values.profile_availability = values.profile_availability.map(
          ({ id, day, starttime, endtime }) => ({
            id,
            day,
            starttime,
            endtime,
          })
        );
        values.lang = localStorage.getItem("Website_Language__fitnee");
      }
      if (!showPreviousImg && values?.body_images === null) {
        values.body_images = "";
      }

      let formData = functions.createFormData(values);
      const data = {
        apiEndpoint: EDIT_PROFILE_URL.replace("userId", user?.id),
        requestData: formData,
      };
      dispatch(editProfile(data)).then((res) => {
        if (res.type === "editProfile/fulfilled") {
          navigate(functions.getInitialUrl(user?.role));
        }
      });
    }
  };

  const handleEditProfileRequestSentModalClose = useCallback(() => {
    setShowEditProfileRequestSentModal(false);
  }, []);

  return (
    <Container className={i18n.dir()}>
      {loading === "pending" && <LoadingScreen />}
      <Formik
        initialValues={getInitialValues()}
        validationSchema={getSchemaValidation()}
        onSubmit={(values) => {
          handleSignUpSubmit(values);
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
            <ConnectedFocusError />

            {filterFields.includes("profile_pic") && (
              <Row className="justify-content-center">
                <Col md={2} className="my-4">
                  <div className="d-flex justify-content-center align-items-center">
                    <div className="rounded-circle bgProperties position-relative">
                      {values.profile_pic || user?.profile_pic ? (
                        <img
                          src={
                            values?.profile_pic
                              ? URL.createObjectURL(values?.profile_pic)
                              : user?.profile_pic
                              ? user?.profile_pic
                              : ""
                          }
                          className="rounded-circle bgProperties position-relative"
                          alt="Profile Preview"
                          style={{
                            height: "160px",
                            width: "160px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div
                          className="rounded-circle bgProperties position-relative"
                          style={{
                            backgroundImage: `url(${Images.USER_DUMMY_IMG})`,
                            height: "160px",
                            width: "160px",
                          }}
                        />
                      )}
                      <input
                        type="file"
                        id="profile_pic"
                        style={{ display: "none" }}
                        name="profile_pic"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={(event) => {
                          const selectedFile = event.currentTarget.files[0];
                          setFieldValue("profile_pic", selectedFile);
                        }}
                      />
                      <label
                        htmlFor="profile_pic"
                        className="CameraImg d-flex justify-content-center align-items-center bgProperties cursorPointer"
                      >
                        <img
                          src={Images.CAMERA_IMG}
                          className="img-fluid"
                          alt=""
                        />
                      </label>
                    </div>
                  </div>
                  <p className="errorField">
                    {t(errors.profile_pic) &&
                      touched.profile_pic &&
                      t(errors.profile_pic)}
                  </p>
                </Col>
              </Row>
            )}

            <Row>
              <Col md={12}>
                <h6 className="fw-bold">{t("signup.yourInformationText")}</h6>
              </Col>
              {filterFields.includes("first_name") && (
                <Col lg={6} md={6} className="mb-2">
                  <div
                    className="d-flex justify-content-between"
                    style={{ marginBottom: "-2px" }}
                  >
                    <div>{t("signup.firstNameText")}</div>
                    {user === null && <div>*</div>}
                  </div>
                  <InputField
                    className="py-3 px-4"
                    type="text"
                    // placeholder={t("signup.firstNameText")}
                    name="first_name"
                    onChangeHandle={handleChange}
                    onBlurHandle={handleBlur}
                    value={values.first_name}
                  />
                  <p className="errorField">
                    {t(errors.first_name) &&
                      touched.first_name &&
                      t(errors.first_name)}
                  </p>
                </Col>
              )}

              {filterFields.includes("full_name") && (
                <Col lg={6} md={6} className="mb-2">
                  <div
                    className="d-flex justify-content-between"
                    style={{ marginBottom: "-2px" }}
                  >
                    <div>{t("signup.fullNameText")}</div>
                    {user === null && <div>*</div>}
                  </div>
                  <InputField
                    className="py-3 px-4"
                    type="text"
                    // placeholder={t("signup.fullNameText")}
                    name="full_name"
                    onChangeHandle={handleChange}
                    onBlurHandle={handleBlur}
                    value={values.full_name}
                  />
                  <p className="errorField">
                    {t(errors.full_name) &&
                      touched.full_name &&
                      t(errors.full_name)}
                  </p>
                </Col>
              )}

              {filterFields.includes("last_name") && (
                <Col lg={6} md={6} className="mb-2">
                  <div
                    className="d-flex justify-content-between"
                    style={{ marginBottom: "-2px" }}
                  >
                    <div>{t("signup.lastNameText")}</div>
                    {user === null && <div>*</div>}
                  </div>
                  <InputField
                    className="py-3 px-4"
                    type="text"
                    // placeholder={t("signup.lastNameText")}
                    name="last_name"
                    onChangeHandle={handleChange}
                    onBlurHandle={handleBlur}
                    value={values.last_name}
                  />
                  <p className="errorField">
                    {t(errors.last_name) &&
                      touched.last_name &&
                      t(errors.last_name)}
                  </p>
                </Col>
              )}

              {filterFields.includes("email") && (
                <Col lg={6} md={6} className="mb-2">
                  <div
                    className="d-flex justify-content-between"
                    style={{ marginBottom: "-2px" }}
                  >
                    <div>{t("signup.emailLabelText")}</div>
                    {user === null && <div>*</div>}
                  </div>
                  <InputField
                    className="py-3 px-4"
                    type="text"
                    name="email"
                    // placeholder={t("signup.emailText")}
                    onChangeHandle={handleChange}
                    onBlurHandle={handleBlur}
                    value={values.email}
                    disabled={user ? true : false}
                  />
                  <p className="errorField">
                    {t(errors.email) && touched.email && t(errors.email)}
                  </p>
                </Col>
              )}

              {filterFields.includes("password") && (
                <Col lg={6} md={6} className="mb-2">
                  <div
                    className="d-flex justify-content-between"
                    style={{ marginBottom: "-2px" }}
                  >
                    <div>{t("signup.passwordLabelText")}</div>
                    {user === null && <div>*</div>}
                  </div>
                  <InputField
                    className="py-3 px-4"
                    type="password"
                    name="password"
                    // placeholder={t("signup.passwordText")}
                    onChangeHandle={handleChange}
                    onBlurHandle={handleBlur}
                    value={values.password}
                  />
                  <p className="errorField">
                    {t(errors.password) &&
                      touched.password &&
                      t(errors.password)}
                  </p>
                </Col>
              )}

              {filterFields.includes("confirm_password") && (
                <Col lg={6} md={6} className="mb-2">
                  <div
                    className="d-flex justify-content-between"
                    style={{ marginBottom: "-2px" }}
                  >
                    <div>{t("signup.confirmPasswordText")}</div>
                    {user === null && <div>*</div>}
                  </div>
                  <InputField
                    className="py-3 px-4"
                    type="password"
                    // placeholder={t("signup.confirmPasswordText")}
                    name="confirm_password"
                    onChangeHandle={handleChange}
                    onBlurHandle={handleBlur}
                    value={values.confirm_password}
                  />
                  <p className="errorField">
                    {t(errors.confirm_password) &&
                      touched.confirm_password &&
                      t(errors.confirm_password)}
                  </p>
                </Col>
              )}

              {filterFields.includes("phone_number") && (
                <Col lg={6} md={6} className="mb-2">
                  <div
                    className="d-flex justify-content-between"
                    style={{ marginBottom: "-2px" }}
                  >
                    <div>{t("signup.phoneNumberText")}</div>
                    {user === null && <div>*</div>}
                  </div>
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
                    disabled={user ? true : false}
                  />
                  <p className="errorField">
                    {t(errors.phone_number) &&
                      touched.phone_number &&
                      t(errors.phone_number)}
                  </p>
                </Col>
              )}

              {filterFields.includes("gender") && (
                <Col md={6} lg={6} className="mb-2">
                  <div
                    className="d-flex justify-content-between"
                    style={{ marginBottom: "-2px" }}
                  >
                    <div>{t("signup.genderText")}</div>
                    {user === null && <div>*</div>}
                  </div>
                  <div className="d-flex genderBtn align-items-center justify-content-between gap-2">
                    <div
                      className={`d-flex align-items-center justify-content-between form-control-lg w-100 py-3 customDropdownRadius border  bg-white ${
                        values.gender === "Male" ? "selected" : ""
                      }`}
                      onClick={() => {
                        if (!user) {
                          setFieldValue("gender", "Male");
                        }
                      }}
                    >
                      <h6 className="mb-0 font14"> {t("signup.maleText")}</h6>
                      <FaMars />
                    </div>
                    <div
                      className={`d-flex align-items-center justify-content-between form-control-lg py-3 customDropdownRadius border w-100  bg-white ${
                        values.gender === "Female" ? "selected" : ""
                      }`}
                      onClick={() => {
                        if (!user) {
                          setFieldValue("gender", "Female");
                        }
                      }}
                    >
                      <h6 className="mb-0 font14">{t("signup.femaleText")}</h6>
                      <FaVenus />
                    </div>
                  </div>
                  <p className="errorField">
                    {t(errors.gender) && touched.gender && t(errors.gender)}
                  </p>
                </Col>
              )}

              {filterFields.includes("date_of_birth") && (
                <Col md={6} lg={6} className="mb-2">
                  <div
                    className="d-flex justify-content-between"
                    style={{ marginBottom: "-2px" }}
                  >
                    <div>{t("signup.dobText")}</div>
                    {user === null && <div>*</div>}
                  </div>
                  <InputGroup className="ltr">
                    <InputGroupText
                      style={{
                        borderTopLeftRadius: "14px",
                        borderBottomLeftRadius: "14px",
                      }}
                    >
                      <FaBirthdayCake />
                    </InputGroupText>
                    <Input
                      type="date"
                      style={{
                        fontSize: "14px",
                        paddingTop: "16px",
                        paddingBottom: "16px",
                        backgroundColor: "white",
                        color: "black",
                        borderTopRightRadius: "14px",
                        borderBottomRightRadius: "14px",
                      }}
                      name="date_of_birth"
                      className="form-control-lg px-4"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.date_of_birth}
                    />
                  </InputGroup>
                  <p className="errorField">
                    {t(errors.date_of_birth) &&
                      touched.date_of_birth &&
                      t(errors.date_of_birth)}
                  </p>
                </Col>
              )}

              {filterFields.includes("experience") && (
                <Col lg={6} md={6} className="mb-2">
                  <div
                    className="d-flex justify-content-between"
                    style={{ marginBottom: "-2px" }}
                  >
                    <div>{t("signup.yearOfExperienceText")}</div>
                    {user === null && <div>*</div>}
                  </div>
                  <InputField
                    className="py-3 px-4"
                    type="number"
                    placeholder={t("signup.yearOfExperienceText")}
                    name="experience"
                    onWheel={(event) => event.currentTarget.blur()}
                    onChangeHandle={handleChange}
                    onBlurHandle={handleBlur}
                    value={values.experience}
                  />

                  <p className="errorField">
                    {t(errors.experience) &&
                      touched.experience &&
                      t(errors.experience)}
                  </p>
                </Col>
              )}

              {filterFields.includes("role") && (
                <Col md={6}>
                  <Row className="training">
                    <Col md={12} className="mb-2">
                      <div
                        className="d-flex justify-content-between"
                        style={{ marginBottom: "-2px" }}
                      >
                        <div>{t("signup.roleText")}</div>
                        {user === null && <div>*</div>}
                      </div>
                      <MyDropdown
                        className="shadow-0 p-2 border"
                        Options={
                          i18n.dir() === "ltr" ? roleOptions : roleOptionsArabic
                        }
                        name={"role"}
                        placeholder={t("signup.whatYouWillProvideText")}
                        onChangeHandle={handleChange}
                        onBlurHandle={handleBlur}
                        value={values.role}
                      />
                      <p className="errorField">
                        {t(errors.role) && touched.role && t(errors.role)}
                      </p>
                    </Col>
                  </Row>
                </Col>
              )}

              {filterFields.includes("bio") && (
                <Col md={6} lg={6} className="mb-2">
                  <div
                    className="d-flex justify-content-between"
                    style={{ marginBottom: "-2px" }}
                  >
                    <div>{t("signup.addBioText")}</div>
                    {user === null && <div>*</div>}
                  </div>
                  <InputField
                    className="py-3 px-4"
                    type="textarea"
                    style={{ minHeight: "115px" }}
                    // placeholder={t("signup.addBioText")}
                    name="bio"
                    onChangeHandle={handleChange}
                    onBlurHandle={handleBlur}
                    value={values.bio}
                  />
                  <p className="errorField">
                    {t(errors.bio) && touched.bio && t(errors.bio)}
                  </p>
                </Col>
              )}
            </Row>

            <Row className="mb-3">
              {filterFields.includes("body_images") && (
                <>
                  <Col md={12}>
                    <h6 className="fw-bold">{t("signup.inBodyText")}</h6>
                  </Col>
                  <Col>
                    <div className="form-group multi-preview d-flex flex-wrap align-items-center">
                      {user !== null && (
                        <>
                          {user?.body_images && showPreviousImg && (
                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 mx-2 position-relative BorderRadius border">
                              <img
                                src={user?.body_images}
                                alt="body_images"
                                className="uploaded-image BorderRadius"
                                style={{
                                  width: "100%",
                                  height: "170px",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                }}
                              />
                              <button
                                type="button"
                                className="deleteButton"
                                onClick={() => {
                                  setShowPreviousImg(false);
                                }}
                              >
                                <RxCross2 size={15} color="red" />
                              </button>
                            </div>
                          )}
                          {(user?.body_images === null || !showPreviousImg) && (
                            <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 mx-2 position-relative BorderRadius border">
                              <Label
                                id="UploadImgLabel"
                                className="mb-0"
                                style={{
                                  minWidth: "100%",
                                  maxHeight: "170px",
                                }}
                              >
                                <img
                                  src={
                                    values?.body_images
                                      ? URL.createObjectURL(values?.body_images)
                                      : Images.UPLOAD_ICON
                                  }
                                  alt=""
                                  style={{
                                    width: "100%",
                                    height: "170px",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                  }}
                                  className="borderRadius"
                                />
                                <input
                                  id="body_images"
                                  type="file"
                                  accept=".png, .jpg, .jpeg"
                                  onChange={(event) => {
                                    event.stopPropagation();

                                    const selectedFile =
                                      event.currentTarget.files[0];
                                    setFieldValue("body_images", selectedFile);
                                  }}
                                  style={{
                                    display: "none",
                                    width: "100%",
                                    height: "170px",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                  }}
                                />
                              </Label>
                            </div>
                          )}
                        </>
                      )}
                      {user === null && (
                        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 mx-2 position-relative BorderRadius border">
                          <Label
                            id="UploadImgLabel"
                            className="mb-0"
                            style={{
                              minWidth: "100%",
                              maxHeight: "170px",
                            }}
                          >
                            <img
                              src={
                                values?.body_images
                                  ? URL.createObjectURL(values?.body_images)
                                  : Images.UPLOAD_ICON
                              }
                              alt=""
                              style={{
                                width: "100%",
                                height: "170px",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                              className="BorderRadius"
                            />
                            <input
                              id="body_images"
                              type="file"
                              accept=".png, .jpg, .jpeg"
                              onChange={(event) => {
                                event.stopPropagation();

                                const selectedFile =
                                  event.currentTarget.files[0];
                                setFieldValue("body_images", selectedFile);
                              }}
                              style={{
                                display: "none",
                                width: "100%",
                                height: "170px",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            />
                          </Label>
                        </div>
                      )}
                    </div>
                    <p className="errorField">
                      {t(errors.body_images) &&
                        touched.body_images &&
                        t(errors.body_images)}
                    </p>
                  </Col>
                </>
              )}

              {roleType !== TRAINEE_TYPE && (
                <div className="editRequestWrapper py-2">
                  {user &&
                    user?.role !== TRAINEE_ROLE &&
                    user?.ServiceProvider_Certification && (
                      <Row className="mb-4">
                        <Col md={6}>
                          <h6 className="fw-bold">
                            {t("signup.certificatesText")}
                            {user === null && "*"}
                          </h6>
                        </Col>
                        <Col
                          md={6}
                          className={`${
                            i18n.dir() === "ltr" ? "text-end" : "text-start"
                          }`}
                        >
                          {user && user?.change_request_status !== "Pending" && (
                            <div
                              className="cursorPointer"
                              onClick={() => setShowEditProfileModal(true)}
                            >
                              {t("trainer.editText")} <FaEdit />
                            </div>
                          )}
                        </Col>
                        {user?.ServiceProvider_Certification?.map(
                          (certificate, index) => (
                            <DocumentCard
                              index={index}
                              key={index}
                              className="BorderYellow"
                              documentTitle={certificate?.title}
                              documentImg={certificate?.certificate_image}
                            />
                          )
                        )}
                      </Row>
                    )}

                  {filterFields.includes("certification") && (
                    <>
                      <Col md={12}>
                        <h6 className="fw-bold">
                          {t("signup.attachCertificateText")}{" "}
                          {user === null && "*"}
                        </h6>
                      </Col>
                      <Col className="mb-2">
                        <div className="form-group multi-preview d-flex flex-wrap align-items-center">
                          {values.certification.map((image, index) => (
                            <div
                              key={index}
                              className="col-sm-12 col-md-3 col-lg-2 col-xl-2 mx-3 position-relative BorderRadius mb-2 "
                            >
                              <Field
                                name={`certificate_title.${index}`}
                                type="text"
                                className="form-control-lg certificationTitle bgBlur"
                                style={{ width: "100%" }}
                                placeholder={t("signup.addTitleText")}
                              />
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`${index + 1}`}
                                className=" BorderRadius bgProperties"
                                style={{
                                  width: "100%",
                                  height: "170px",
                                }}
                              />
                              <button
                                type="button"
                                className="deleteButton"
                                onClick={() => {
                                  const updatedImages = [
                                    ...values.certification,
                                  ];
                                  updatedImages.splice(index, 1);
                                  setFieldValue("certification", updatedImages);

                                  const updatedCertificateTitles = [
                                    ...values.certificate_title,
                                  ];
                                  updatedCertificateTitles.splice(index, 1);
                                  setFieldValue(
                                    "certificate_title",
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
                            className="BorderRadius text-center mb-0 mx-3"
                            style={{
                              width: "186px",
                              height: "170px",
                            }}
                          >
                            <img src={Images.UPLOAD_ICON} alt="" />
                            <input
                              className=""
                              id="file-upload"
                              type="file"
                              accept=".png, .jpg, .jpeg"
                              onChange={(event) => {
                                const files = event.currentTarget.files;
                                if (files.length > 0) {
                                  const uploadedImages = Array.from(files);
                                  setFieldValue("certification", [
                                    ...values.certification,
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
                      <p className="errorField">
                        {t(errors.certification) &&
                          touched.certification &&
                          t(errors.certification)}
                      </p>
                      <p className="errorField">
                        {t(errors.certificate_title) &&
                          touched.certificate_title &&
                          t(errors.certificate_title)}
                      </p>
                    </>
                  )}

                  <Row>
                    {filterFields.includes("saudireps_number") && (
                      <Col md={6}>
                        <Row>
                          <Col md={10} sm={9} xs={9}>
                            <h6 className="mb-2 fw-bold mt-2">
                              {t("signup.saudiRepsNumberText")}
                            </h6>
                          </Col>
                          <Col
                            md={2}
                            sm={3}
                            xs={3}
                            className={`${
                              i18n.dir() === "ltr" ? "text-end" : "text-start"
                            }`}
                          >
                            {user && user?.change_request_status !== "Pending" && (
                              <div
                                className="cursorPointer"
                                onClick={() => setShowEditProfileModal(true)}
                              >
                                {t("trainer.editText")} <FaEdit />
                              </div>
                            )}
                          </Col>
                        </Row>
                        <InputField
                          className="py-3 px-4"
                          type="number"
                          // placeholder={t("signup.saudiRepsNumberText")}
                          name="saudireps_number"
                          onChangeHandle={handleChange}
                          onBlurHandle={handleBlur}
                          value={values.saudireps_number}
                          disabled={user ? true : false}
                        />
                        <p className="errorField">
                          {t(errors.saudireps_number) &&
                            touched.saudireps_number &&
                            t(errors.saudireps_number)}
                        </p>
                      </Col>
                    )}

                    {filterFields.includes("license_number") && (
                      <Col md={6}>
                        <Row>
                          <Col md={10} sm={9} xs={9}>
                            <h6 className="mb-2 fw-bold mt-2">
                              {t("signup.enterYourProfessionalText")}
                            </h6>
                          </Col>
                          <Col
                            md={2}
                            sm={3}
                            xs={3}
                            className={`${
                              i18n.dir() === "ltr" ? "text-end" : "text-start"
                            }`}
                          >
                            {user && user?.change_request_status !== "Pending" && (
                              <div
                                className="cursorPointer"
                                onClick={() => setShowEditProfileModal(true)}
                              >
                                {t("trainer.editText")} <FaEdit />
                              </div>
                            )}
                          </Col>
                        </Row>
                        <InputField
                          className="py-3 px-4"
                          type="number"
                          // placeholder={t("signup.enterYourProfessionalText")}
                          name="license_number"
                          onChangeHandle={handleChange}
                          onBlurHandle={handleBlur}
                          value={values.license_number}
                          disabled={user ? true : false}
                        />
                        <p className="errorField">
                          {t(errors.license_number) &&
                            touched.license_number &&
                            t(errors.license_number)}
                        </p>
                      </Col>
                    )}

                    {filterFields.includes("stc_pay") && (
                      <Col lg={6} md={6}>
                        <Row>
                          <Col md={10} sm={9} xs={9}>
                            <h6 className="mb-2 fw-bold mt-2">
                              {t("signup.enterStcPayAccountText")}{" "}
                              {user === null && "*"}
                            </h6>
                          </Col>
                          <Col
                            md={2}
                            sm={3}
                            xs={3}
                            className={`${
                              i18n.dir() === "ltr" ? "text-end" : "text-start"
                            }`}
                          >
                            {user && user?.change_request_status !== "Pending" && (
                              <div
                                className="cursorPointer"
                                onClick={() => setShowEditProfileModal(true)}
                              >
                                {t("trainer.editText")} <FaEdit />
                              </div>
                            )}
                          </Col>
                        </Row>
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
                          disabled={user ? true : false}
                        />
                        <p className="errorField">
                          {t(errors.stc_pay) &&
                            touched.stc_pay &&
                            t(errors.stc_pay)}
                        </p>
                      </Col>
                    )}
                  </Row>

                  {user && user?.change_request_status === "Pending" && (
                    <p className="mt-2 fw-bold">
                      {t("signup.profileUnderReviewText")}{" "}
                      <span>
                        <a href="mailto:info@fitnee.fit">info@fitnee.fit</a>
                      </span>
                    </p>
                  )}
                </div>
              )}
            </Row>

            <Row className="mb-3">
              {filterFields.includes("weight") && (
                <>
                  <Col md={12} className="mb-3">
                    <h6 className="fw-bold mt-2">
                      {t("signup.bodyInformationText")}
                    </h6>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div
                      className="d-flex justify-content-between"
                      style={{ marginBottom: "-2px" }}
                    >
                      <div>{t("signup.weightText")}</div>
                    </div>
                    <InputField
                      className="py-3 px-4"
                      type="number"
                      // placeholder={t("signup.weightText")}
                      name="weight"
                      onChangeHandle={handleChange}
                      onBlurHandle={handleBlur}
                      value={values.weight}
                    />
                  </Col>
                </>
              )}

              {filterFields.includes("height") && (
                <Col md={6} className="mb-3">
                  <div
                    className="d-flex justify-content-between"
                    style={{ marginBottom: "-2px" }}
                  >
                    <div>{t("signup.heightText")}</div>
                  </div>
                  <InputField
                    className="py-3 px-4"
                    type="number"
                    // placeholder={t("signup.heightText")}
                    name="height"
                    onChangeHandle={handleChange}
                    onBlurHandle={handleBlur}
                    value={values.height}
                  />
                </Col>
              )}

              {filterFields.includes("skeletal_muscel_mass") && (
                <Col md={6} className="mb-3">
                  <div
                    className="d-flex justify-content-between"
                    style={{ marginBottom: "-2px" }}
                  >
                    <div>{t("signup.skeletonMuscleText")}</div>
                  </div>
                  <InputField
                    className="py-3 px-4"
                    type="number"
                    // placeholder={t("signup.skeletonMuscleText")}
                    name="skeletal_muscel_mass"
                    onChangeHandle={handleChange}
                    onBlurHandle={handleBlur}
                    value={values.skeletal_muscel_mass}
                  />
                </Col>
              )}

              {filterFields.includes("body_fat_mass") && (
                <Col md={6} className="mb-3">
                  <div
                    className="d-flex justify-content-between"
                    style={{ marginBottom: "-2px" }}
                  >
                    <div>{t("signup.bodyFatText")}</div>
                  </div>
                  <InputField
                    className="py-3 px-4"
                    type="number"
                    // placeholder={t("signup.bodyFatText")}
                    name="body_fat_mass"
                    onChangeHandle={handleChange}
                    onBlurHandle={handleBlur}
                    value={values.body_fat_mass}
                  />
                </Col>
              )}

              {filterFields.includes("total_body_water") && (
                <Col md={6} className="mb-3">
                  <div
                    className="d-flex justify-content-between"
                    style={{ marginBottom: "-2px" }}
                  >
                    <div>{t("signup.totalBodyText")}</div>
                  </div>
                  <InputField
                    className="py-3 px-4"
                    type="number"
                    // placeholder={t("signup.totalBodyText")}
                    name="total_body_water"
                    onChangeHandle={handleChange}
                    onBlurHandle={handleBlur}
                    value={values.total_body_water}
                  />
                </Col>
              )}

              {filterFields.includes("protien") && (
                <Col md={6} className="mb-3">
                  <div
                    className="d-flex justify-content-between"
                    style={{ marginBottom: "-2px" }}
                  >
                    <div>{t("signup.protienText")}</div>
                  </div>
                  <InputField
                    className="py-3 px-4"
                    type="number"
                    // placeholder={t("signup.protienText")}
                    name="protien"
                    onChangeHandle={handleChange}
                    onBlurHandle={handleBlur}
                    value={values.protien}
                  />
                </Col>
              )}
            </Row>

            <Row className="mb-2">
              {filterFields.includes("specialities") &&
                specialityOptions.length > 0 && (
                  <>
                    <Col md={12}>
                      <div className="form-group">
                        <h6 className="mb-2 fw-bold">
                          {t("signup.selectAreaOfSpecialtyText")}
                          {user === null && "*"}
                        </h6>
                        <Field
                          name="specialities"
                          component={MultiSelector}
                          options={specialityOptions}
                          placeholder={t("signup.selectText")}
                          className="border-0 customMultiSelector"
                        />
                      </div>
                    </Col>
                    <p className="errorField">
                      {t(errors.specialities) &&
                        touched.specialities &&
                        t(errors.specialities)}
                    </p>
                  </>
                )}
            </Row>

            <Row className="mb-3">
              {filterFields.includes("goal") && (
                <Col md={6} className="mb-2">
                  <h6 className="fw-bold">{t("signup.myGoalText")}</h6>
                  <InputField
                    className="py-3 px-4"
                    type="text"
                    placeholder={t("signup.looseWeightText")}
                    name="goal"
                    onChangeHandle={handleChange}
                    onBlurHandle={handleBlur}
                    value={values.goal}
                  />
                </Col>
              )}

              {filterFields.includes("training_goal") && (
                <Col md={6} className="mb-2">
                  <h6 className="mb-2 fw-bold">
                    {t("signup.trainingGoalText")}
                  </h6>
                  <Row className="training">
                    <Col md={12} className="mb-2">
                      <MyDropdown
                        className=" shadow-0 p-2 border"
                        Options={trainingGoalOptions}
                        name={"training_goal"}
                        placeholder={t("signup.selectTrainingGoalText")}
                        onChangeHandle={handleChange}
                        onBlurHandle={handleBlur}
                        value={values.training_goal}
                      />
                    </Col>
                  </Row>
                </Col>
              )}

              {filterFields.includes("food_sensitive") && (
                <Col md={6} className="mb-2">
                  <h6 className="mb-2 fw-bold">
                    {t("signup.anyFoodSensitiveText")}
                  </h6>
                  <InputField
                    className="py-3 px-4"
                    type="text"
                    name="food_sensitive"
                    onChangeHandle={handleChange}
                    onBlurHandle={handleBlur}
                    value={values.food_sensitive}
                  />
                </Col>
              )}

              {filterFields.includes("level") && (
                <Col md={6} className="mb-2">
                  <h6 className="mb-2 fw-bold">
                    {t("signup.activityLevelText")}
                  </h6>
                  <Row className="activity">
                    <Col md={12} className="mb-2">
                      <MyDropdown
                        className=" shadow-0 border p-2"
                        Options={levelOptions}
                        name={"level"}
                        placeholder={t("signup.selectLevelText")}
                        onChangeHandle={handleChange}
                        onBlurHandle={handleBlur}
                        value={values.level}
                      />
                    </Col>
                  </Row>
                </Col>
              )}

              {filterFields.includes("injury_details") && (
                <Col lg={6} md={6} className="mb-2">
                  <h6 className="mb-2 fw-bold">{t("signup.anyInjuryText")}</h6>
                  <Row className="p-0">
                    <Col md={12} className="mb-2">
                      <InputField
                        className="py-3 px-4"
                        type="textarea"
                        style={{ minHeight: "20px" }}
                        placeholder={t("signup.describeInjuryText")}
                        name="injury_details"
                        onChangeHandle={handleChange}
                        onBlurHandle={handleBlur}
                        value={values.injury_details}
                      />
                    </Col>
                  </Row>
                </Col>
              )}
            </Row>

            <Row>
              {filterFields.includes("profile_availability") && (
                <Col lg={12} md={12}>
                  <h6 className="mb-2 fw-bold">
                    {`${t("signup.availableToRespondTraineeText")} ${
                      user === null ? "*" : ""
                    }`}
                  </h6>
                  <FieldArray
                    name="profile_availability"
                    className="d-flex"
                    render={(arrayHelpers) => (
                      <>
                        {values.profile_availability.map(
                          (daySchedule, index) => (
                            <Row key={index} className="mb-1">
                              <Col lg={5} md={5} className="mb-2">
                                <div className="d-flex align-items-center justify-content-between">
                                  <p className="mb-0">{t("signup.dayText")}</p>
                                  <FaCircleXmark
                                    className="cursorPointer d-md-none d-flex"
                                    size={22}
                                    onClick={() => arrayHelpers.remove(index)}
                                  />
                                </div>
                                <MyDropdown
                                  className="shadow-0 p-2 border"
                                  Options={
                                    i18n.dir() === "ltr"
                                      ? weekDaysOptions
                                      : weekDaysOptionsArabic
                                  }
                                  name={`profile_availability.${index}.day`}
                                  placeholder={t("signup.selectText")}
                                  onChangeHandle={handleChange}
                                  onBlurHandle={handleBlur}
                                  value={
                                    values.profile_availability?.[index].day
                                  }
                                />
                                <p className="errorField">
                                  {t(
                                    errors.profile_availability?.[index]?.day
                                  ) &&
                                    touched.profile_availability?.[index]
                                      ?.day &&
                                    t(
                                      errors.profile_availability?.[index]?.day
                                    )}
                                </p>
                              </Col>
                              <Col md={3} className="mb-2">
                                <p className="mb-0">
                                  {t("signup.fromTimeText")}
                                </p>
                                <InputField
                                  className="py-3 px-4"
                                  type="time"
                                  placeholder="awdawdaw"
                                  name={`profile_availability.${index}.starttime`}
                                  onChangeHandle={handleChange}
                                  onBlurHandle={handleBlur}
                                  value={
                                    values.profile_availability?.[index]
                                      .starttime
                                  }
                                />
                                <p className="errorField">
                                  {t(
                                    errors.profile_availability?.[index]
                                      ?.starttime
                                  ) &&
                                    touched.profile_availability?.[index]
                                      ?.starttime &&
                                    t(
                                      errors.profile_availability?.[index]
                                        ?.starttime
                                    )}
                                </p>
                              </Col>
                              <Col md={3} className="mb-2">
                                <p className="mb-0">{t("signup.toTimeText")}</p>
                                <InputField
                                  className="py-3 px-4"
                                  type="time"
                                  name={`profile_availability.${index}.endtime`}
                                  onChangeHandle={handleChange}
                                  onBlurHandle={handleBlur}
                                  value={
                                    values.profile_availability?.[index].endtime
                                  }
                                />
                                <p className="errorField">
                                  {t(
                                    errors.profile_availability?.[index]
                                      ?.endtime
                                  ) &&
                                    touched.profile_availability?.[index]
                                      ?.endtime &&
                                    t(
                                      errors.profile_availability?.[index]
                                        ?.endtime
                                    )}
                                </p>
                              </Col>
                              {index > 0 && (
                                <Col md={1} className="mb-2">
                                  <div className="d-none d-md-flex align-items-center justify-content-end h-100">
                                    <FaCircleXmark
                                      className="cursorPointer"
                                      size={22}
                                      onClick={() => arrayHelpers.remove(index)}
                                    />
                                  </div>
                                </Col>
                              )}
                            </Row>
                          )
                        )}
                        {values.profile_availability.length < 7 && (
                          <span
                            className="textYellow fs-6 cursorPointer"
                            onClick={() =>
                              arrayHelpers.push({
                                day: "",
                                starttime: "",
                                endtime: "",
                              })
                            }
                          >
                            {t("signup.addMoreText")}
                          </span>
                        )}
                      </>
                    )}
                  />
                </Col>
              )}
            </Row>

            <Row className="my-3">
              {filterFields.includes("subscription_plans") && (
                <>
                  <h5 className="mb-2 fw-bold">
                    {t("signup.subscriptionPlansText")}*
                  </h5>
                  <FieldArray
                    name="subscription_plans"
                    className="d-flex"
                    render={(arrayHelpers) => (
                      <>
                        {values?.subscription_plans?.map(
                          (subscription_plan, index) => (
                            <Col md={4} key={index}>
                              <p className="mb-0">
                                {index + 1 === 1
                                  ? t("trainerPackages.monthText")
                                  : index + 1 === 2
                                  ? t("trainerPackages.twoMonthText")
                                  : t("trainerPackages.threeMonthText")}
                              </p>
                              <Field
                                name={`subscription_plans.${index}.price`}
                                type="number"
                                min={1}
                                step={"any"}
                                className="customDropdownRadius form-control select-field py-3 px-4 border"
                              />
                              <p className="errorField">
                                {t(errors.subscription_plans?.[index]?.price) &&
                                  touched.subscription_plans?.[index]?.price &&
                                  t(errors.subscription_plans?.[index]?.price)}
                              </p>
                            </Col>
                          )
                        )}
                      </>
                    )}
                  />
                </>
              )}
            </Row>

            {filterFields.includes("is_currently_working") && (
              <Row className="mb-3">
                <h6 className="mb-2 fw-bold">
                  {" "}
                  {t("signup.areYouCurrentlyWorkingText")}
                </h6>
                <Col md={6} className="mb-2">
                  <div className="d-flex currentlyWorkingBtn align-items-center justify-content-between gap-2">
                    <div
                      className={`d-flex align-items-center py-3 justify-content-between form-control-lg border customDropdownRadius w-100  bg-white ${
                        values.is_currently_working === true ? "selected" : ""
                      }`}
                      onClick={() =>
                        setFieldValue("is_currently_working", true)
                      }
                    >
                      <h6 className="mb-0 font14"> {t("signup.yesText")}</h6>
                    </div>
                    <div
                      className={`d-flex align-items-center py-3 justify-content-between form-control-lg border customDropdownRadius w-100  bg-white ${
                        values.is_currently_working === false ? "selected" : ""
                      }`}
                      onClick={() =>
                        setFieldValue("is_currently_working", false)
                      }
                    >
                      <h6 className="mb-0 font14"> {t("signup.noText")}</h6>
                    </div>
                  </div>
                  <p className="errorField">
                    {t(errors.is_currently_working) &&
                      touched.is_currently_working &&
                      t(errors.is_currently_working)}
                  </p>
                </Col>
              </Row>
            )}

            {filterFields.includes("term_and_condition") && (
              <Row>
                <div className="d-flex mb-2">
                  <Checkbox
                    label={
                      roleType !== TRAINEE_TYPE ? (
                        <p className="mb-0 fs-6 px-2">
                          {t("signup.moneyTransferText")}{" "}
                          <Link
                            target="blank"
                            to={`/termAndCondition/serviceProvider/signUp`}
                          >
                            <span className="text-dark fw-bolder">
                              {t("signup.termsAndConditionText")}
                            </span>
                          </Link>
                          <span> & </span>
                          <Link
                            target="blank"
                            to={`/termAndCondition/general/signUp`}
                          >
                            <span className="text-dark fw-bolder">
                              {t("signup.generalText")}
                            </span>
                          </Link>
                        </p>
                      ) : (
                        <p className="mb-0 fs-6 px-2">
                          {t("signup.acknowledgeText")}{" "}
                          <Link
                            target="blank"
                            to={`/termAndCondition/trainee/signUp`}
                          >
                            <span className="text-dark fw-bolder">
                              {t("signup.termsAndConditionText")}
                            </span>
                          </Link>
                          <span> & </span>
                          <Link
                            target="blank"
                            to={`/termAndCondition/general/signUp`}
                          >
                            <span className="text-dark fw-bolder">
                              {t("signup.generalText")}
                            </span>
                          </Link>
                        </p>
                      )
                    }
                    name={"term_and_condition"}
                    onChangeHandle={handleChange}
                    onBlurHandle={handleBlur}
                    checked={values.term_and_condition}
                  />
                </div>
                <p className="errorField">
                  {t(errors.term_and_condition) &&
                    touched.term_and_condition &&
                    t(errors.term_and_condition)}
                </p>
              </Row>
            )}

            <Row className="mb-5 pb-2">
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
      <InformationModal
        size={"md"}
        TOneClassName={"mb-2 fs-5 text-center"}
        className={"p-4"}
        isOpen={showEditProfileRequestSentModal}
        onClose={handleEditProfileRequestSentModalClose}
        ModalTextOne={t("messages.adminReviewFirstText")}
        ButtonOne={
          <FillBtn
            text={t("otpVerification.okayText")}
            className="py-2 px-5"
            handleOnClick={() => {
              handleEditProfileRequestSentModalClose();
              navigate("/");
            }}
          />
        }
      />
      <EditProfileRequestModal
        heading={t("signup.editRequestText")}
        size={"lg"}
        isOpen={showEditProfileModal}
        onClose={useCallback(() => {
          setShowEditProfileModal(false);
        }, [])}
        setShowEditProfileRequestSentModal={setShowEditProfileRequestSentModal}
      />
    </Container>
  );
};

export default memo(SignUpForm);
