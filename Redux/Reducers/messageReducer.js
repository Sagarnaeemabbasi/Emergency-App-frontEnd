import {createReducer} from '@reduxjs/toolkit';

const messageReducer = createReducer(
  {},
  {
    addQueryRequest: state => {
      state.queryLoading = true;
    },
    addQuerySuccess: (state, action) => {
      state.queryLoading = false;
      state.queryMessage = action.payload;
    },
    addQueryFailure: (state, action) => {
      state.queryLoading = false;
      state.queryError = action.payload;
    },
    deleteTaskRequest: state => {
      state.loading = true;
    },
    deleteTaskSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteTaskFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    updateTaskRequest: state => {
      state.loading = true;
    },
    updateTaskSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateTaskFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    updateNameRequest: state => {
      state.loading = true;
    },
    updateNameSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateNameFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    clearMessage: state => {
      state.message = null;
      state.queryMessage = null;
    },
    clearError: state => {
      state.error = null;
      state.queryError=null;
    },
  },
);

export default messageReducer;
