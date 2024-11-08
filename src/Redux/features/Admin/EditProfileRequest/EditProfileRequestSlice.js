import { createSlice } from "@reduxjs/toolkit";
import {
  getEditProfileRequestListing,
  changeProfileUpdateRequestStatus,
} from "./EditProfileRequestApi";

export const editProfileRequestSlice = createSlice({
  name: "editProfileRequest",
  initialState: {
    loading: "idle",
    error: null,
    success: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEditProfileRequestListing.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getEditProfileRequestListing.fulfilled, (state) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(getEditProfileRequestListing.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(changeProfileUpdateRequestStatus.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(changeProfileUpdateRequestStatus.fulfilled, (state) => {
        state.success = true;
        state.loading = "succeeded";
      })
      .addCase(changeProfileUpdateRequestStatus.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      });
  },
});

export default editProfileRequestSlice.reducer;
