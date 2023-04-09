import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authReducer from "../features/auth/authSlice";
import quizReducer from "../features/quiz/quizSlice";
import leaderBoardReducer from "../features/leaderBoard/leaderBoardSlice";

export const store = configureStore({
  reducer: {
    quizSelected: quizReducer,
    leaderBoard: leaderBoardReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (defaultMiddlewares) =>
    defaultMiddlewares().concat(apiSlice.middleware),
});
