import * as Yup from "yup";

const firstNameValidation = Yup.string()
  // .matches(/^[A-Za-z ]+$/, "validation.invalidFirstNameText")
  .min(2, "validation.tooShortText")
  .max(50, "validation.tooLongText")

  .required("validation.requiredFirstNameText");

const fullNameValidation = Yup.string()
  // .matches(/^[A-Za-z ]+$/, "validation.invalidFullNameText")
  .min(2, "validation.tooShortText")
  .max(50, "validation.tooLongText")
  .required("validation.requiredFullNameText");

const lastNameValidation = Yup.string()
  // .matches(/^[A-Za-z ]+$/, "validation.invalidLastNameText")
  .min(2, "validation.tooShortText")
  .max(50, "validation.tooLongText")
  .required("validation.requiredLastNameText");

const emailValidation = Yup.string()
  .matches(
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    "validation.invalidEmailText"
  )
  .required("validation.requiredEmailText");

const currentPasswordValidation = Yup.string()
  .min(8, "validation.invalidText")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/,
    "validation.invalidText"
  )
  .required("validation.requiredPreviousPasswordText");

const newPasswordValidation = Yup.string()
  .min(8, "validation.requiredPasswordText")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/,
    "validation.invalidPasswordTwoText"
  )
  .required("validation.requiredPasswordText");

const certificationValidation = Yup.array()
  .min(1, "validation.requiredMinimumCertificateText")
  .test(
    "certificatesRequired",
    "validation.requiredCertificateText",
    (value) => {
      return value && value.every((file) => file);
    }
  )
  .test(
    "certificateFormat",
    "validation.invalidFileCertificateText",
    (value) => {
      return (
        value &&
        value.every((file) =>
          ["image/png", "image/jpeg", "image/jpg"].includes(file.type)
        )
      );
    }
  )
  .test("certificateSize", "validation.limitCertificateText", (value) => {
    return value && value.every((file) => file.size <= 5 * 1024 * 1024);
  });

const certificateTitleValidation = Yup.array().test(
  "certificateTitleLength",
  "validation.requiredCertificateTitleText",
  function (value) {
    const { certification } = this.parent;

    if (!certification || certification.length !== value.length) {
      return false;
    }

    return true;
  }
);

const editProfilecertificateTitleValidation = Yup.array().test(
  "certificateTitleLength",
  "validation.requiredCertificateTitleText",
  function (value) {
    const { certificate_files } = this.parent;

    if (!certificate_files || certificate_files.length !== value.length) {
      return false;
    }

    return true;
  }
);

const confirmNewPasswordValidation = Yup.string()
  .oneOf(
    [Yup.ref("new_password"), null],
    "validation.invalidConfirmPasswordText"
  )
  .required("validation.requiredConfirmPasswordText");

const passwordValidation = Yup.string()
  .min(8, "validation.invalidPasswordText")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/,
    "validation.invalidPasswordTwoText"
  )
  .required("validation.requiredPasswordText");

const confirmPasswordValidation = Yup.string()
  .oneOf([Yup.ref("password"), null], "validation.invalidConfirmPasswordText")
  .required("validation.requiredConfirmPasswordText");

const profilePicValidation = Yup.mixed()
  .nullable()
  .test("certificateSize", "validation.limitCertificateText", (value) => {
    if (value) {
      return value && value.size <= 5 * 1024 * 1024;
    } else {
      return true;
    }
  })
  .test(
    "certificateFormat",
    "validation.invalidFileCertificateText",
    (value) => {
      if (value) {
        return (
          value && ["image/png", "image/jpeg", "image/jpg"].includes(value.type)
        );
      } else {
        return true;
      }
    }
  );

const bioValidation = Yup.string()
  .required("validation.requiredBioText")
  .max(1000, "validation.tooLongText");

const roleValidation = Yup.string().required("validation.requiredText");

const specialitiesValidation = Yup.array().min(1, "validation.requiredText");

const phoneNumberValidaton = Yup.string().required(
  "validation.requiredContactText"
);

const dobValidation = Yup.date()
  .max(new Date(), "Date of Birth cannot be in the future")
  .required("validation.requiredDOBText");

const genderValidation = Yup.string().required("validation.requiredGenderText");

const experienceValidation = Yup.number()
  .required("validation.requiredYearsOfExperienceText")
  .max(100, "validation.invalidText");

const requiredValidation = Yup.string().required("validation.requiredText");

const profileAvailabilityValidation = Yup.array().of(
  Yup.object().shape({
    day: Yup.string().required("validation.requiredDayText"),
    starttime: Yup.string().required("validation.requiredFromDayText"),
    endtime: Yup.string()
      .required("validation.requiredToDayText")
      .test("is-greater", "validation.invalidEndTimeText", function (endtime) {
        const { starttime } = this.parent;
        return starttime && endtime && starttime < endtime;
      }),
  })
);

