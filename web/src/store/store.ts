import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import messageReducer from "./messageSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    message: messageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
