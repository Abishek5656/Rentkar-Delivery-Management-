import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import orderReducer from './slices/orderSlice';
import partnerReducer from './slices/partnerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
    partner: partnerReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
