import axiosInstance from "../../../interceptor";
import Toaster from "../../../../Shared/Toaster";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getEditProfileRequestListing = createAsyncThunk(
  "getEditProfileRequestListing",
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

export const changeProfileUpdateRequestStatus = createAsyncThunk(
  "changeProfileUpdateRequestStatus",
  async ({ apiEndpoint, requestData }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(apiEndpoint, requestData);
      Toaster.success("Status changed successfully");
      return response.data;
    } catch (error) {
      Toaster.error(error?.response?.data?.error?.detail);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
