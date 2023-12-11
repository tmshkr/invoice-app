import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import userReducer from "./user";
import modalReducer from "./modal";
import { nestAPI } from "../services/nestAPI";

const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  const { user } = store.getState();
  if (user.value) {
    const { access_token } = user.value;
    nestAPI.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  }
  return store;
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
