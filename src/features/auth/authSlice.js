import { createSlice } from "@reduxjs/toolkit";

// initialState
const initialState = {
  accessToken: undefined,
  user: undefined,
  adminError: false,
  studentError: false,
};
// slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    },
    adminError: (state) => {
      state.adminError = true;
    },
    studentError: (state) => {
      state.studentError = true;
    },
    clearAdminError: (state) => {
      state.adminError = false;
    },
  },
});

export const {
  userLoggedIn,
  userLoggedOut,
  adminError,
  studentError,
  clearAdminError,
} = authSlice.actions;
export default authSlice.reducer;
