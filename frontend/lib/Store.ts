import { configureStore } from '@reduxjs/toolkit';
import markerReducer from './markerSlice';

const store = configureStore({
  reducer: {
    markers: markerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;