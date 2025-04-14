import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/ApiService";
import { modalSlice } from "./reducers/modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
