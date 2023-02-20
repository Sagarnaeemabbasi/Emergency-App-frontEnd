import {createReducer} from '@reduxjs/toolkit';

const authReducer = createReducer(
  {},
  {
    loginRequest: state => {
      state.loginLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loginLoading = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.error = action.payload;
      state.loginLoading = false;
    },

    signupRequest: state => {
      state.authLoading = true;
    },
    signupSuccess: (state, action) => {
      state.authLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.signupMessage = action.payload.message;
    },
    signupFailure: (state, action) => {
      state.authLoading = false;
      state.isAuthenticated = false;
      state.signupError = action.payload;
    },
    loadUserRequest: state => {
      state.userLoading = true;
    },
    loadUserSuccess: (state, action) => {
      state.userLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loadUserFailure: (state, action) => {
      state.userLoading = false;
      state.isAuthenticated = false;
      state.loadError = action.payload;
    },
    logoutRequest: state => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.message = action.payload.message;
      state.user = null;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    },
    verificationRequest: state => {
      state.otpLoading = true;
    },
    verificationSuccess: (state, action) => {
      state.otpLoading = false;
      state.message = action.payload;
    },
    verificationFailure: (state, action) => {
      state.otpLoading = false;
      state.error = action.payload;
    },
    clearMessage: state => {
      state.message = null;
      state.signupMessage = null;
    },
    clearError: state => {
      state.error = null;
      state.signupError = null;
    },
  },
);

export default authReducer;
