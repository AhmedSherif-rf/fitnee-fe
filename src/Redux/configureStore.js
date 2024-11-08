import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import userSlice from "./features/User/userSlice.js";
import guestSlice from "./features/Guest/guestSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import languageSlice from "./features/Language/languageSlice.js";
import exerciseSlice from "./features/Exercise/exerciseSlice.js";
import walletSlice from "./features/Admin/Wallet/walletSlice.js";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import contactUsSlice from "./features/ContactUs/contactUsSlice.js";
import promoCode from "./features/Admin/PromoCode/promoCodeSlice.js";
import feedbackSlice from "./features/Admin/Feedback/FeedbackSlice.js";
import dashboardSlice from "./features/Admin/Dashboard/dashboardSlice.js";
import subscriptionSlice from "./features/Subscription/subscriptionSlice.js";
import userListingSlice from "./features/Admin/UserListing/userListingSlice.js";
import forgotPasswordSlice from "./features/ForgotPassword/forgotPasswordSlice.js";
import reviewRequestSlice from "./features/Admin/ReviewRequest/ReviewRequestSlice.js";
import subscriptionPlanSlice from "./features/SubscriptionPlan/subscriptionPlanSlice.js";
import EditProfileRequestSlice from "./features/Admin/EditProfileRequest/EditProfileRequestSlice.js";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userSlice,
  guest: guestSlice,
  wallet: walletSlice,
  promoCode: promoCode,
  exercise: exerciseSlice,
  language: languageSlice,
  feedback: feedbackSlice,
  contactUs: contactUsSlice,
  dashboard: dashboardSlice,
  userListing: userListingSlice,
  subscription: subscriptionSlice,
  reviewRequest: reviewRequestSlice,
  forgotPassword: forgotPasswordSlice,
  subscriptionPlan: subscriptionPlanSlice,
  EditProfileRequest: EditProfileRequestSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
