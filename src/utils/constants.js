//===============Currency=========================
export const CURRENCY = "SAR";
//===============AdminCredentials=================
export const ADMIN_EMAIL = "admin@admin.com";
//======================paginationParams===========
export const PAGE_RANGE = 2;
export const PER_PAGE_COUNT = 8;
//======================languages==================
export const ARABIC_LANGUAGE = "ar";
export const ENGLISH_LANGUAGE = "en";
export const DEFAULT_LANGUAGE = "en";
//======================serviceProviders===========
export const TRAINEE_TYPE = "trainee";
export const TRAINER_TYPE = "trainer";
export const NUTRITIONIST_TYPE = "nutritionist";
export const TRAINER_NUTRITIONIST_TYPE = "both";
//===================membershipTypes=================
export const EXERCISE_MEMBERSHIP_TYPE = "Exercise";
//======================body=======================
export const MALE_BODY = "Male";
export const FEMALE_BODY = "Female";
//=====================signUpForm==================
export const weekDaysOptions = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
];
export const weekDaysOptionsArabic = [
  { label: "الإثنين", value: "Monday" },
  { label: "الثلاثاء", value: "Tuesday" },
  { label: "الأربعاء", value: "Wednesday" },
  { label: "الخميس", value: "Thursday" },
  { label: "الجمعة", value: "Friday" },
  { label: "السبت", value: "Saturday" },
  { label: "الأحد", value: "Sunday" },
];
export const roleOptions = [
  { label: "Trainer", value: "Trainer" },
  {
    label: "Trainer And Nutritionist",
    value: "Trainer And Nutritionist",
  },
];
export const roleOptionsArabic = [
  { label: "تدريب", value: "Trainer" },
  {
    label: "تدريب وتغذية",
    value: "Trainer And Nutritionist",
  },
];
export const genderOptions = [
  { label: "Male", value: "1" },
  {
    label: "Female",
    value: "2",
  },
];
export const genderOptionsArabic = [
  { label: "ذكر", value: "1" },
  {
    label: "أنثى",
    value: "2",
  },
];
//=====================Roles=====================
export const ADMIN_ROLE = "Admin";
export const TRAINEE_ROLE = "Trainee";
export const TRAINER_ROLE = "Trainer";
export const NUTRITIONIST_ROLE = "Nutritionist";
export const TRAINER_NUTRITIONIST_ROLE = "Trainer And Nutritionist";
//====================Routes====================
export const ADMIN_INITIAL_URL = "/admin/dashboard";
export const TRAINEE_PROFILE_URL = "/trainee/profile";
export const TRAINEE_INITIAL_URL = "/trainee/dashboard";
export const SERVICE_PROVIDER_INITIAL_URL = "/serviceProvider/dashboard";
//===================ApiEndPoints===============
export const LOGIN_URL = "/login/";
export const LOGOUT_URL = "/logout/";
export const GET_STATS = "/guest/stats/";
export const USER_PROFILE_URL = "/User/";
export const MEMBERSHIP_URL = "/membership/";
export const REGISTER_URL = "/registeruser/";
export const EDIT_PROFILE_URL = "/User/userId/";
export const SET_USER_LANGUAGE = "/lang-update/";
export const EXERCISE_URL = "guest/exercisedata/";
export const WALLET_AMOUNT_URL = "/wallet/balance/";
export const DELETE_ACCOUNT_URL = "/delete/userId/";
export const NEW_PASSWORD_URL = "/forget_password/";
export const GET_SPECIALITIES_URL = "/specialities/";
export const SET_AVAILABILITY_URL = "/fully_booked/";
export const CONTACT_US_URL = "/guest/contactusemail/";
export const FORGOT_PASSWORD_VERIFY_URL = "/verifyotp/";
export const ADMIN_TOOL_RECORD_URL = "/admin/bmi-record";
export const TRAINEE_PROGRESS_URL = "/trainee/progress/";
export const PREPARE_CHECKOUT_URL = "/payment/hyperpay/";
export const USE_PROMO_CODE_URL = "/payment/promo-code/";
export const ADMIN_PROMO_CODE_URL = "/admin/promo-codes/";
export const SUBSCRIPTION_PLAN_URL = "/subcription_plan/";
export const ADMIN_REPORTS_LISTING_URL = "/admin/report/";
export const SEND_HEALTH_RESULT = "/guest/health-record/";
export const ADMIN_DASHBOARD_COUNTERS = "/admin/user-stats";
export const FORGOT_PASSWORD_RESEND_OTP_URL = "/resendotp/";
export const ADMIN_EXERCISE_URL = "/admin/exercise/detail/";
export const ADMIN_TRAINEE_LISTING_URL = "/admin/trainees/";
export const PENDING_PAYMENTS = "/admin/remaining_payments/";
export const USER_NOTIFICATIONS_URL = "/user-notifications/";
export const ADMIN_PROMOCODE_USER_URL = "/admin/promo-codes";
export const ADMIN_CATEGORY_WISE_DATA_URL = "/trainee-graph/";
export const ADMIN_EXERCISE_CATEGORY_URL = "/admin/exercise/";
export const EXERCISE_CATEGORIES_URL = "/guest/exercisedata/";
export const TRAINEE_CHANGE_PASSWORD_URL = "/change_password/";
export const FORGOT_PASSWORD_OTP_URL = "/forget_password_otp/";
export const CANCEL_SUBSCRIPTION_URL = "wallet/refund_amount/";
export const SEND_UPDATE_PROFILE_URL = "/profile-update-request/";
export const ADMIN_TRAINEE_PROFILE_URL = "/admin/trainees/userId/";
export const ADMIN_RELEASE_PAYMENT_URL = "/admin/release_payment/";
export const USER_STATUS_LISTING_URL = "/admin/trainee-statistics/";
export const CHECK_PAYMENT_STATUS_URL = "/payment/hyperpay_status/";
export const ADMIN_REVIEW_REQUEST_URL = "/service_provider_requests";
export const TRANSACTION_HISTORY_URL = "/wallet/wallet_transitions/";
export const GUEST_SUBSCRIPTION_PLAN_URL = "/guest/service_subscription";
export const ADMIN_SUBSCRIPTION_LISTING_URL = "/admin/total-subscription";
export const GUEST_SERVICE_PROVIDER_LISTING_URL = "/guest/serviceprovide";
export const GUEST_SERVICE_PROVIDER_PROFILE_URL = "/guest/serviceprovide";
export const ADMIN_REJECT_REVIEW_REQUEST_URL = "/service_provider_reject/";
export const ADMIN_EXERCISE_SUBSCRIPTION_LISTING_URL = "/admin/membership";
export const ADMIN_APPROVE_REVIEW_REQUEST_URL = "/service_provider_approve/";
export const ADMIN_EXERCISE_SUBCATEGORY_URL = "/admin/exercise_subcategory/";
export const ADMIN_SERVICE_PROVIDER_LISTING_URL = "/admin/service-providers/";
export const ADMIN_SERVICE_PROVIDER_BLOCK_UNBLOCK_URL =
  "/admin/toggle-user-status/userId/";
