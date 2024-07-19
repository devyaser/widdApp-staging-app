import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { rootReducer, RootState } from "./reducer";
import { useDispatch } from "react-redux";
export const store = configureStore({
  reducer: rootReducer,
});
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export const useAppDispatch = ()=>useDispatch<AppDispatch>()