const editProfileAvailabilityValidation = Yup.array().of(
  Yup.object().shape({
    day: Yup.string().required("validation.requiredDayText"),
    starttime: Yup.string().required("validation.requiredFromDayText"),
    endtime: Yup.string()
      .required("validation.requiredToDayText")
      .test("is-greater", "validation.invalidEndTimeText", function (endtime) {
        const { starttime } = this.parent;
        return starttime && endtime && starttime < endtime;
      }),
  })
);

const subscriptionPlanValidation = Yup.array().of(
  Yup.object().shape({
    price: Yup.string().required("validation.requiredText"),
  })
);

const termAndConditionCheckValidation = Yup.bool().oneOf(
  [true],
  "validation.requiredTermAndConditionCheck"
);

const exerciseTextValidation = Yup.array()
  .of(Yup.string().required("validation.requiredDescriptionText"))
  .min(1, "validation.invalidDescriptionText");

const exerciseVideoValidation = Yup.mixed().required(
  "validation.requiredExerciseVideoText"
);

const messageValidation = Yup.string()
  .min(5, "validation.tooShortText")
  .max(500, "validation.tooLongText")
  .required("validation.requiredMessageText");

export const SIGNIN_SCHEMA = Yup.object().shape({
  email: emailValidation,
  password: requiredValidation,
  termAndConditionCheck: termAndConditionCheckValidation,
});

export const TRAINEE_SIGNUP_SCHEMA = Yup.object().shape({
  email: emailValidation,
  gender: genderValidation,
  password: passwordValidation,
  date_of_birth: dobValidation,
  last_name: lastNameValidation,
  first_name: firstNameValidation,
  profile_pic: profilePicValidation,
  body_images: profilePicValidation,
  phone_number: phoneNumberValidaton,
  confirm_password: confirmPasswordValidation,
  term_and_condition: termAndConditionCheckValidation,
});

export const TRAINER_SIGNUP_SCHEMA = Yup.object().shape({
  bio: bioValidation,
  role: roleValidation,
  email: emailValidation,
  gender: genderValidation,
  password: passwordValidation,
  stc_pay: phoneNumberValidaton,
  full_name: fullNameValidation,
  experience: experienceValidation,
  profile_pic: profilePicValidation,
  phone_number: phoneNumberValidaton,
  specialities: specialitiesValidation,
  certification: certificationValidation,
  confirm_password: confirmPasswordValidation,
  certificate_title: certificateTitleValidation,
  subscription_plans: subscriptionPlanValidation,
  profile_availability: profileAvailabilityValidation,
  term_and_condition: termAndConditionCheckValidation,
});

export const NUTRITIONIST_SIGNUP_SCHEMA = Yup.object().shape({
  bio: bioValidation,
  email: emailValidation,
  gender: genderValidation,
  password: passwordValidation,
  stc_pay: phoneNumberValidaton,
  full_name: fullNameValidation,
  experience: experienceValidation,
  profile_pic: profilePicValidation,
  phone_number: phoneNumberValidaton,
  certification: certificationValidation,
  confirm_password: confirmPasswordValidation,
  certificate_title: certificateTitleValidation,
  subscription_plans: subscriptionPlanValidation,
  profile_availability: profileAvailabilityValidation,
  term_and_condition: termAndConditionCheckValidation,
});

export const TRAINER_NUTRITIONIST_SIGNUP_SCHEMA = Yup.object().shape({
  bio: bioValidation,
  email: emailValidation,
  gender: genderValidation,
  password: passwordValidation,
  stc_pay: phoneNumberValidaton,
  full_name: fullNameValidation,
  experience: experienceValidation,
  profile_pic: profilePicValidation,
  phone_number: phoneNumberValidaton,
  specialities: specialitiesValidation,
  certification: certificationValidation,
  confirm_password: confirmPasswordValidation,
  certificate_title: certificateTitleValidation,
  profile_availability: profileAvailabilityValidation,
  term_and_condition: termAndConditionCheckValidation,
});

export const TRAINEE_EDIT_PROFILE_SCHEMA = Yup.object().shape({
  email: Yup.string(),
  gender: Yup.string(),
  last_name: Yup.string(),
  first_name: Yup.string(),
  phone_number: Yup.string(),
  date_of_birth: Yup.string(),
  body_images: profilePicValidation,
  profile_pic: profilePicValidation,
});

