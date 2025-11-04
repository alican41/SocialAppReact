import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    // Add your reducers here
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});