export const ADMIN_SERVICE_PROVIDER_FULLY_BOOKED_URL =
  "/admin/fully-booked-service-providers/";
export const EXERCUSE_SUBSCRIPITION_PLAN_URL =
  "/execrise/exercise-subscription";
export const ADMIN_PLATFORM_FEEDBACK_LISTING_URL =
  "/admin/review/platform-reviews";
export const ADMIN_SERVICE_PROVIDER_FEEDBACK_LISTING_URL =
  "/admin/review/sp-reviews/";
export const GET_SERVICE_PROVIDER_COMMENTS_URL =
  "/service-provider/serviceProviderId/reviews/";
export const ADMIN_CHANGE_PLATFORM_FEEDBACK_STATUS_URL =
  "/admin/review/platform-review/feedbackId/";
export const ADMIN_CHANGE_SERVICE_PROVIDER_FEEDBACK_STATUS_URL =
  "/admin/review/sp-review/feedbackId/";
export const GET_TRAINING_GOAL_PREFERENCES_URL =
  "/profile_preference?profile_type=training_goal";
export const GET_LEVEL_PREFERENCES_URL =
  "/profile_preference?profile_type=level";
export const UPDATE_PROFILE_REQUEST_CHANGE_STATUS_URL =
  "/admin/profile-update-request/requestId/change_status/";
export const UPDATE_PROFILE_REQUEST_LISTING_URL =
  "/admin/profile-update-request/";
export const TRAINEE_SERVICE_PROVIDER_LISTING_URL =
  "/serviceprovider_logged_in";
export const ADMIN_SERVICE_PROVIDER_PROFILE_URL =
  "/admin/service-providers/userId/";
//=================StatusCodes===================
export const FORBIDDEN_CODE = 403;
export const SUCCESS_CODES = [200, 201];
export const PRECONDITION_REQUIRED_CODE = 428;
export const UNAVAILABLE_FOR_LEGAL_REASONS_CODE = 451;
//=================Exercise======================
export const exerciseLevel = ["Beginner", "Expert"];
export const category = [
  "Chest",
  "Traps",
  "Shoulder",
  "Biceps",
  "Forearms",
  "Obliques",
  "Abdominal",
  "Quads",
  "Calves",
];
//=======================AdminPanel select duration=====================
export const duration = ["Weekly", "monthly"];
//=======================AdminPanel select promotion type=====================
export const promoCodeTypeOptions = [
  // { label: "flat", value: "flat" },
  { label: "percentage", value: "percentage" },
];
