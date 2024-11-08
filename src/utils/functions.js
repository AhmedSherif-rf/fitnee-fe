const {
  ADMIN_ROLE,
  TRAINEE_ROLE,
  TRAINEE_TYPE,
  TRAINER_ROLE,
  TRAINER_TYPE,
  NUTRITIONIST_TYPE,
  NUTRITIONIST_ROLE,
  ADMIN_INITIAL_URL,
  TRAINEE_INITIAL_URL,
  TRAINER_NUTRITIONIST_ROLE,
  TRAINER_NUTRITIONIST_TYPE,
  SERVICE_PROVIDER_INITIAL_URL,
} = require("./constants");

const setLanguageInStorage = (language) => {
  localStorage.setItem("Website_Language__fitnee", language);
};

const getLanguageFromStorage = () => {
  return localStorage.getItem("Website_Language__fitnee");
};

const getInitialUrl = (role) => {
  let initialUrl = "";

  switch (role) {
    case TRAINEE_ROLE:
      initialUrl = TRAINEE_INITIAL_URL;
      break;
    case TRAINER_ROLE:
      initialUrl = SERVICE_PROVIDER_INITIAL_URL;
      break;
    case NUTRITIONIST_ROLE:
      initialUrl = SERVICE_PROVIDER_INITIAL_URL;
      break;
    case TRAINER_NUTRITIONIST_ROLE:
      initialUrl = SERVICE_PROVIDER_INITIAL_URL;
      break;
    case ADMIN_ROLE:
      initialUrl = ADMIN_INITIAL_URL;
      break;
    default:
      break;
  }

  return initialUrl;
};

const createFormData = (data) => {
  const formData = new FormData();

  for (const key in data) {
    if (data.hasOwnProperty(key) && data[key] !== "" && data[key] !== null) {
      if (Array.isArray(data[key]) && data[key].length > 0) {
        if (key === "certification") {
          data[key].forEach((certification) => {
            formData.append(`certification`, certification);
          });
        } else if (key === "certificate_files") {
          data[key].forEach((certificate_files) => {
            formData.append(`certificate_files`, certificate_files);
          });
        } else if (key === "subscription_plans") {
          const updated_subscription_plans = data[key].map(
            (subscription_plan) => {
              return { ...subscription_plan, membership_type: data["role"] };
            }
          );
          formData.append(
            "subscription_plans",
            JSON.stringify(updated_subscription_plans)
          );
        } else {
          formData.append(key, JSON.stringify(data[key]));
        }
      } else if (!Array.isArray(data[key])) {
        formData.append(key, data[key]);
      }
    } else {
      if (
        key === "weight" ||
        key === "height" ||
        key === "skeletal_muscel_mass" ||
        key === "body_fat_mass" ||
        key === "total_body_water" ||
        key === "protien" ||
        key === "level" ||
        key === "food_sensitive" ||
        key === "training_goal" ||
        key === "injury_details" ||
        key === "goal"
      ) {
        formData.append(key, "");
      }
      if (key === "body_images") {
        if (data[key] === "") {
          formData.append(key, "");
        }
      }
    }
  }

  return formData;
};

const copyToClipboard = (text) => {
  const textField = document.createElement("textarea");
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  document.body.removeChild(textField);
};

const getSummary = (discount, walletAmount, totalAmount, vat) => {
  if (
    parseFloat(walletAmount) >=
    (parseFloat(totalAmount) + parseFloat(vat) - parseFloat(discount)).toFixed(
      2
    )
  ) {
    return 0;
  } else {
    const summary =
      parseFloat(totalAmount) -
      parseFloat(discount) -
      parseFloat(walletAmount) +
      parseFloat(vat);
    return summary.toFixed(2);
  }
};

const calculateVat = (amount) => {
  return ((parseFloat(amount) * 15) / 100).toFixed(2);
};

const addVatPrice = (amount) => {
  return ((parseFloat(amount) * 15) / 100 + parseFloat(amount)).toFixed(2);
};

const calculatePercentage = (amount, percentage) => {
  return ((parseFloat(amount) * percentage) / 100).toFixed(2);
};

const setTraineeInitialValues = (initalValues, user) => {
  return {
    ...initalValues,
    goal: user?.goal,
    email: user?.email,
    level: user?.level,
    gender: user?.gender,
    weight: user?.weight,
    height: user?.height,
    protien: user?.protien,
    last_name: user?.last_name,
    first_name: user?.first_name,
    phone_number: user?.phone_number,
    date_of_birth: user?.date_of_birth,
    training_goal: user?.training_goal,
    body_fat_mass: user?.body_fat_mass,
    food_sensitive: user?.food_sensitive,
    injury_details: user?.injury_details,
    total_body_water: user?.total_body_water,
    skeletal_muscel_mass: user?.skeletal_muscel_mass,
  };
};

const setTrainerInitialValues = (initalValues, user, dir) => {
  return {
    ...initalValues,
    bio: user?.bio,
    email: user?.email,
    gender: user?.gender,
    stc_pay: user?.stc_pay,
    full_name: user?.full_name,
    experience: user?.experience,
    phone_number: user?.phone_number,
    specialities: user?.specialities.map(({ id, name, arabic_name }) => ({
      label: dir === "ltr" ? name : arabic_name,
      value: id,
    })),
    saudireps_number: user?.saudireps_number,
    profile_availability: user?.profile_availability,
    is_currently_working: user?.is_currently_working,
  };
};

