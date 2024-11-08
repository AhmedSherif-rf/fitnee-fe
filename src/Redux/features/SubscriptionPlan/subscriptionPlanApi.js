import axiosInstance from "../../interceptor";
import Toaster from "../../../Shared/Toaster";
import { createAsyncThunk } from "@reduxjs/toolkit";
import TranslationHelper from "../../../Shared/TranslationHelper";

export const createSubscriptionPlan = createAsyncThunk(
  "createSubscriptionPlan",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      Toaster.success(TranslationHelper("messages.planCreatedText"));
      return response;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.non_field_errors[0]);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const editSubscriptionPlan = createAsyncThunk(
  "editSubscriptionPlan",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(apiEndpoint, requestData);
      Toaster.success(TranslationHelper("messages.planUpdateText"));
      return response;
    } catch (error) {
      if (error?.response?.data?.error?.non_field_errors) {
        Toaster.error(error?.response?.data?.error?.non_field_errors[0]);
      } else if (error?.response?.data?.error?.price) {
        Toaster.error(error?.response?.data?.error?.price[0]);
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getTraineeSubscriptionPlans = createAsyncThunk(
  "getTraineeSubscriptionPlans",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return response.data;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.Message);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getGuestServiceProviderSubscriptionPlans = createAsyncThunk(
  "getGuestServiceProviderSubscriptionPlans",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return response.data;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.Message);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getExerciseSubscriptionPlans = createAsyncThunk(
  "getExerciseSubscriptionPlans",
  async ({ apiEndpoint }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(apiEndpoint);
      return response.data;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.Message);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
