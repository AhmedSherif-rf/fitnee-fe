import axiosInstance from "../../interceptor";
import Toaster from "../../../Shared/Toaster";
import { createAsyncThunk } from "@reduxjs/toolkit";
import TranslationHelper from "../../../Shared/TranslationHelper";
import {
  PRECONDITION_REQUIRED_CODE,
  UNAVAILABLE_FOR_LEGAL_REASONS_CODE,
} from "../../../utils/constants";

export const login = createAsyncThunk(
  "login",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      return response.data;
    } catch (error) {
      if (
        error.response.status !== PRECONDITION_REQUIRED_CODE &&
        error.response.status !== UNAVAILABLE_FOR_LEGAL_REASONS_CODE
      ) {
        Toaster.error(error?.response?.data?.error?.Message);
      }
      return thunkAPI.rejectWithValue({
        statusCode: error.response.status,
        phone_number: error?.response?.data?.error?.phone_number,
      });
    }
  }
);

export const logout = createAsyncThunk(
  "logout",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      Toaster.success(TranslationHelper("messages.loggedOutText"));
      return response.data;
    } catch (error) {
      if (error?.response?.data?.error?.Message !== "") {
        Toaster.error(error?.response?.data?.error?.Message);
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  "changePassword",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      Toaster.success(response?.data?.data?.Message);
      return response.data;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.Message);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const signUp = createAsyncThunk(
  "signUp",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      Toaster.success(TranslationHelper("messages.otpSendText", false));
      return response.data.data.phone_number;
    } catch (error) {
      if (error?.response?.data?.error?.email) {
        Toaster.error(error?.response?.data?.error?.email[0]);
      } else if (error?.response?.data?.error?.Message) {
        Toaster.error(error?.response?.data?.error?.Message);
      } else if (error?.response?.data?.error?.phone_number) {
        Toaster.error(error?.response?.data?.error?.phone_number[0]);
      } else if (error?.response?.data?.error?.bio) {
        Toaster.error(error?.response?.data?.error?.bio[0]);
      } else if (error?.response?.data?.error?.weight) {
        Toaster.error(error?.response?.data?.error?.weight[0]);
      } else if (error?.response?.data?.error?.height) {
        Toaster.error(error?.response?.data?.error?.height[0]);
      } else if (error?.response?.data?.error?.certification) {
        Toaster.error(error?.response?.data?.error?.certification[0]);
      } else if (error?.response?.data?.error?.subscription_plans) {
        Toaster.error(
          error?.response?.data?.error?.subscription_plans[0].price
        );
      } else if (error?.response?.data?.error.certificate_title) {
        Toaster.error(
          TranslationHelper("validation.requiredCertificateTitleText"),
          false
        );
      } else {
        Toaster.error(error?.response?.data?.message);
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const editProfile = createAsyncThunk(
  "editProfile",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(apiEndpoint, requestData);
      Toaster.success(TranslationHelper("messages.profileEditedText"));
      return response.data;
    } catch (error) {
      if (error?.response?.data?.error) {
        Toaster.error(error?.response?.data?.error[0]);
      } else {
        Toaster.error(error?.response?.data?.message);
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "deleteAccount",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(apiEndpoint);
      return response.data;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.detail);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const setUserLanguage = createAsyncThunk(
  "setUserLanguage",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(apiEndpoint, requestData);
      return response.data;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.detail);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getSpecialities = createAsyncThunk(
  "getSpecialities",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return response.data;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.detail);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getPreferences = createAsyncThunk(
  "getPreferences",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return response.data;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.detail);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getMyServiceProviders = createAsyncThunk(
  "getMyServiceProviders",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return response.data;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.detail);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const cancelSubscription = createAsyncThunk(
  "cancelSubscription",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      Toaster.success(TranslationHelper("messages.subscriptionCancelText"));
      return response.data;
    } catch (error) {
      if (error?.response?.data?.error?.Error) {
        Toaster.error(error?.response?.data?.error?.Error);
      } else if (error?.response?.data?.error?.Message) {
        Toaster.error(error?.response?.data?.error?.Message);
      }

      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getMyTrainees = createAsyncThunk(
  "getMyTrainees",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return response.data;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.detail);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getTraineeProgressHistory = createAsyncThunk(
  "getTraineeProgressHistory",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return response.data;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.detail);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getUserNotifications = createAsyncThunk(
  "getUserNotifications",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return {
        sortedNotifications: response.data.data.results.results,
        count: response.data.data.count,
        unRead: response.data.data.results.un_read,
      };
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.detail);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const markUserNotificationAsRead = createAsyncThunk(
  "markUserNotificationAsRead",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(apiEndpoint, requestData);
      return response.data;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.detail);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const addTraineeProgress = createAsyncThunk(
  "addTraineeProgress",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      Toaster.success(TranslationHelper("messages.progressAddedText"));
      return response.data;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.detail);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getTransactionHistory = createAsyncThunk(
  "getTransactionHistory",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return response.data;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.detail);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const sendEditProfileRequest = createAsyncThunk(
  "sendEditProfileRequest",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      return response.data;
    } catch (error) {
      if (error?.response?.data?.error?.detail) {
        Toaster.error(error?.response?.data?.error?.detail);
      } else {
        Toaster.error(error?.response?.data?.error);
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "getUserProfile",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return response.data;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.detail);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const setAvailability = createAsyncThunk(
  "setAvailability",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(apiEndpoint, requestData);
      Toaster.success(TranslationHelper("messages.availabilitySetText"));
      return response.data;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.detail);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getServiceProviderFeedbacks = createAsyncThunk(
  "getServiceProviderFeedbacks",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return response.data;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.detail);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const sendHealthCheckEmail = createAsyncThunk(
  "sendHealthCheckEmail",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      return response.data;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.detail);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