const setTrainerEditRequestInitialValues = (initalValues, user) => {
  return {
    ...initalValues,
    stc_pay: user?.stc_pay,
    saudireps_number: user?.saudireps_number,
  };
};

const setNutritionistEditRequestInitialValues = (initalValues, user) => {
  return {
    ...initalValues,
    stc_pay: user?.stc_pay,
    license_number: user?.license_number,
  };
};

const setNutritionistInitialValues = (initalValues, user) => {
  return {
    ...initalValues,
    bio: user?.bio,
    email: user?.email,
    gender: user?.gender,
    stc_pay: user?.stc_pay,
    full_name: user?.full_name,
    experience: user?.experience,
    phone_number: user?.phone_number,
    license_number: user?.license_number,
    profile_availability: user?.profile_availability,
    is_currently_working: user?.is_currently_working,
  };
};

const setTrainerNutritionistInitialValues = (initalValues, user) => {
  return {
    ...initalValues,
    bio: user?.bio,
    gender: user?.gender,
    full_name: user?.full_name,
    experience: user?.experience,
    license_number: user?.license_number,
    is_currently_working: user?.is_currently_working,
  };
};

const filterSignUpFields = (roleType, user) => {
  if (roleType === TRAINEE_TYPE && user === null) {
    return [
      "goal",
      "email",
      "level",
      "gender",
      "weight",
      "height",
      "protien",
      "password",
      "last_name",
      "first_name",
      "body_images",
      "profile_pic",
      "phone_number",
      "date_of_birth",
      "training_goal",
      "body_fat_mass",
      "food_sensitive",
      "injury_details",
      "confirm_password",
      "total_body_water",
      "term_and_condition",
      "skeletal_muscel_mass",
    ];
  } else if (roleType === TRAINEE_TYPE && user !== null) {
    return [
      "goal",
      "email",
      "level",
      "gender",
      "weight",
      "height",
      "protien",
      "last_name",
      "first_name",
      "body_images",
      "profile_pic",
      "phone_number",
      "date_of_birth",
      "body_fat_mass",
      "training_goal",
      "food_sensitive",
      "injury_details",
      "total_body_water",
      "skeletal_muscel_mass",
    ];
  } else if (roleType === TRAINER_TYPE && user === null) {
    return [
      "bio",
      "role",
      "email",
      "gender",
      "stc_pay",
      "password",
      "full_name",
      "experience",
      "profile_pic",
      "phone_number",
      "specialities",
      "certification",
      "confirm_password",
      "saudireps_number",
      "certificate_title",
      "term_and_condition",
      "subscription_plans",
      "profile_availability",
      "is_currently_working",
    ];
  } else if (roleType === TRAINER_TYPE && user !== null) {
    return [
      "bio",
      "email",
      "gender",
      "stc_pay",
      "full_name",
      "experience",
      "profile_pic",
      "phone_number",
      "specialities",
      "saudireps_number",
      "profile_availability",
      "is_currently_working",
    ];
  } else if (roleType === NUTRITIONIST_TYPE && user === null) {
    return [
      "bio",
      "email",
      "gender",
      "stc_pay",
      "password",
      "full_name",
      "experience",
      "profile_pic",
      "phone_number",
      "certification",
      "license_number",
      "confirm_password",
      "certificate_title",
      "subscription_plans",
      "term_and_condition",
      "profile_availability",
      "is_currently_working",
    ];
  } else if (roleType === NUTRITIONIST_TYPE && user !== null) {
    return [
      "bio",
      "email",
      "gender",
      "stc_pay",
      "full_name",
      "experience",
      "profile_pic",
      "phone_number",
      "license_number",
      "profile_availability",
      "is_currently_working",
    ];
  } else if (roleType === TRAINER_NUTRITIONIST_TYPE && user === null) {
    return [
      "bio",
      "email",
      "gender",
      "stc_pay",
      "password",
      "full_name",
      "experience",
      "profile_pic",
      "specialities",
      "phone_number",
      "certification",
      "license_number",
      "saudireps_number",
      "confirm_password",
      "certificate_title",
      "term_and_condition",
      "profile_availability",
      "is_currently_working",
    ];
  } else if (roleType === TRAINER_NUTRITIONIST_TYPE && user !== null) {
    return [
      "bio",
      "gender",
      "full_name",
      "experience",
      "profile_pic",
      "license_number",
      "is_currently_working",
    ];
  }
};

const getListingRole = (listingType) => {
  if (listingType === "trainer") {
    return TRAINER_ROLE;
  } else if (listingType === "nutritionist") {
    return NUTRITIONIST_ROLE;
  } else if (listingType === "both") {
    return TRAINER_NUTRITIONIST_ROLE;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getSummary,
  addVatPrice,
  calculateVat,
  getInitialUrl,
  createFormData,
  getListingRole,
  copyToClipboard,
  filterSignUpFields,
  calculatePercentage,
  setLanguageInStorage,
  getLanguageFromStorage,
  setTraineeInitialValues,
  setTrainerInitialValues,
  setNutritionistInitialValues,
  setTrainerEditRequestInitialValues,
  setTrainerNutritionistInitialValues,
  setNutritionistEditRequestInitialValues,
};
