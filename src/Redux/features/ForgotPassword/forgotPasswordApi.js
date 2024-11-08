import axiosInstance from "../../interceptor";
import Toaster from "../../../Shared/Toaster";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SUCCESS_CODES } from "../../../utils/constants";

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async ({ apiEndpoint, requestData, phone_number }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      if (SUCCESS_CODES.includes(response.status)) {
        Toaster.success(response?.data?.data?.Message);
      }
      return phone_number;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.Message);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const resendOtp = createAsyncThunk(
  "resendOtp",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      if (SUCCESS_CODES.includes(response.status)) {
        Toaster.success(response?.data?.data?.Message);
      }
      return response;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.Message);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "verifyOtp",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      if (SUCCESS_CODES.includes(response.status)) {
        Toaster.success(response?.data?.data?.response);
      }
      return response.data;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.response);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const newPassword = createAsyncThunk(
  "newPassword",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(apiEndpoint, requestData);
      if (SUCCESS_CODES.includes(response.status)) {
        Toaster.success(response?.data?.data?.Message);
      }
      return response;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.Message);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);