export const TRAINER_EDIT_PROFILE_SCHEMA = Yup.object().shape({
  bio: Yup.string(),
  gender: Yup.string(),
  full_name: Yup.string(),
  experience: Yup.string(),
  saudireps_number: Yup.string(),
  profile_pic: profilePicValidation,
  is_currently_working: Yup.string(),
  profile_availability: editProfileAvailabilityValidation,
});

export const TRAINER_EDIT_PROFILE_REQUEST_SCHEMA = Yup.object().shape({
  certificates: editProfilecertificateTitleValidation,
  stc_pay: phoneNumberValidaton,
  certificate_files: Yup.mixed()
    .nullable()
    .test("certificateSize", "validation.limitCertificateText", (value) => {
      return value && value.every((file) => file.size <= 5 * 1024 * 1024);
    }),
});

export const NUTRITIONIST_EDIT_PROFILE_REQUEST_SCHEMA = Yup.object().shape({
  certificates: editProfilecertificateTitleValidation,
  stc_pay: phoneNumberValidaton,
  certificate_files: Yup.mixed()
    .nullable()
    .test("certificateSize", "validation.limitCertificateText", (value) => {
      return value && value.every((file) => file.size <= 5 * 1024 * 1024);
    }),
});

export const NUTRITIONIST_EDIT_PROFILE_SCHEMA = Yup.object().shape({
  bio: Yup.string(),
  gender: Yup.string(),
  full_name: Yup.string(),
  experience: Yup.string(),
  license_number: Yup.string(),
  profile_pic: profilePicValidation,
  is_currently_working: Yup.string(),
  profile_availability: editProfileAvailabilityValidation,
});

export const TRAINER_NUTRITIONIST_EDIT_PROFILE_SCHEMA = Yup.object().shape({
  bio: Yup.string(),
  gender: Yup.string(),
  full_name: Yup.string(),
  experience: Yup.string(),
  license_number: Yup.string(),
  saudireps_number: Yup.string(),
  profile_pic: profilePicValidation,
  is_currently_working: Yup.string(),
  profile_availability: editProfileAvailabilityValidation,
});

export const CHANGE_PASSWORD_SCHEMA = Yup.object().shape({
  new_password: newPasswordValidation,
  previous_password: currentPasswordValidation,
  confirm_password: confirmNewPasswordValidation,
});

export const FORGOT_PASSWORD_SCHEMA = Yup.object().shape({
  phone_number: phoneNumberValidaton,
});

export const NEW_PASSWORD_SCHEMA = Yup.object().shape({
  new_password: newPasswordValidation,
  confirm_password: confirmNewPasswordValidation,
});

export const PAYMENT_METHOD_DETAIL_SCHEMA = Yup.object().shape({
  city: requiredValidation,
  state: requiredValidation,
  entity: requiredValidation,
  country: requiredValidation,
  street1: requiredValidation,
  surname: requiredValidation,
  postcode: requiredValidation,
  givenName: requiredValidation,
});

export const ADD_CATEGORY_SCHEMA = Yup.object().shape({
  title: requiredValidation,
  title_ar: requiredValidation,
});

export const ADD_SUB_CATEGORY_SCHEMA = Yup.object().shape({
  title: requiredValidation,
  title_ar: requiredValidation,
});

export const ADD_EXERCISE_SCHEMA = Yup.object().shape({
  // title: requiredValidation,
  // title_ar: requiredValidation,
  exercise_videos: exerciseVideoValidation,
  // exercise_part_text: exerciseTextValidation,
  // exercise_part_text_ar: exerciseTextValidation,
});

export const ADD_PROMO_CODE_SCHEMA = Yup.object().shape({
  code: requiredValidation,
  type: requiredValidation,
  value: requiredValidation,
  expire_date: requiredValidation,
  limited_users: requiredValidation,
});

export const ADD_PROGRESS_SCHEMA = Yup.object().shape({
  weight: requiredValidation,
  protien: requiredValidation,
  body_fat_mass: requiredValidation,
  skeletal_muscel_mass: requiredValidation,
});

export const CONTACT_US_SCHEMA = Yup.object().shape({
  email: emailValidation,
  message: messageValidation,
  phone: phoneNumberValidaton,
  last_name: lastNameValidation,
  first_name: firstNameValidation,
});

export const BMI_SCHEMA = Yup.object().shape({
  email: emailValidation,
  weight: requiredValidation,
  height: requiredValidation,
});

export const BMR_SCHEMA = Yup.object().shape({
  age: requiredValidation,
  email: emailValidation,
  gender: requiredValidation,
  weight: requiredValidation,
  height: requiredValidation,
});

export const REVIEW_REQUEST_REJECTION_SCHEMA = Yup.object().shape({
  reject_message: requiredValidation,
});
