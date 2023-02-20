import {configureStore} from '@reduxjs/toolkit';
import authReducer from './Reducers/authReducer';
import messageReducer from './Reducers/messageReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
  },
});

export default store;
